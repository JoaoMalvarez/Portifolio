<!-- src/components/CenaCastelo.vue -->
<template>
  <section id="castelo" class="cena castelo">
    
    <img
      v-for="(p, i) in pilares"
      :key="'p' + i"
      class="pilar"
      src="/castelo/Coluna.png"
      :style="estiloPilar(p)"
      alt=""
    />
    <!-- TOPO: nome em cima, trono embaixo -->
    <header class="topo">
      <h1 class="nome">{{ perfil.nome }}</h1>
      <p class="cargo">{{ perfil.cargo }}</p>

      <div class="trono-area">
        <img class="banner banner-esq" src="/castelo/Banner.png" alt="" />
        <img class="banner banner-dir" src="/castelo/Banner.png" alt="" />
        <img class="trono" src="/castelo/Trono.png" alt="Trono" />

        <!-- Personagens do trono (o p8 abre o currículo) -->
        <img
          v-for="(s, i) in seresTrono"
          :key="'t' + i"
          class="ser"
          :class="{ clicavel: s.acao }"
          :src="s.src"
          :title="s.dica"
          :style="{
            bottom: '0',
            left: `calc(50% + ${s.x}px)`,
            width: s.w + 'px',
            transform: `translateX(-50%) scaleX(${s.flip ? -1 : 1})`,
          }"
          alt=""
          @click="s.acao?.()"
          @error="($event.target as HTMLImageElement).style.display = 'none'"
        />
      </div>
    </header>

    <!-- SALÃO: chão + tapete comprido + pergaminhos alternados -->
    <div class="salao">
      <div class="tapete"></div>

      <div class="grade">
        <article class="pergaminho col-esq linha-1">
          <h2>Sobre mim</h2>
          <p v-for="(p, i) in perfil.sobre" :key="i">{{ p }}</p>
        </article>

        <article class="pergaminho col-dir linha-2">
          <h2>Habilidades</h2>
          <ul class="tags">
            <li v-for="h in perfil.habilidades" :key="h">{{ h }}</li>
          </ul>
        </article>

        <article class="pergaminho col-esq linha-3">
          <h2>Formação</h2>
          <ul class="lista">
            <li v-for="(f, i) in perfil.formacao" :key="i">
              <strong v-if="f.titulo">{{ f.titulo }}</strong>
              <br v-if="f.titulo && f.detalhe" />
              <small v-if="f.detalhe">{{ f.detalhe }}</small>
            </li>
          </ul>
        </article>

        <article class="pergaminho col-dir linha-4">
          <h2>Contato</h2>
          <ul class="lista">
            <li v-for="c in perfil.contatos" :key="c.nome">
              <a :href="c.link" target="_blank" rel="noopener">{{ c.nome }}</a>
            </li>
          </ul>
        </article>
      </div>

      <!-- Personagens espalhados pelo caminho -->
      <img
        v-for="(s, i) in seresFundo"
        :key="'f' + i"
        class="ser"
        :src="s.src"
        :style="{
          top: s.top + 'px',
          left: `calc(50% + ${s.x}px)`,
          width: s.w + 'px',
          transform: `translateX(-50%) scaleX(${s.flip ? -1 : 1})`,
        }"
        alt=""
        @error="($event.target as HTMLImageElement).style.display = 'none'"
      />

      <!-- SAÍDA: fim do tapete -> cidade -->
      <div class="saida">
        <img
          class="guarda guarda-esq" 
          src="/personagens/p5.png"
          alt=""
          @mouseenter="brilho = true"
          @mouseleave="brilho = false"
          @click="ir('/cidade')"
        />

        <div
          class="porta"
          title="Clique para ver mais "
          @mouseenter="brilho = true"
          @mouseleave="brilho = false"
          @click="ir('/cidade')"
        >
          <div class="luz" :class="{ acesa: brilho }"></div>
          <span class="rotulo" :class="{ acesa: brilho }">Entrar na Cidade</span>
        </div>

        <img
          class="guarda guarda-dir"
          src="/personagens/p11.png"
          alt=""
          @mouseenter="brilho = true"
          @mouseleave="brilho = false"
          @click="ir('/cidade')"
        />
      </div>
    </div>

    <!-- POP-UP DO CURRÍCULO -->
    <Teleport to="body">
      <div v-if="curriculoAberto" class="modal-fundo" @click.self="fecharCurriculo">
        <div class="modal">
          <header class="modal-topo">
            <h2>Meu Currículo</h2>
            <div class="modal-acoes">
              <a href="/curriculo.pdf" download>Baixar</a>
              <button type="button" @click="fecharCurriculo">✕</button>
            </div>
          </header>
          <iframe src="/curriculo.pdf" title="Currículo"></iframe>
        </div>
      </div>
    </Teleport>
  </section>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'

