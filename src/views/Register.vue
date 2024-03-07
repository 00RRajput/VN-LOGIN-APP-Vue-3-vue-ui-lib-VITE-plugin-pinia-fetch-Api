<script setup>
import { Form as VeeForm, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { RouterLink } from 'vue-router';

const schema = yup.object({
	user_name: yup.string().required(),
	password: yup.string().required().min(6),
});
async function onSubmit(values, { resetForm }) {
	try {
		const response = await fetch(`${import.meta.env.VITE_API_URL}v1/auth/reg`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(values), 
		});
        const res = await response.json();
		
		if (res.success) {
			toast.success(res.message);
			resetForm();
		} else toast.error(res.message);
		
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
</script>

<template>
	<VeeForm v-slot="{ handleSubmit, resetForm }" :validation-schema="schema" as="div" class="formcss">
		<form @submit="handleSubmit($event, onSubmit)">
			<div>
				<label for="user_name">Username:</label>
				<Field name="user_name" type="text" />
				<ErrorMessage name="user_name" />
			</div>
			<div>
				<label for="password">Password:</label>
				<Field name="password" type="password" />
				<ErrorMessage name="password" />
			</div>
			<button type="submit">Register</button>
			<RouterLink to="/log">login</RouterLink>
		</form>
	</VeeForm>
</template>

<style scoped>
.formcss {
	display: flex;
	justify-content: center;
}

.formcss form {
	/* display: flex;
	justify-content: center; */
	display: grid;
	width: 300px;
}

.formcss form div span {
	color: #ff0000ba;
}

.formcss form div {
	margin-top: 10px;
	display: grid;
}

.formcss form button {
	margin-top: 10px;
	color: whitesmoke;
	background-color: lime;
}
</style>