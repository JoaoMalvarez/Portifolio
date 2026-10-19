<!-- src/views/LugarView.vue -->
<!-- Tela provisória: serve para qualquer lugar da vila. Depois você pode
     criar uma tela própria para cada um (ex: AlquimistaView.vue). -->
<template>
  <main class="lugar">
    <RouterLink to="/cidade" class="voltar">← Voltar à vila</RouterLink>

    <section v-if="lugar" class="conteudo">
      <h1>{{ lugar.titulo }}</h1>
      <p>{{ lugar.descricao }}</p>
    </section>

    <section v-else class="conteudo">
      <h1>Lugar não encontrado</h1>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { lugares } from '@/data/lugares'

const route = useRoute()
const lugar = computed(() => lugares.find((l) => l.id === route.params.lugar))
</script>

<style scoped>
.lugar {
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: #2a2118;
  color: #f1e3c0;
  font-family: 'MedievalSharp', 'Georgia', serif;
  text-align: center;
}
.conteudo h1 { color: #e0b040; font-size: 2.6rem; text-shadow: 3px 3px 0 #000; }
.voltar {
  position: absolute;
  top: 16px;
  left: 16px;
  padding: 6px 14px;
  color: #f1e3c0;
  background: #8b1e2d;
  border: 2px solid #3b2a1c;
  text-decoration: none;
}
</style>