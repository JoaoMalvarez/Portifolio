<!-- src/components/CenaCidade.vue -->
<template>
  <section id="cidade" class="cena cidade">
    <RouterLink to="/" class="voltar">← Voltar ao castelo</RouterLink>

    <h1 class="titulo-cena">A Cidade</h1>

    <!-- Rua no centro (só cor por enquanto, troque por imagem depois) -->
    <div class="rua"></div>

    <!-- COLOQUE AQUI as casas, postes, moradores... -->
    <!-- Exemplo (descomente quando tiver a imagem em public/cidade/):
    <img class="item" src="/cidade/Casa1.png" alt="" style="top: 200px; left: calc(50% - 560px); width: 340px;" />
    -->
  </section>
</template>

<script setup lang="ts">
// Nada aqui por enquanto. Quando precisar de dados ou funções, escreva abaixo.
</script>

<style scoped>
.cena {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  image-rendering: pixelated;
  font-family: 'MedievalSharp', 'Georgia', serif;
}

/* Fundo de terra (só cor, sem imagem) */
.cidade {
  background-color: #7a6a4a;
}

/* Rua de pedra no centro */
.rua {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 260px;
  background-color: #8a8a8a;
}

.titulo-cena {
  position: relative;
  z-index: 2;
  margin: 0;
  padding-top: 70px;
  text-align: center;
  color: #fffbe0;
  font-size: 2.6rem;
  text-shadow: 3px 3px 0 #000;
}

.voltar {
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 10;
  padding: 6px 14px;
  color: #f1e3c0;
  background: #8b1e2d;
  border: 2px solid #3b2a1c;
  text-decoration: none;
}

/* Classe pronta para imagens soltas (casas, postes...) */
.item {
  position: absolute;
  z-index: 3;
  height: auto;
  image-rendering: pixelated;
}
</style>