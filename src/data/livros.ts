// src/data/livros.ts
// Cada projeto vira um livro na mesa da biblioteca.
// x, y = posição dos "pés" dos livros (% da imagem) | w = largura (%)
export type Livros = {
  id: string
  nome: string
  descricao: string
  tecnologias: string[] // os "ingredientes" da poção
  links: { nome: string; url: string }[]
  cor: string // cor da poção (usada no frasco desenhado em CSS)
  imagem?: string // opcional: imagem de frasco pronta (ex: '/alquimista/FrascoRoxo.png')
  foto1?: string // opcional: fotos do site
  float?: boolean
  x: number
  y: number
  w: number
}

export const livros: Livros[] = [
  {
    id: 'portfolio',
    nome: 'Estrutura de Dados II',
    descricao: 'Este "livro" representa o que eu aprendi em Estruturas de Dados II, com o meu GitHub com a matéria disponível.',
    tecnologias: ['Árvores', 'Herança', 'Tabela Hash', 'Java'],
    links: [{ nome: 'GitHub', url: 'https://github.com/JoaoMalvarez/Estrutura-de-Dados-II' }],
    cor: '#2A004C',
    imagem: '/biblioteca/Livro1.png',
    x: 22,
    y: 87.8,
    w: 11,
  },
  {
    id: 'projeto-2',
    nome: 'Estrutura de Dados I',
    descricao: 'Aqui está o que eu aprendi em Estrutura de Dados I.',
    tecnologias: ['Java', 'Contadores', 'Pilha', 'Fila', 'Deque', 'Lista Encadeada', 'Lista Duplamente Encadeada', 'Lista Encadeada Circular', 'Lista Duplamente Encadeada Circular', '"Nós"'],
    links: [{ nome: 'GitHub', url: 'https://github.com/JoaoMalvarez/Estrutura-de-Dados-I' }],
    cor: '#36506C',
    imagem: '/biblioteca/Livro2.png',
    x: 45,
    y: 88,
    w: 15,
  },
  {
    id: 'projeto-3',
    nome: 'Projeto Fita Cassete',
    descricao: 'Esse projeto, foi feito como um trabalho de Projeto e Análise de Algoritmos II.',
    tecnologias: ['Java', 'Mochila', 'Leitura de Arquivos', 'Parser'],
    links: [{ nome: 'Código', url: 'https://github.com/JoaoMalvarez/Fita_Cassete' }],
    cor: '#9C66B6',
    imagem: '/biblioteca/Livro3.png',
    x: 68,
    y: 88,
    w: 12,
  },
  {
    id: 'projeto-4',
    nome: 'Projeto e Análise de Algoritmos II',
    descricao: 'Esse é o material de aprendizado de Projeto e Análise de Algoritmos II.',
    tecnologias: ['Backtracking', 'Algoritmo Guloso'],
    links: [{ nome: 'GitHub', url: 'https://github.com/JoaoMalvarez/PAA2' }],
    cor: '#9C66B6',
    imagem: '/biblioteca/Livro4.png',
    x: 80,
    y: 85,
    w: 5,
  },
  {
    id: 'projeto-5',
    nome: 'Projetos de Estrutura de Dados I',
    descricao: 'Esses projetos, foram feitos como trabalhos de Estrutura de Dados I.',
    tecnologias: ['Java', 'Linked List', 'Leitura de Arquivos', 'Nodes', 'Deque', 'Jogo de Hannoi', 'Pilha', 'Feito em Grupo'],
    links: [{ nome: 'Código', url: 'https://github.com/JoaoMalvarez/Projeto_Estrutura_de_Dados' }],
    cor: '#9C66B6',
    imagem: '/biblioteca/Livro5.png',
    x: 60,
    y: 85,
    w: 18,
  },
  {
    id: 'projeto-6',
    nome: 'Projeto de Estrutura de Dados II',
    descricao: 'Esse projeto, foi feito como um trabalho de Estrutura de Dados II.',
    tecnologias: ['Java', 'Leitura de Arquivos', 'Procura de Palavras em Arquivos', 'Árvores', 'Indexação', 'Feito em Grupo'],
    links: [{ nome: 'Código', url: 'https://github.com/ViniciusBisordiAcaua/Projeto-de-Estrutura-de-Dados-II' }],
    cor: '#9C66B6',
    imagem: '/biblioteca/Livro6.png',
    x: 35,
    y: 80,
    w: 9,
  },
  {
    id: 'projeto-7',
    nome: 'Projeto Sentinal Trade',
    descricao: 'Esse projeto, foi feito como um trabalho de Projeto de Software. Na qual o projeto busca fazer um site de trocas.',
    tecnologias: ['Java', 'UML', 'Crição de Arquivos MD', 'Feito em Grupo'],
    links: [{ nome: 'Código', url: 'https://github.com/JoaoMalvarez/Projeto-de-SentinelTrade' }],
    cor: '#9C66B6',
    imagem: '/biblioteca/Livro7.png',
    float: true,
    x: 70,
    y: 55,
    w: 12,
  },
  {
    id: 'projeto-8',
    nome: 'Projetos de Projeto e Análise de Algoritmo I',
    descricao: 'Esses projetos, foram feitos como trabalhos de Projeto e Análise de Algoritmos I.',
    tecnologias: ['C', 'HeapSort', 'Leitura de Arquivos', 'Indentificador de Idiomas', 'Leitura de Tabuleiro de Xadrez'],
    links: [{ nome: 'Código', url: 'https://github.com/JoaoMalvarez/Projeto_Proj_Analise_Algoritmo' }],
    cor: '#9C66B6',
    imagem: '/biblioteca/Livro8.png',
    float: true,
    x: 32,
    y: 55,
    w: 12,
  },
]