type Ser = {
  src: string
  x: number
  w: number
  flip: boolean
  top?: number
  acao?: () => void // o que acontece ao clicar
  dica?: string // texto ao passar o mouse
}

const perfil = {
  nome: 'João Pedro Mazzante Alvarez',
  cargo: 'Desenvolvedor Front-end',
  sobre: [
    'Sou atualmente estudante de Ciências da Computação e amo fazer Front-end, Design e principalmente a área criativa!',
    'Recentemente tenho testando outras formas de fazer códigos em Front-end além de tentar criar alguns designs em pixel arts.',
  ],
  habilidades: ['Vue.js', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Git', 'Pixel Art', 'Python', 'C'],
  formacao: [
    { titulo: 'Ciências da Computação - Mackenzie', detalhe: 'Instituição · 2025 – 2028' },
    { titulo: 'Cursos e certificados:', detalhe: '' },
    { titulo: '', detalhe: 'Open Academy Mackenzie · 2025 · Introdução à Inovação e Tecnologia' },
    { titulo: '', detalhe: 'Open Academy Mackenzie · 2026 · Foundation Design iOS' },
    { titulo: '', detalhe: 'Open Academy Mackenzie · 2026 · Introdução ao Pensamento Computacional: Da Teoria à Prática Desplugada' },
  ],
  contatos: [
    { nome: 'GitHub', link: 'https://github.com/JoaoMalvarez' },
    { nome: 'LinkedIn', link: 'https://www.linkedin.com/in/joão-pedro-mazzante-alvarez-93947537a/' },
    { nome: 'E-mail', link: 'mailto:joaopedromazzante@gmail.com' },
  ],
}

// ----- navegação -----
import { useRouter } from 'vue-router'

const router = useRouter()

function ir(rota: string) {
  router.push(rota)
}

// ----- pop-up do currículo -----
const curriculoAberto = ref(false)
function abrirCurriculo() { curriculoAberto.value = true }
function fecharCurriculo() { curriculoAberto.value = false }

// trava a rolagem da página enquanto o pop-up está aberto
watch(curriculoAberto, (aberto) => {
  document.body.style.overflow = aberto ? 'hidden' : ''
})

// ESC fecha o pop-up
function aoApertarTecla(e: KeyboardEvent) {
  if (e.key === 'Escape') fecharCurriculo()
}
onMounted(() => window.addEventListener('keydown', aoApertarTecla))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', aoApertarTecla)
  document.body.style.overflow = ''
})

// ----- luz da saída -----
const brilho = ref(false)

// Ao lado do trono. x = distância do centro, w = largura, flip = espelhar
const seresTrono: Ser[] = [
  { src: '/personagens/p1.png', x: -200, w: 150, flip: false }, // gato mordomo
  {
    src: '/personagens/p8.png', // lontra aprendiz
    x: 500,
    w: 250,
    flip: true,
    acao: abrirCurriculo,
    dica: 'Clique para ver meu currículo',
  },
]

// No salão. top = altura em px dentro do salão (0 = começo do chão)
const seresFundo: Ser[] = [
  // linha 1 (pergaminho à esquerda -> personagens à direita)
  { src: '/personagens/p9.png', x: 330, top: 260, w: 200, flip: true }, // rato palitó
  { src: '/personagens/p3.png', x: 520, top: 380, w: 120, flip: true }, // pequeno gato
  // linha 2 (pergaminho à direita -> personagens à esquerda)
  { src: '/personagens/p12.png', x: -330, top: 550, w: 300, flip: true }, // gato mago
  { src: '/personagens/p6.png', x: -510, top: 820, w: 200, flip: true }, // gato aprendiz
  // linha 3 (pergaminho à esquerda -> personagens à direita)
  { src: '/personagens/p4.png', x: 340, top: 1300, w: 200, flip: true }, // gato coringa
  { src: '/personagens/p7.png', x: 400, top: 940, w: 350, flip: true }, // bardos animais
  // linha 4 (pergaminho à direita -> personagens à esquerda)
  { src: '/personagens/p2.png', x: -340, top: 1380, w: 170, flip: true }, // sapo explorador
]

