document.addEventListener('DOMContentLoaded', function() {
  // Renderiza o cabeçalho e o rodapé em todas as páginas
  render.header();
  render.footer();
  
  // Inicializa a carrinha APÓS renderizar o header
  carrinha.init();
});
