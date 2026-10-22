// src/data/projetos.ts
// Cada projeto vira um frasco na mesa do alquimista.
// x, y = posição dos "pés" do frasco (% da imagem) | w = largura (%)
export type Projeto = {
  id: string
  nome: string
  descricao: string
  tecnologias: string[] // os "ingredientes" da poção
  links: { nome: string; url: string }[]
  cor: string // cor da poção (usada no frasco desenhado em CSS)
  imagem?: string // opcional: imagem de frasco pronta (ex: '/alquimista/FrascoRoxo.png')
  foto1?: string // opcional: fotos do site
  x: number
  y: number
  w: number
}

export const projetos: Projeto[] = [
  {
    id: 'portfolio',
    nome: 'Portfólio Medieval',
    descricao: 'Este site: meu portfólio em pixel art com tema de RPG, feito em Vue.js.',
    tecnologias: ['Vue.js', 'TypeScript', 'CSS', 'Pixel Art'],
    links: [{ nome: 'Código', url: 'https://github.com/JoaoMalvarez/Portifolio' }],
    cor: '#8e44ad',
    imagem: '/alquimista/FrascoRoxo.png',
    x: 30,
    y: 80,
    w: 25,
  },
  {
    id: 'projeto-2',
    nome: 'Projeto RPG',
    descricao: 'Escreva aqui o que esse projeto faz e qual problema ele resolve.',
    tecnologias: ['Python'],
    links: [{ nome: 'Código', url: 'https://github.com/JoaoMalvarez' }],
    cor: '#27ae60',
    imagem: '/alquimista/FrascoVerde.png',
    x: 50,
    y: 82,
    w: 26,
  },
  {
    id: 'projeto-3',
    nome: 'Projeto Star Wars - WTT',
    descricao: 'Esse projeto, foi feito para uma apresentação no Mackenzie sobre SPA em Vue.js, na qual eu fiz o site e apresentei.',
    tecnologias: ['Vue.js', 'TypeScript', 'CSS', 'APIs', 'Vite', 'Axios', 'Pinia'],
    links: [{ nome: 'Código', url: 'https://github.com/JoaoMalvarez/WTT-SPA' }],
    cor: '#000000',
    imagem: '/alquimista/FrascoEstrela.png',
    foto1: '/alquimista/FotoSW-main.png',
    x: 70,
    y: 80,
    w: 24,
  },
]