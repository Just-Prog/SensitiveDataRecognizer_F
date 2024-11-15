import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user";

const user = storeToRefs(useUserStore())

export default user