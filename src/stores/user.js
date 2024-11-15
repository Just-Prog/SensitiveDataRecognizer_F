import { defineStore } from "pinia";
import { ref } from "vue";

const user = defineStore(
  "user",
  () => {
    const isLogin = ref(false);
    const username = ref("Default");
    const avatar = ref("/avatar/avatar.png");
    const uid = ref("000000000");
    const org = ref("Default Company");
    const ip_addr = ref('127.0.0.1')
    const logout = ()=>{
      isLogin.value = false
      username.value = "Default";
      avatar.value = "/avatar/avatar.png"
      uid.value = "000000000"
      org.value = "Default Company"
      ip_addr.value = "127.0.0.1"
    }
    return {
      avatar,
      username,
      isLogin,
      uid,
      org,
      ip_addr,
      logout
    };
  }
);
export { user as useUserStore }