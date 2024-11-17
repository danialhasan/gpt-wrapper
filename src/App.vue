<script setup lang="ts">
import { ref } from 'vue';
import { createAI } from './lib/openai';
import ApiKeyInput from './components/ApiKeyInput.vue';

const apiKey = ref('');
const prompt = ref('');
const response = ref('');
const loading = ref(false);

async function handleSubmit() {
  if (!apiKey.value) return;
  
  loading.value = true;
  try {
    const ai = createAI(apiKey.value);
    response.value = await ai.chat(prompt.value);
  } catch (error) {
    console.error(error);
    response.value = 'Error occurred while fetching response';
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="container">
    <h1>OpenAI Chat</h1>
    
    <ApiKeyInput v-model="apiKey" />

    <div class="input-group">
      <textarea
        v-model="prompt"
        placeholder="Enter your prompt"
        class="input"
      ></textarea>
    </div>

    <button 
      @click="handleSubmit"
      :disabled="!apiKey || !prompt || loading"
    >
      {{ loading ? 'Sending...' : 'Send' }}
    </button>

    <div v-if="response" class="response">
      <h3>Response:</h3>
      <p>{{ response }}</p>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
}

.input-group {
  margin-bottom: 1rem;
}

.input {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

textarea.input {
  min-height: 100px;
  resize: vertical;
}

.response {
  margin-top: 2rem;
  padding: 1.5rem;
  background: #1a1a1a;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.response h3 {
  color: #646cff;
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.2em;
}

.response p {
  margin: 0;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.87);
  white-space: pre-wrap;
}

button {
  width: 100%;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (prefers-color-scheme: light) {
  .response {
    background: #ffffff;
    border: 1px solid #e5e7eb;
  }

  .response p {
    color: #213547;
  }
}
</style>