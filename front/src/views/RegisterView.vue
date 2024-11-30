<template>
    <section class="bg-gray-50 dark:bg-gray-900">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img
            class="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          Flowbite
        </a>
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form class="space-y-4 md:space-y-6" @submit.prevent="registerUser">
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Your email</label
                >
                <input
                  type="email"
                  id="email"
                  v-model="email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  for="firstName"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >First Name</label
                >
                <input
                  type="text"
                  id="firstName"
                  v-model="firstName"
                  placeholder="John"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  for="lastName"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Last Name</label
                >
                <input
                  type="text"
                  id="lastName"
                  v-model="lastName"
                  placeholder="Doe"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  for="accountNumber"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Account Number</label
                >
                <input
                  type="text"
                  id="accountNumber"
                  v-model="accountNumber"
                  @input="validateAccountNumber"
                  placeholder="123456"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div class="flex items-center justify-between">
                <span
                  class="text-sm font-medium text-gray-900 dark:text-white"
                  >Account Type: <strong>{{ accountType }}</strong></span
                >
                <button
                  type="button"
                  @click="toggleAccountType"
                  class="relative inline-flex items-center h-6 rounded-full w-11 focus:outline-none focus:ring-2 focus:ring-primary-600 dark:focus:ring-primary-400"
                >
                  <span
                    :class="accountType === 'Student' ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'"
                    class="absolute h-4 w-9 rounded-full transition-colors"
                  ></span>
                  <span
                    :class="accountType === 'Student' ? 'translate-x-1' : 'translate-x-6'"
                    class="absolute left-0 inline-block h-5 w-5 transform bg-white rounded-full shadow transition-transform"
                  ></span>
                </button>
              </div>
              <button
                type="submit"
                class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Create an account
              </button>
              <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?
                <a
                  href="#"
                  class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >Login here</a
                >
              </p>
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
  