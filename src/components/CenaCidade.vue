<!-- src/components/CenaCidade.vue -->
<template>
  <main class="tela">
    <div class="cena" @mousemove="medir" @click="marcar">
      <!-- Fundo -->
      <img class="fundo" :src="imagemVila" alt="Vila" @error="esconder" />

      <!-- Casas de enfeite -->
      <img
        v-for="(e, i) in enfeites"
        :key="'e' + i"
        class="enfeite"
        :class="{ espelhado: e.flip }"
        :src="e.imagem"
        :style="{ left: e.x + '%', top: e.y + '%', width: e.w + '%', zIndex: Math.round(e.y * 10) }"
        alt=""
        @error="esconder"
      />

      <!-- Casas clicáveis: a própria imagem é o botão, a plaquinha vai embaixo -->
      <template v-for="l in lugares" :key="l.id">
        <!-- imagem de trás (só quando o clique fica na frente) -->
        <img
          v-if="l.frente"
          class="casa-fundo"
          :class="{ espelhado: l.flip, brilho: hover === l.id }"
          :src="l.imagem"
          :style="{ left: l.x + '%', top: l.y + '%', width: l.w + '%', zIndex: Math.round(l.y * 10) }"
          alt=""
          @error="esconder"
        />

        <button
          class="casa"
          :class="{ debug, transparente: l.frente }"
          :style="{
            left: l.x + '%',
            top: l.y + '%',
            width: l.w + '%',
            zIndex: l.frente ? 5000 : Math.round(l.y * 10),
          }"
          @click="abrir(l.id)"
          @mouseenter="hover = l.id"
          @mouseleave="hover = null"
        >
          <img :class="{ espelhado: l.flip }" :src="l.imagem" :alt="l.nome" @error="esconder" />
          <span class="placa">{{ l.nome }}</span>
        </button>
      </template>

      <!-- Seres vivendo na vila (tamanho calculado pela altura) -->
      <div
        v-for="(s, i) in seres"
        :key="'s' + i"
        class="ser"
        :style="{
          left: s.x + '%',
          top: s.y + '%',
          width: larguraSer(s) + '%',
          zIndex: Math.round(s.y * 10),
          '--anda': (s.anda ?? 0) + '%',
        }"
      >
        <img
          :class="{ espelhado: s.flip && !s.anda, anda: s.anda }"
          :src="s.src"
          :style="{ animationDelay: i * 0.4 + 's' }"
          alt=""
          @error="esconder"
        />
      </div>

      <RouterLink to="/" class="voltar">← Castelo</RouterLink>

      <!-- Modo de ajuste: aperte D -->
      <div v-if="debug" class="medidor">
        Modo ajuste (D para sair)<br />
        mouse: x {{ mouse.x }} · y {{ mouse.y }}<br />
        clique na cena para anotar um ponto
        <div v-if="marcado">marcado: x: {{ marcado.x }}, y: {{ marcado.y }}</div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { lugares, enfeites } from '../data/lugares'

const router = useRouter()

const hover = ref<string | null>(null)

const imagemVila = '/cidade/Background_City.jpg'

function esconder(e: Event) {
  ;(e.target as HTMLImageElement).style.display = 'none'
}

function abrir(id: string) {
  if (debug.value) return // no modo ajuste não navega
  router.push(`/cidade/${id}`)
}

// ----- seres da vila -----
type SerVila = {
  src: string
  x: number // posição horizontal (%)
  y: number // posição dos pés (%) — define o tamanho pela perspectiva
  w?: number
  esc?: number // multiplicador de tamanho (animais: 0.7, por exemplo)
  flip?: boolean // espelhar
  anda?: number // anda de um lado pro outro (em larguras do próprio ser)
}

// MUDE AQUI para aumentar/diminuir TODOS os seres (suas casas estão grandes: se
// os seres ficarem pequenos, suba para 0.4 ou 0.5)
const ESCALA_SERES = 0.3

// tamanho automático: quanto mais embaixo (y maior), maior
function larguraSer(s: SerVila) {
  if (s.w !== undefined) return s.w // tamanho manual
  return Math.max(2.5, (s.y - 45) * ESCALA_SERES) * (s.esc ?? 1)
}

const seres: SerVila[] = [
  { src: '/personagens/p13.png', x: 40, y: 72, flip: true, anda: 50  },
  { src: '/personagens/p14.png', x: 70, y: 100, w: 10, anda: 90 },
  { src: '/personagens/p15.png', x: 55, y: 63},
  { src: '/personagens/p16.png', x: 61, y: 80, w: 7},
  { src: '/personagens/p17.png', x: 5, y: 82, w: 8 },
  { src: '/personagens/p18.png', x: 43, y: 60 },
  { src: '/personagens/p19.png', x: 32, y: 92, w: 8 },
]

