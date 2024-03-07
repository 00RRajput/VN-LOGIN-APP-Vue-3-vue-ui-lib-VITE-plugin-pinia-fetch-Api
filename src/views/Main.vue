<script setup>
import UserView from "../components/UserView.vue";
import { useAuthHook } from '../hooks/Auth';

const auth = useAuthHook(); 

</script>

<template>
  <main>
    <UserView :user="auth.user"/>
  </main>
</template>
