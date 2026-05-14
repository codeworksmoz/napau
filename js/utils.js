// ============================================
// FUNÇÕES AUXILIARES
// ============================================

function mostrarToast(mensagem, tipo = 'info', duracao = 3000) {
  const toast = document.createElement('div');
  const cores = {
    info: '#2196F3',
    sucesso: '#4CAF50',
    erro: '#f44336',
    alerta: '#FF9800'
  };
  
  toast.style.cssText = `
    position: fixed;
    bottom: 2rem;
    left: 1rem;
    right: 1rem;
    max-width: 350px;
    background: ${cores[tipo] || cores.info};
    color: white;
    padding: 1rem;
    border-radius: 0.5rem;
    z-index: 2000;
    animation: slideUp 0.3s ease;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    font-size: 0.85rem;
  `;
  toast.innerHTML = mensagem;
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    if (toast && toast.parentNode) toast.remove();
  }, duracao);
}

function formatarPreco(preco) {
  return `${preco} MZN`;
}