// ----- modo de ajuste (para descobrir coordenadas) -----
const debug = ref(false)
const mouse = ref({ x: 0, y: 0 })
const marcado = ref<{ x: number; y: number } | null>(null)

function pos(e: MouseEvent) {
  const r = (e.currentTarget as HTMLElement).getBoundingClientRect()
  return {
    x: +(((e.clientX - r.left) / r.width) * 100).toFixed(1),
    y: +(((e.clientY - r.top) / r.height) * 100).toFixed(1),
  }
}
function medir(e: MouseEvent) { if (debug.value) mouse.value = pos(e) }
function marcar(e: MouseEvent) { if (debug.value) marcado.value = pos(e) }

function aoApertarTecla(e: KeyboardEvent) {
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

/* A cena mantém 16:9: imagem e casas escalam juntas */
.cena {
  position: relative;
  width: min(100vw, calc(100vh * 16 / 9));
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: #4a5d3a; /* cor provisória */
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

.espelhado { scale: -1 1; }

/* ---------- ENFEITES ---------- */
.enfeite {
  position: absolute;
  height: auto;
  transform: translate(-50%, -100%);
  image-rendering: pixelated;
  pointer-events: none;
}

/* ---------- CASAS CLICÁVEIS ---------- */
.casa {
  position: absolute;
  padding: 0;
  border: 0;
  background: none;
  transform: translate(-50%, -100%);
  cursor: pointer;
}
.casa img {
  display: block;
  width: 100%;
  height: auto;
  image-rendering: pixelated;
  transition: filter 0.2s;
}
/* destaque bem discreto ao passar o mouse */
.casa:hover img { filter: brightness(1.1); }
.casa.debug { outline: 2px dashed red; }

/* casa com clique na frente: imagem de trás + botão invisível por cima */
.casa-fundo {
  position: absolute;
  height: auto;
  transform: translate(-50%, -100%);
  image-rendering: pixelated;
  pointer-events: none;
  transition: filter 0.2s;
}
.casa-fundo.brilho { filter: brightness(1.1); }
.casa.transparente img { opacity: 0; }

/* ---------- PLAQUINHAS ---------- */
.placa {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%, 4px);
  padding: 0.1em 0.5em;
  font-size: clamp(8px, 0.85vw, 14px);
  color: #f1e3c0;
  background: #6b4a2a;
  border: 2px solid #3b2a1c;
  box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.5);
  white-space: nowrap;
}
.casa:hover .placa { background: #8a6035; }

/* ---------- SERES ---------- */

/* caixa de fora: só posiciona */
.ser {
  position: absolute;
  transform: translate(-50%, -100%);
  pointer-events: none;
}

/* imagem de dentro: respira, anda e vira sem sair do lugar */
.ser img {
  display: block;
  width: 100%;
  height: auto;
  image-rendering: pixelated;
  animation: respirar 2.4s ease-in-out infinite;
}
.ser img.anda { animation: passear 12s linear infinite; }

@keyframes respirar {
  0%, 100% { translate: 0 0; }
  50%      { translate: 0 -0.5px; }
}

/* anda, PARA, vira no mesmo lugar, PARA um instante e continua */
@keyframes passear {
  0%    { translate: calc(var(--anda) * -1) 0; scale: 1 1; }
  5%    { translate: calc(var(--anda) * -1) 0; scale: 1 1; }
  5.1%  { translate: calc(var(--anda) * -1) 0; scale: -1 1; }
  10%   { translate: calc(var(--anda) * -1) 0; scale: -1 1; }
  45%   { translate: var(--anda) 0;             scale: -1 1; }
  55%   { translate: var(--anda) 0;             scale: -1 1; }
  55.1% { translate: var(--anda) 0;             scale: 1 1; }
  60%   { translate: var(--anda) 0;             scale: 1 1; }
  95%   { translate: calc(var(--anda) * -1) 0;  scale: 1 1; }
  100%  { translate: calc(var(--anda) * -1) 0;  scale: 1 1; }
}

/* ---------- VOLTAR ---------- */
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

/* ---------- MODO AJUSTE ---------- */
.medidor {
  position: absolute;
  right: 12px;
  top: 12px;
  z-index: 1000;
  padding: 8px 12px;
  color: #fff;
  background: rgba(0, 0, 0, 0.8);
  font: 12px/1.5 monospace;
}
</style>