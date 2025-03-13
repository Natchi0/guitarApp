import { ref } from "vue";

const selectedKey = ref(null);

export function useCircle() {
    function selectKey(key) {
        selectedKey.value = key;
    }

    return {
        selectedKey,
        selectKey
    }
}