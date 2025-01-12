<script>
import { useToast } from 'vue-toastification';
const toaster = useToast();

export default {
	data() {
		return {
			email: '',
			password: ''
		};
	},
	methods: {
		async login() {
			try {
				const response = await fetch(`${import.meta.env.VITE_API_URL}auth/login`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						email: this.email,
						password: this.password
					})
				});
				const data = await response.json();
				if (response.ok) {
					// Handle successful login
					console.log('Login successful:', data);
					toaster.success('Login successful', {
						position: 'top-center',
						timeout: 5000,
						pauseOnHover: false,
						draggable: false
					});
					// Save the token to local storage
					localStorage.setItem('token', data.token);
					// Redirect depending on user type
					if (data.type === 'Admin') {
						this.$router.push('/admin');
					} else if (data.type === 'Teacher') {
						this.$router.push('/teacher');
					} else {
						this.$router.push('/student');
					}
				} else {
					// Handle login error
					console.error('Login failed:', data);
					toaster.error('Incorrect email or password', {
						position: 'top-center',
						timeout: 5000,
						pauseOnHover: false,
						draggable: false
					});
				}
			} catch (error) {
				console.error('Error:', error);
				toaster.error('An error occurred', {
					position: 'top-center',
					timeout: 5000,
					pauseOnHover: false,
					draggable: false
				});
			}
		},
		forgotPassword() {
            toaster.info("That's sad 😭", {
                position: "top-center",
                timeout: 5000,
                pauseOnHover: false,
                draggable: false,
            });
		}
	}
};
</script>

<template>
	<div class="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
	  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
		<img class="mx-auto h-20 w-auto" src="@/assets/logo.svg" alt="EFREI LOGO" />
		<h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
	  </div>
  
	  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
		<form class="space-y-6" @submit.prevent="login">
		  <div>
			<label for="email" class="block text-sm/6 font-medium text-gray-900">Email address</label>
			<div class="mt-2">
			  <input id="email" name="email" type="email" v-model="email" autocomplete="email" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm/6" />
			</div>
		  </div>
  
		  <div>
			<div class="flex items-center justify-between">
			  <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>
			  <div class="text-sm">
				<button type="button" @click="forgotPassword" href="#" class="font-semibold text-primar">Forgot password?</button>
			  </div>
			</div>
			<div class="mt-2">
			  <input id="password" name="password" type="password" v-model="password" autocomplete="current-password" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm/6" />
			</div>
		  </div>
  
		  <div>
			<button type="submit" class="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">Sign in</button>
		  </div>
		</form>
	  </div>
	</div>
</template>