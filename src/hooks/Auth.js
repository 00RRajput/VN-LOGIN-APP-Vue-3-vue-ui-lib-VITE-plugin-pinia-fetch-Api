import { defineStore } from "pinia";
import Cookies from "js-cookie";

export const useAuthHook = defineStore("auth", {
  state: () => ({
    user: null,
    isAuthenticated: false,
    expiryHour: 12,
  }),
  actions: {
    async setUser(user) {
        try {
            if (user) {
                const expiryDate = new Date();
                expiryDate.setTime(
                  expiryDate.getTime() + this.expiryHour * 60 * 60 * 1000
                );
        
                const tokenWithExpiry = {
                  value: user?.access_token,
                  expiry: expiryDate,
                };
        
                localStorage.setItem("auth_token", JSON.stringify(tokenWithExpiry));
                localStorage.setItem("user_id", JSON.stringify(user?.id));
        
                Cookies.set("auth_token", user?.access_token, { expires: expiryDate });
        
                this.isAuthenticated = true;
                this.user = user;
                return true;
              } else return false;
        } catch (error) {
            return false;
        }
     
    },
    async getUser() {
      try {
        // const rememberToken = localStorage.getItem("rr_auth_token");
        const rememberToken = Cookies.get("auth_token");
        console.log(rememberToken)
        if (!rememberToken || rememberToken === undefined) {
          console.log("Cookie has expired");
        //   await logout();
        } else {
          if (rememberToken) {
            const response = await fetch(`${import.meta.env.VITE_API_URL}v1/auth/get?rememberToken=${rememberToken}`);
            
            const res = await response.json();
            
            if (res.success) {
              this.isAuthenticated = true;
              this.user = res.data;
            }
            // this.isAuthenticated = true;
        }
      } 
    }catch (error) {
        console.error("Error occurred during get user:", error);
      }
    },

    async logoutUser() {
      try {
        Cookies.remove('auth_token');
        this.isAuthenticated = false;
        this.user = null;
    }catch (error) {
        console.error("Error occurred during get user:", error);
      }
    },
  },
});
