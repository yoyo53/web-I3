<template>
  <div class="relative w-64" ref="dropdown">
    <!-- Champ de saisie avec filtre intégré -->
    <input
      type="text"
      v-model="search"
      @focus="isOpen = true"
      @input="isOpen = true"
      placeholder="Rechercher ou sélectionner..."
      class="w-full px-4 py-2 border rounded shadow focus:outline-none"
    />

    <!-- Menu Déroulant (affiché uniquement si isOpen est vrai) -->
    <div
      v-if="isOpen"
      class="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-sm px-4 py-2 text-gray-700"
    >
      <!-- Liste d'options filtrées -->
      <ul class="max-h-48 overflow-y-auto">
        <li
          v-for="item in filteredItems"
          :key="item.survey_templateID"
          @click="selectItem(item)"
          class="px-4 py-2 cursor-pointer hover:bg-gray-100"
        >
          {{ item.name }}
        </li>
        <li
          v-if="filteredItems.length === 0"
          class="px-4 py-2 text-gray-500"
        >
          Aucun résultat trouvé
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,  // Indicateur d'ouverture du menu        
      search: "",     // Valeur de recherche liée à l'input
      selected: null, // Option sélectionnée
      templates: [],  // Liste des templates : [{survey_templateID, name}]
    };
  },
  computed: {
    filteredItems() {
      // Filtre les éléments en fonction de la recherche
      return this.templates.filter((item) =>
        item.name.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
  mounted() {
    this.getallTemplates();
    document.addEventListener("mousedown", this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  },
  methods: {
    selectItem(item) {
      this.selected = item;
      this.search = item.name;  // Met à jour le champ de recherche avec l'élément sélectionné
      this.isOpen = false;      // Ferme le menu
      this.$emit('template-selected', item);
    },
    handleClickOutside(event) {
      const dropdown = this.$refs.dropdown;
      if (dropdown && !dropdown.contains(event.target)) {
        this.isOpen = false;
      }
    },
    async getallTemplates() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}admin/templates`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        this.templates = data;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
