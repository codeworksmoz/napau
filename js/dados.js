// ============================================
// DADOS ESTÁTICOS DO SITE
// ============================================

// CATEGORIAS como ARRAY (para o slider funcionar)
const CATEGORIAS = [
  { id: "todos", nome: "Todos", icone: "fa-grid-2" },
  { id: "anoNovo", nome: "Ano Novo", icone: "fa-calendar-alt" },
  { id: "aniversario", nome: "Aniversário", icone: "fa-birthday-cake" },
  { id: "baptismo", nome: "Baptismo", icone: "fa-dove" },
  { id: "casamento", nome: "Casamento", icone: "fa-heart" },
  { id: "coringa", nome: "Coringa", icone: "fa-star" },
  { id: "diadascriancas", nome: "Dia das Crianças", icone: "fa-child" },
  { id: "eidmubarak", nome: "Eid Mubarak", icone: "fa-moon" },
  { id: "graduacao", nome: "Graduação", icone: "fa-graduation-cap" },
  { id: "natal", nome: "Natal", icone: "fa-tree" },
  { id: "pascoa", nome: "Páscoa", icone: "fa-egg" }
];

// Objeto CATEGORIAS_OBJ para compatibilidade com código antigo
const CATEGORIAS_OBJ = {
  todos: 'Todos',
  anoNovo: 'Ano Novo',
  aniversario: 'Aniversário',
  baptismo: 'Baptismo',
  casamento: 'Casamento',
  coringa: 'Coringa',
  diadascriancas: 'Dia das Crianças',
  eidmubarak: 'Eid Mubarak',
  graduacao: 'Graduação',
  natal: 'Natal',
  pascoa: 'Páscoa'
};

// Função para obter nome da categoria
function getCategoriaNome(categoriaId) {
  const cat = CATEGORIAS.find(c => c.id === categoriaId);
  return cat ? cat.nome : categoriaId;
}

// Função para obter ícone da categoria
function getCategoriaIcone(categoriaId) {
  const cat = CATEGORIAS.find(c => c.id === categoriaId);
  return cat ? cat.icone : "fa-tag";
}

// Função para obter link do WhatsApp
function getWhatsAppLink(mensagemPersonalizada = null) {
  const texto = mensagemPersonalizada || CONFIG.whatsapp.texto;
  return `https://wa.me/${CONFIG.whatsapp.numero}?text=${encodeURIComponent(texto)}`;
}

