<template>
  <section>
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-primary md:text-2xl">
            Create an account
          </h1>
          <form class="space-y-4 md:space-y-6" @submit.prevent="registerUser">
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Your email</label>
              <input type="email" id="email" v-model="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="name@company.com" required />
            </div>
            <div>
              <label for="firstName" class="block mb-2 text-sm font-medium text-gray-900">First Name</label>
              <input type="text" id="firstName" v-model="firstName" placeholder="John"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                required />
            </div>
            <div>
              <label for="lastName" class="block mb-2 text-sm font-medium text-gray-900">Last Name</label>
              <input type="text" id="lastName" v-model="lastName" placeholder="Doe"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                required />
            </div>
            <div>
              <label for="accountNumber" class="block mb-2 text-sm font-medium text-gray-900">Account Number</label>
              <input type="text" id="accountNumber" v-model="accountNumber" @input="validateAccountNumber"
                placeholder="123456"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                required />
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium text-gray-900">Account Type: <strong>{{ accountType }}</strong></span>
              <label class="inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" class="sr-only peer" @click="toggleAccountType"
                  :checked="accountType === 'Teacher'">
                <div
                  class="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-blue-300 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary">
                </div>
              </label>
            </div>
            
            <button type="submit"
              class="w-full text-[white] bg-primary hover:bg-primary-hover focus:ring-2 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              Create an account
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      firstName: "",
      lastName: "",
      accountNumber: "",
      accountType: "Student", // Default account type
    };
  },
  methods: {
    async registerUser() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
            accountNumber: this.accountNumber,
            accountType: this.accountType,
          }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        alert("Registration successful!");
        console.log(data);
        console.log(this.email, this.firstName, this.lastName, this.accountNumber, this.accountType);
      } catch (error) {
        console.error("There was a problem with the registration:", error);
        alert("Registration failed. Please try again.");
      }
    },
    toggleAccountType() {
      this.accountType = this.accountType === "Student" ? "Teacher" : "Student";
      console.log("Account type changed to:", this.accountType);
    },
    validateAccountNumber() {
      // Ensure only digits are entered
      this.accountNumber = this.accountNumber.replace(/\D/g, "");
    },
  },
};
</script>
