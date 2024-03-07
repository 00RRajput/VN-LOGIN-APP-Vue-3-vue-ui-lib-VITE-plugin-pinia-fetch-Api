<script setup>
import { ref, onMounted, defineProps } from 'vue';
import Cookies from "js-cookie";
import { useAuthHook } from '../hooks/Auth';
import { toast } from 'vue3-toastify';
import { useRouter } from 'vue-router';

const props = defineProps(['user']);
const auth = useAuthHook();
const router = useRouter();

const logout = async () => {
    try {
        // const rememberToken = localStorage.getItem("rr_auth_token");
        const rememberToken = Cookies.get("auth_token");
        
        if (rememberToken === undefined) {
          console.log("Cookie has expired");
        } else {
            if (rememberToken) {
                const response = await fetch(`${import.meta.env.VITE_API_URL}v1/auth/logout`, {
                    credentials: "same-origin",
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${rememberToken}`
                    },
                    body: JSON.stringify(props.user), 
                });
                const res = await response.json();
                
                if (res.success) {
                    toast.success(res.message);
                    await auth.logoutUser(res?.data);
                    router.push({ name: 'Log' })
                }
            }
      } 
    }catch (error) {
        console.error("Error occurred during user logout:", error);
    }
}

onMounted(() => {
    // console.log('user', user)
    // console.log('ccc', props.user)
});
</script>

<template>
    <div class="card" v-if="user">
  <!-- <img src="img.jpg" alt="John" style="width:100%"> -->
  <h1>{{ user.user_name }}</h1>
  <p class="title">Login Date & Time</p>
  <p>{{ user.updated_at }}</p>
  <a href="#"><i class="fa fa-facebook"></i></a>
  <p><button @click="logout">Logout</button></p>
</div>
</template>

<style scoped>
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  max-width: 300px;
  margin: auto;
  text-align: center;
  background-color: whitesmoke;
  color: darkcyan;
}

.title {
  color: grey;
  font-size: 18px;
}

button {
  border: none;
  outline: 0;
  display: inline-block;
  padding: 4px;
  text-align: center;
  cursor: pointer;
  width: 100%;
  font-size: 18px;
  background-color: darkcyan;
}

button:hover, a:hover {
  opacity: 0.7;
}
</style>