// ----- pilares nas bordas, com espaço entre eles -----
const escalaPilar = 1.4   // tamanho
const margemBorda = 70    // distância do centro do pilar até a borda da tela
const espaco = 650        // distância entre o topo de um pilar e o do próximo
const quantidade = 5      // sobe se sobrar chão sem pilar embaixo

const pilares = Array.from({ length: quantidade }, (_, i) => i).flatMap((i) => [
  { y: i * espaco, lado: -1 },
  { y: i * espaco, lado: 1 },
])

function estiloPilar(p: { y: number; lado: number }) {
  return {
    top: p.y + 'px', // o 1º tem y = 0: o topo dele encosta no topo da tela
    left: p.lado < 0 ? `${margemBorda}px` : `calc(100% - ${margemBorda}px)`,
    width: 150 * escalaPilar + 'px',
    transform: `translateX(-50%) scaleX(${-p.lado})`,
  }
}

</script>

<style scoped>
.cena {
  position: relative;
  overflow: hidden;
  image-rendering: pixelated;
  font-family: 'MedievalSharp', 'Georgia', serif;
}

img { position: absolute; image-rendering: pixelated; }

/* ---------- PAREDE ---------- */
.castelo {
  background-image: url('/castelo/Parede_Pedra.jpg');
  background-size: 350px;
  background-repeat: repeat;
}

/* ---------- PILARES (faixa repetida na altura toda) ---------- */
.pilar {
  z-index: 2;
  height: auto;
  pointer-events: none;
  filter: drop-shadow(0 14px 10px rgba(0, 0, 0, 0.55));
}

/* ---------- TOPO ---------- */
.topo {
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 48px;
  margin-bottom: -70px;
}

.nome {
  margin: 0;
  color: #e0b040;
  font-size: 4rem;
  text-shadow: 4px 4px 0 #000;
  white-space: nowrap;
}

.cargo {
  margin: 4px 0 24px;
  color: #f1e3c0;
  font-size: 1.4rem;
  text-shadow: 2px 2px 0 #000;
}

.trono-area {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
}

.trono { position: static; width: 340px; z-index: 2; }

.banner { top: 0; width: 200px; z-index: 1; }
.banner-esq { left: calc(50% - 470px); }
.banner-dir { left: calc(50% + 270px); }

/* ---------- SALÃO (CAMINHO COMPRIDO) ---------- */
.salao {
  position: relative;
  padding: 130px 0 160px;
  background-image:
    linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0, rgba(0, 0, 0, 0) 450px),
    url('/castelo/Chão_Pedra.jpg');
  background-size: 100% 450px, 300px 140px;
  background-repeat: no-repeat, repeat;
  box-shadow: inset 0 24px 36px -12px rgba(0, 0, 0, 0.7);
}

.salao::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 16px;
  background-image: url('/castelo/Baixo_Parede.jpg');  
  background-size: 120px;
  border-bottom: 4px solid #12121c;
  box-shadow: 0 8px 0 rgba(0, 0, 0, 0.35);
  z-index: 1;
}

.tapete {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 260px;
  background-image: url('/castelo/Tapete.jpg');
  background-size: 260px 140px;
  background-repeat: repeat-y;
}

/* ---------- PERGAMINHOS ALTERNADOS ---------- */
.grade {
  position: relative;
  z-index: 3;
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: 1fr 260px 1fr;
  grid-auto-rows: minmax(380px, auto); /* altura mínima de cada trecho */
  column-gap: 40px;
  row-gap: 60px;
  align-items: center;
}

.col-esq { grid-column: 1; }
.col-dir { grid-column: 3; }
.linha-1 { grid-row: 1; }
.linha-2 { grid-row: 2; }
.linha-3 { grid-row: 3; }
.linha-4 { grid-row: 4; }

.pergaminho {
  padding: 24px 28px;
  color: #3b2a1c;
  background: #e8d5a8;
  border: 4px solid #5a3d1c;
  box-shadow: 6px 6px 0 rgba(0, 0, 0, 0.6), inset 0 0 30px rgba(120, 80, 30, 0.35);
}

.pergaminho h2 {
  margin: 0 0 12px;
  font-size: 1.6rem;
  color: #8b1e2d;
  border-bottom: 2px solid #5a3d1c;
  padding-bottom: 6px;
}

