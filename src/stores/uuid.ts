import { defineStore } from 'pinia';
import { ref } from 'vue';
import {v4 as uuidv4} from 'uuid';
export const useUuidStore = defineStore('uuidStore', () => {
  const refreshUuid = ref<string>(uuidv4());
  function setUuid() {
    refreshUuid.value = uuidv4();
  }
  return {
    refreshUuid,
    setUuid
  };
});
