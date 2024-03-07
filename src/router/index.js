import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import MainView from "../views/Main.vue";
import RegView from "../views/Register.vue";
import LoginView from "../views/Login.vue";
import { useAuthHook } from '../hooks/Auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/reg",
      name: "Reg",
      component: RegView,
    },
    {
      path: "/log",
      name: "Log",
      component: LoginView,
    },
    {
      path: "/",
      name: "Main",
      component: MainView,
    },
    {
      path: "/home",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const auth = useAuthHook(); 

  try {
      const res = await auth.getUser();

      if (auth.isAuthenticated) {
          if (["Log", "Reg"].includes(to.name)) next({ name: "Main" });
          else next();
      } else {
          if (["Log", "Reg"].includes(to.name)) next();
          else next('/log');
      }
  } catch (error) {
      console.error('Error occurred during authentication:', error);
      next('/login'); // Redirect to login page in case of an error
  }
});

export default router;
