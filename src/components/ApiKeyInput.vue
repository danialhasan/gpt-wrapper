<script setup lang="ts">
import { ref, onMounted } from 'vue';

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const envApiKey = ref(import.meta.env.VITE_OPENAI_API_KEY || '');

onMounted(() => {
  if (envApiKey.value) {
    emit('update:modelValue', envApiKey.value);
  }
});
</script>

<template>
  <div class="input-group">
    <input 
      :value="modelValue"
      @input="$event => emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      type="password"
      placeholder="Enter your OpenAI API key"
      class="input"
    />
    <p class="hint" v-if="!envApiKey">
      Create a .env file and add VITE_OPENAI_API_KEY=your-api-key
    </p>
  </div>
</template>

<style scoped>
.hint {
  font-size: 0.8em;
  color: #666;
  margin-top: 0.5rem;
}

.input {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>