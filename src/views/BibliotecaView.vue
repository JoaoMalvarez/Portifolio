<!-- src/views/BibliotecaView.vue -->
<template>
  <main class="tela">
    <div class="cena" @mousemove="medir">
      <!-- Fundo (se a imagem não existir, aparece a cor provisória) -->
      <img class="fundo" :src="fundo" alt="" @error="esconder" />

      <RouterLink to="/cidade" class="voltar">← Voltar à vila</RouterLink>
      <h1 class="titulo">A Biblioteca</h1>

      <!-- Um livro por projeto -->
      <button
        v-for="l in livros"
        :key="l.id"
        class="livro"
        :class="{flutua: l.float}"
        :style="{ left: l.x + '%', top: l.y + '%', width: l.w + '%', zIndex: Math.round(l.y * 10), '--cor': l.cor }"
        :aria-label="l.nome"
        @click="aberto = l"
      >
        <img v-if="l.imagem" :src="l.imagem" alt="" @error="esconder" />
        <span v-else class="capa"><span class="paginas"></span></span>
        <span class="rotulo">{{ l.nome }}</span>
      </button>

      <!-- Pergaminho com os detalhes do projeto -->
      <div v-if="aberto" class="modal-fundo" @click.self="aberto = null">
        <article class="pergaminho">
          <button class="fechar" type="button" @click="aberto = null">✕</button>
          <h2>{{ aberto.nome }}</h2>
          <p>{{ aberto.descricao }}</p>

          <h3>Ferramentas</h3>
          <ul class="tags">
            <li v-for="t in aberto.tecnologias" :key="t">{{ t }}</li>
          </ul>

          <template v-if="aberto.foto1">
            <h4>Imagem do Projeto</h4>
            <img :src="aberto.foto1" alt="" @error="esconder" />
          </template>

          <div class="links">
            <a v-for="l in aberto.links" :key="l.nome" :href="l.url" target="_blank" rel="noopener">{{ l.nome }}</a>
          </div>
        </article>
      </div>

      <!-- Modo de ajuste: aperte D -->
      <div v-if="debug" class="medidor">Modo ajuste (D para sair)<br />mouse: x {{ mouse.x }} · y {{ mouse.y }}</div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { livros, type Livros } from '../data/livros'

const fundo = '/biblioteca/Fundo.jpg'
const aberto = ref<Livros | null>(null)

function esconder(e: Event) {
  ;(e.target as HTMLImageElement).style.display = 'none'
}

// ----- modo de ajuste (descobrir coordenadas) -----
const debug = ref(false)
const mouse = ref({ x: 0, y: 0 })

function medir(e: MouseEvent) {
  if (!debug.value) return
  const r = (e.currentTarget as HTMLElement).getBoundingClientRect()
  mouse.value = {
    x: +(((e.clientX - r.left) / r.width) * 100).toFixed(1),
    y: +(((e.clientY - r.top) / r.height) * 100).toFixed(1),
  }
}

function aoApertarTecla(e: KeyboardEvent) {
  if (e.key === 'Escape') aberto.value = null
  if (e.key.toLowerCase() === 'd') debug.value = !debug.value
}
onMounted(() => window.addEventListener('keydown', aoApertarTecla))
onBeforeUnmount(() => window.removeEventListener('keydown', aoApertarTecla))
</script>

<style scoped>
.tela {
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: #0d0d12;
}

/* A cena mantém 16:9: fundo e livros escalam juntos */
.cena {
  position: relative;   
  width: min(100vw, calc(100vh * 16 / 9));
  aspect-ratio: 16 / 9;
  overflow: hidden;
  image-rendering: pixelated;
  font-family: 'MedievalSharp', 'Georgia', serif;
}

.fundo {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  image-rendering: pixelated;
}

.titulo {
  position: absolute;
  top: 3%;
  left: 50%;
  transform: translateX(-50%);
  margin: 0;
  z-index: 5;
  color: #e0b040;
  font-size: clamp(1.2rem, 2.6vw, 2.6rem);
  text-shadow: 3px 3px 0 #000;
  white-space: nowrap;
}

