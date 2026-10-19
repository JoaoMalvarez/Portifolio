// src/data/lugares.ts
// Medidas em % da imagem de fundo (0 a 100).
// x, y = posição dos "pés" da casa (centro da base) | w = largura
//
// PERSPECTIVA (o horizonte fica perto de y 45):
//  - Quanto maior o y (mais embaixo), maior a casa e mais NA FRENTE ela fica.
//  - As casas formam fileiras em ZIGUEZAGUE nos dois lados do caminho central,
//    e vão se aproximando do centro conforme sobem (como uma estrada que some no horizonte).
//  - A igreja fica no fim do caminho, no ponto de fuga.
//  - O centro (x entre 40 e 60, y acima de 70) fica livre: é o caminho.
//
// Fileiras:  A y54 (w9) · B y60 (w11) · C y67 (w14) · D y75 (w17) · E y85 (w20) · F y96 (w22)

// MUDE AQUI para aumentar ou diminuir TODAS as casas de uma vez (1 = normal)
const ESCALA = 1

export type Lugar = {
  id: string // vira a rota: /cidade/alquimista
  nome: string // texto da plaquinha
  titulo: string // título da tela do lugar
  descricao: string
  imagem: string
  x: number
  y: number
  w: number
  flip?: boolean
  frente?: boolean // true = o clique fica na frente de tudo
}

export type Enfeite = { imagem: string; x: number; y: number; w: number; flip?: boolean }

// ---------- Casas clicáveis (cada uma leva a uma tela) ----------
const baseLugares: Lugar[] = [
  {
    id: 'igreja',
    nome: 'Igreja',
    titulo: 'A Igreja',
    descricao: 'Aqui ficará o que você quiser colocar nela.',
    imagem: '/cidade/Igreja.png',
    x: 50,
    y: 60,
    w: 50,
    frente: true,
  },
  {
    id: 'biblioteca',
    nome: 'Biblioteca',
    titulo: 'A Biblioteca',
    descricao: 'Aqui ficará o que você quiser colocar nela.',
    imagem: '/cidade/Biblioteca.png',
    x: 27,
    y: 85,
    w: 45,
  },
  {
    id: 'alquimista',
    nome: 'Alquimista',
    titulo: 'A Mesa do Alquimista',
    descricao: 'Aqui ficarão os meus projetos.',
    imagem: '/cidade/Alquimista.png',
    x: 79,
    y: 96,
    w: 65,
  },
]

// ---------- Casas só de enfeite (não clicam) ----------
// Lado esquerdo: normais. Lado direito: espelhadas (flip) para "olharem" pro caminho.
const baseEnfeites: Enfeite[] = [
  // fundo, bem pequenas (quase no horizonte)
  { imagem: '/cidade/Casa3.png', x: 18, y: 66, w: 20 },
  { imagem: '/cidade/Casa1.png', x: 8, y: 55, w: 15 },
  { imagem: '/cidade/Casa2.png', x: 75, y: 57, w: 18, flip: true },

  { imagem: '/cidade/Casa2.png', x: 38, y: 55, w: 13 }, // A
  { imagem: '/cidade/Casa1.png', x: 64, y: 55, w: 13 }, // B
  { imagem: '/cidade/Casa3.png', x: 3, y: 75, w: 30 }, // C
  { imagem: '/cidade/Casa2.png', x: 41, y: 75, w: 28 , flip: true}, // D
  // E = Biblioteca (clicável)

  { imagem: '/cidade/Casa2.png', x: 75, y: 62, w: 15, flip: true }, // B
  { imagem: '/cidade/Casa1.png', x: 78, y: 82, w: 25, flip: true }, // E
  // F = Alquimista (clicável)
]

// Aplica a escala global (não precisa mexer aqui)
export const lugares: Lugar[] = baseLugares.map((l) => ({ ...l, w: l.w * ESCALA }))
export const enfeites: Enfeite[] = baseEnfeites.map((e) => ({ ...e, w: e.w * ESCALA }))