.pergaminho p { margin: 0 0 10px; line-height: 1.5; }

.tags { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 8px; }
.tags li {
  padding: 4px 10px;
  background: #8b1e2d;
  color: #f1e3c0;
  border: 2px solid #3b2a1c;
  font-size: 0.95rem;
}

.lista { list-style: none; margin: 0; padding: 0; display: grid; gap: 10px; }
.lista a { color: #8b1e2d; font-weight: bold; }

/* ---------- SERES ---------- */
.ser { z-index: 4; height: auto; }

/* ---------- CLICÁVEL ---------- */
.clicavel {
  cursor: pointer;
  filter: drop-shadow(0 0 8px #e0b040);
  transition: filter 0.2s;
}
.clicavel:hover {
  filter: drop-shadow(0 0 18px #ffd36b) brightness(1.15);
}

/* ---------- SAÍDA (fim do tapete) ---------- */
.saida {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 700px;
  height: 300px;
  z-index: 4;
  pointer-events: none; /* só os filhos recebem o mouse */
}

.porta {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 260px; /* mesma largura do tapete */
  height: 100%;
  cursor: pointer;
  pointer-events: auto;
}

/* A "porta abrindo": luz em formato de arco */
.luz {
  position: absolute;
  inset: 0;
  border-radius: 130px 130px 0 0;
  background: radial-gradient(ellipse at 50% 100%, #fffbe0 0%, #ffd36b 35%, rgba(255, 154, 60, 0) 75%);
  opacity: 0;
  transform: scaleY(0.4);
  transform-origin: bottom;
  filter: blur(2px);
  transition: opacity 0.4s ease, transform 0.5s ease;
}
.luz.acesa {
  opacity: 1;
  transform: scaleY(1);
  box-shadow: 0 0 80px 30px rgba(255, 211, 107, 0.55);
}

.rotulo {
  position: absolute;
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  color: #fffbe0;
  font-size: 1.2rem;
  text-shadow: 2px 2px 0 #000;
  opacity: 0;
  transition: opacity 0.3s;
}
.rotulo.acesa { opacity: 1; }

.guarda {
  position: absolute;
  bottom: 0;
  width: 190px;
  height: auto;
  cursor: pointer;
  pointer-events: auto;
  transition: filter 0.2s;
}
.guarda:hover { filter: brightness(1.15); }
.guarda-esq { left: 0; } 
.guarda-dir { right: 0; transform: scaleX(-1); } /* espelha pra olhar pro tapete */

/* ---------- POP-UP DO CURRÍCULO ---------- */
.modal-fundo {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  place-items: center;
  padding: 24px;
  background: rgba(0, 0, 0, 0.75);
}

.modal {
  width: min(900px, 100%);
  height: min(90vh, 1100px);
  display: flex;
  flex-direction: column;
  background: #e8d5a8;
  border: 4px solid #5a3d1c;
  box-shadow: 8px 8px 0 rgba(0, 0, 0, 0.6);
  font-family: 'MedievalSharp', 'Georgia', serif;
}

.modal-topo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 18px;
  border-bottom: 3px solid #5a3d1c;
}
.modal-topo h2 { margin: 0; color: #8b1e2d; }

.modal-acoes { display: flex; gap: 12px; align-items: center; }
.modal-acoes a {
  padding: 4px 12px;
  color: #f1e3c0;
  background: #8b1e2d;
  border: 2px solid #3b2a1c;
  text-decoration: none;
}
.modal-acoes button {
  font-size: 1.2rem;
  color: #3b2a1c;
  background: none;
  border: none;
  cursor: pointer;
}

.modal iframe { flex: 1; width: 100%; border: 0; background: #fff; }

/* ---------- CELULAR ---------- */
@media (max-width: 900px) {
  .pilar-faixa, .banner, .ser { display: none; }
  .nome { font-size: 2.4rem; white-space: normal; text-align: center; }
  .trono { width: 220px; }
  .tapete { width: 120px; opacity: 0.5; }
  .grade { grid-template-columns: 1fr; grid-auto-rows: auto; }
  .col-esq, .col-dir { grid-column: 1; }
  .linha-1, .linha-2, .linha-3, .linha-4 { grid-row: auto; }
  .saida { width: 100%; height: 200px; }
  .porta { width: 120px; }
  .guarda { width: 110px; }
}
</style>