.voltar {
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 1000;
  padding: 4px 12px;
  color: #f1e3c0;
  background: #8b1e2d;
  border: 2px solid #3b2a1c;
  text-decoration: none;
  font-size: 0.9rem;
}

/* ---------- LIVROS ---------- */
.livro {
  position: absolute;
  padding: 0;
  border: 0;
  background: none;
  transform: translate(-50%, -100%);
  cursor: pointer;
  transition: translate 0.2s, filter 0.2s;
}
.livro:hover {
  translate: 0 -6px;
  filter: brightness(1.2) drop-shadow(0 0 10px var(--cor));
}
.livro img { 
  display: block; 
  width: 100%; 
  height: auto; 
  image-rendering: pixelated;
}

/* só os livros com "float: true" flutuam */
.livro.flutua img,
.livro.flutua .capa {
  animation: respirar 2.0s ease-in-out infinite;
}

@keyframes respirar {
  0%, 100% { translate: 0 0; }
  50%      { translate: 0 -9px; }
}

/* livro provisório desenhado em CSS */
.capa {
  position: relative;
  display: block;
  width: 100%;
  aspect-ratio: 5 / 6;
  border: 3px solid #cfe8ef;
  border-radius: 25% 25% 25% 25% / 25% 25% 25% 25%;
  background: rgba(255, 255, 255, 0.12);
}
.paginas {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 65%;
  background: var(--cor);
  border-radius: 0 0 40% 40% / 0 0 35% 35%;
  box-shadow: 0 0 14px var(--cor);
}

/* nome só aparece ao passar o mouse */
.rotulo {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%, 6px);
  padding: 0.1em 0.5em;
  font-size: clamp(8px, 0.85vw, 14px);
  color: #f1e3c0;
  background: #6b4a2a;
  border: 2px solid #3b2a1c;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.2s;
  pointer-events: none;
}
.livro:hover .rotulo { opacity: 1; }

/* ---------- PERGAMINHO ---------- */
.modal-fundo {
  position: absolute;
  inset: 0;
  z-index: 2000;
  display: grid;
  place-items: center;
  background: rgba(0, 0, 0, 0.7);
}

.pergaminho {
  position: relative;
  width: min(520px, 90%);
  max-height: 90%;
  overflow: auto;
  padding: 24px 28px;
  color: #3b2a1c;
  background: #e8d5a8;
  border: 4px solid #5a3d1c;
  box-shadow: 8px 8px 0 rgba(0, 0, 0, 0.6), inset 0 0 30px rgba(120, 80, 30, 0.35);
}
.pergaminho h2 { margin: 0 0 10px; color: #8b1e2d; font-size: 1.6rem; }
.pergaminho h3 { margin: 16px 0 8px; font-size: 1rem; }
.pergaminho img { display: block; width: 100%; height: auto; image-rendering: optimizeQuality; } 
.pergaminho p { margin: 0; line-height: 1.5; }

.fechar {
  position: absolute;
  top: 8px;
  right: 12px;
  font-size: 1.2rem;
  color: #3b2a1c;
  background: none;
  border: none;
  cursor: pointer;
}

.tags { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 8px; }
.tags li {
  padding: 4px 10px;
  color: #f1e3c0;
  background: #8b1e2d;
  border: 2px solid #3b2a1c;
  font-size: 0.95rem;
}

.links { display: flex; gap: 10px; margin-top: 18px; }
.links a {
  padding: 6px 14px;
  color: #f1e3c0;
  background: #5a3d1c;
  border: 2px solid #3b2a1c;
  text-decoration: none;
}
.links a:hover { background: #8b1e2d; }

/* ---------- MODO AJUSTE ---------- */
.medidor {
  position: absolute;
  right: 12px;
  top: 12px;
  z-index: 3000;
  padding: 8px 12px;
  color: #fff;
  background: rgba(0, 0, 0, 0.8);
  font: 12px/1.5 monospace;
}
</style>