const portfolioCompleto = [
  // Ano Novo Items
  {
    id: 1,
    nome: "Feliz Ano Novo 2026",
    preco: 60,
    categoria: 'anoNovo',
    imagem: 'assets/imagem/anonovo/IMG-20260513-WA0064.jpg',
    descricao: 'Topo de bolo personalizado para celebrar o Ano Novo com elegância',
    prazo: '3-5 dias',
    frase: 'Bem-vindo ao novo ano!',
    destaque: true
  },
  
  {
    id: 19,
    nome: "Feliz Aniversário",
    preco: 60,
    categoria: 'aniversario',
    imagem: 'assets/imagem/aniversario/feliz-aniversario.jpg',
    descricao: 'Placeholder description',
    prazo: '3-5 dias',
    frase: 'Placeholder frase',
    destaque: false
  },
  {
    id: 20,
    nome: "Bíblia",
    preco: 180,
    categoria: 'baptismo',
    imagem: 'assets/imagem/baptismo/bp-livro-aberto.jpg',
    descricao: 'Placeholder description',
    prazo: '4-6 dias',
    frase: 'Placeholder frase'
  },
  {
    id: 21,
    nome: "Pomba com Cruz",
    preco: 100,
    categoria: 'baptismo',
    imagem: 'assets/imagem/baptismo/bp-pomba-cruz.jpg',
    descricao: 'Placeholder description',
    prazo: '4-6 dias',
    frase: 'Placeholder frase'
  },
  {
    id: 22,
    nome: "Bíblia-Pomba",
    preco: 100,
    categoria: 'baptismo',
    imagem: 'assets/imagem/baptismo/bp-pomba-livro.jpg',
    descricao: 'Placeholder description',
    prazo: '4-6 dias',
    frase: 'Placeholder frase'
  },
  {
    id: 23,
    nome: "Mr & Mrs ",
    preco: 60,
    categoria: 'casamento',
    imagem: 'assets/imagem/casamento/mr-mrs-coracao.jpg',
    descricao: 'Placeholder description',
    prazo: '7-10 dias',
    frase: 'Placeholder frase',
    destaque: false
  },
  {
    id: 24,
    nome: "Mr & Mrs",
    preco: 60,
    categoria: 'casamento',
    imagem: 'assets/imagem/casamento/mr-mrs1.jpg',
    descricao: 'Placeholder description',
    prazo: '7-10 dias',
    frase: 'Placeholder frase',
    destaque: false
  },
  {
    id: 25,
    nome: "Noivos",
    preco: 120,
    categoria: 'casamento',
    imagem: 'assets/imagem/casamento/noivos dourado.jpg',
    descricao: 'Placeholder description',
    prazo: '7-10 dias',
    frase: 'Placeholder frase',
    destaque: false
  },
  {
    id: 26,
    nome: "Noivos",
    preco: 500,
    categoria: 'casamento',
    imagem: 'assets/imagem/casamento/noivos.jpg',
    descricao: 'Placeholder description',
    prazo: '7-10 dias',
    frase: 'Placeholder frase',
    destaque: false
  },
  {
    id: 27,
    nome: "Eid Mubarak",
    preco: 150,
    categoria: 'eidmubarak',
    imagem: 'assets/imagem/eidmubarak/lt-eidmubarak-mesquita.jpg',
    descricao: 'Placeholder description',
    prazo: '4-6 dias',
    frase: 'Eid Mubarak!',
    destaque: false
  },
  {
    id: 28,
    nome: "Eid Mubarak",
    preco: 150,
    categoria: 'eidmubarak',
    imagem: 'assets/imagem/eidmubarak/lt-eidmubarak-mesquita1.jpg',
    descricao: 'Placeholder description',
    prazo: '4-6 dias',
    frase: 'Eid Mubarak!',
    destaque: false
  },
  {
    id: 29,
    nome: "Eid Mubarak",
    preco: 100,
    categoria: 'eidmubarak',
    imagem: 'assets/imagem/eidmubarak/lt-eidmubarak.jpg',
    descricao: 'Placeholder description',
    prazo: '4-6 dias',
    frase: 'Eid Mubarak!',
    destaque: false
  },
  {
    id: 30,
    nome: "Eid Mubarak ",
    preco: 60,
    categoria: 'eidmubarak',
    imagem: 'assets/imagem/eidmubarak/lt-eidmubarak1.jpg',
    descricao: 'Placeholder description',
    prazo: '4-6 dias',
    frase: 'Eid Mubarak!',
    destaque: false
  },
  {
    id: 31,
    nome: "Eid Mubarak ",
    preco: 100,
    categoria: 'eidmubarak',
    imagem: 'assets/imagem/eidmubarak/lt-eidmubarak2.jpg',
    descricao: 'Placeholder description',
    prazo: '4-6 dias',
    frase: 'Eid Mubarak!',
    destaque: false
  },
  {
    id: 32,
    nome: "Dia das crianças",
    preco: 180,
    categoria: 'diadascriancas',
    imagem: 'assets/imagem/diadascriancas/crianca.jpg',
    descricao: 'Placeholder description',
    prazo: '3-5 dias',
    frase: 'Placeholder frase'
  },
  {
    id: 33,
    nome: "feliz dia das crianças ",
    preco: 100,
    categoria: 'diadascriancas',
    imagem: 'assets/imagem/diadascriancas/crianca1.jpg',
    descricao: 'Placeholder description',
    prazo: '3-5 dias',
    frase: 'Placeholder frase'
  },
  {
    id: 34,
    nome: "Dia das crianças",
    preco: 180,
    categoria: 'diadascriancas',
    imagem: 'assets/imagem/diadascriancas/crianca3.jpg',
    descricao: 'Placeholder description',
    prazo: '3-5 dias',
    frase: 'Placeholder frase'
  },
  {
    id: 35,
    nome: "Dia das crianças",
    preco: 0,
    categoria: 'diadascriancas',
    imagem: 'assets/imagem/diadascriancas/crianca4.jpg',
    descricao: 'Placeholder description',
    prazo: '3-5 dias',
    frase: 'Placeholder frase'
  },
  {
    id: 36,
    nome: "Dia das crianças",
    preco: 0,
    categoria: 'diadascriancas',
    imagem: 'assets/imagem/diadascriancas/crianca5.jpg',
    descricao: 'Placeholder description',
    prazo: '3-5 dias',
    frase: 'Placeholder frase'
  },
  {
    id: 37,
    nome: "Dia das crianças",
    preco: 200,
    categoria: 'diadascriancas',
    imagem: 'assets/imagem/diadascriancas/crianca6.jpg',
    descricao: 'Placeholder description',
    prazo: '3-5 dias',
    frase: 'Placeholder frase'
  },
  {
    id: 38,
    nome: "Dia das crianças",
    preco: 200,
    categoria: 'diadascriancas',
    imagem: 'assets/imagem/diadascriancas/crianca7.jpg',
    descricao: 'Placeholder description',
    prazo: '3-5 dias',
    frase: 'Placeholder frase'
  },
  {
    id: 39,
    nome: "Graduação ",
    preco: 220,
    categoria: 'graduacao',
    imagem: 'assets/imagem/graduacao/gr-1.jpg',
    descricao: 'Placeholder description',
    prazo: '5-7 dias',
    frase: 'Placeholder frase'
  },
  {
    id: 40,
    nome: "Graduação ",
    preco: 180,
    categoria: 'graduacao',
    imagem: 'assets/imagem/graduacao/gra-ch-vert.jpg',
    descricao: 'Placeholder description',
    prazo: '5-7 dias',
    frase: 'Placeholder frase'
  },
  {
    id: 41,
    nome: "Congrates GRADE",
    preco: 60,
    categoria: 'graduacao',
    imagem: 'assets/imagem/graduacao/gra-letra.jpg',
    descricao: 'Placeholder description',
    prazo: '5-7 dias',
    frase: 'Placeholder frase'
  },
  //Natal
  {
    id: 43,
    nome: "Natal ",
    preco: 60,
    categoria: 'natal',
    imagem: 'assets/imagem/natal/IMG-20260513-WA0059.jpg',
    descricao: 'Placeholder description',
    prazo: '4-6 dias',
    frase: 'Feliz Natal!'
  },
  {
    id: 48,
    nome: "Feliz Natal ",
    preco: 60,
    categoria: 'natal',
    imagem: 'assets/imagem/natal/IMG-20260513-WA0067.jpg',
    descricao: 'Placeholder description',
    prazo: '4-6 dias',
    frase: 'Feliz Natal!'
  },
  {
    id: 50,
    nome: "Natal ",
    preco: 150,
    categoria: 'natal',
    imagem: 'assets/imagem/natal/IMG-20260513-WA0070.jpg',
    descricao: 'Placeholder description',
    prazo: '4-6 dias',
    frase: 'Feliz Natal!'
  },
  
  {
    id: 52,
    nome: "Natal 10",
    preco: 400,
    categoria: 'natal',
    imagem: 'assets/imagem/natal/IMG-20260513-WA0075.jpg',
    descricao: 'Placeholder description',
    prazo: '4-6 dias',
    frase: 'Feliz Natal!'
  },
  
  {
    id: 54,
    nome: "Natal",
    preco: 150,
    categoria: 'natal',
    imagem: 'assets/imagem/natal/IMG-20260513-WA0077.jpg',
    descricao: 'Placeholder description',
    prazo: '4-6 dias',
    frase: 'Feliz Natal!'
  },
  
  {
    id: 56,
    nome: "Natal ",
    preco: 150,
    categoria: 'natal',
    imagem: 'assets/imagem/natal/IMG-20260513-WA0080.jpg',
    descricao: 'Placeholder description',
    prazo: '4-6 dias',
    frase: 'Feliz Natal!'
  },

  //pascoa
  {
    id: 57,
    nome: "Páscoa ",
    preco: 160,
    categoria: 'pascoa',
    imagem: 'assets/imagem/pascoa/IMG-20260513-WA0008.jpg',
    descricao: 'Placeholder description',
    prazo: '3-5 dias',
    frase: 'Feliz Páscoa!'
  },
  //coringa
  {
    id: 58,
    nome: "Coringa Especial",
    preco: 100,
    categoria: 'coringa',
    imagem: 'assets/imagem/coringa/coringa1.jpg',
    descricao: 'Modelo coringa personalizado',
    prazo: '3-5 dias',
    frase: 'Surpresa!',
    destaque: false
  }
];
