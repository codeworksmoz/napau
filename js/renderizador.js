// ============================================
// RENDERIZADOR - HEADER E FOOTER
// ============================================

const render = {
  header: function() {
    const header = document.querySelector('header');
    if (!header) return;

    const logoHTML = `<div class="logo">
                        <a href="index.html">
                          <h1>Napau design & arte</h1>
                        </a>
                      </div>`;

    const navHTML = `<nav class="main-nav">
                      <ul>
                        <li><a href="index.html">Início</a></li>
                        <li><a href="portfolio.html">Portfólio</a></li>
                        <li><a href="cursos.html">Cursos</a></li>
                        <li><a href="#sobre">Sobre</a></li>
                        <li><a href="#contacto">Contacto</a></li>
                      </ul>
                    </nav>`;

    const headerIconsHTML = `<div class="header-icons">
                               <div class="carrinha">
                                 <a href="#carrinha" id="carrinha-link"><i class="fas fa-shopping-cart"></i> <span id="carrinha-contagem">0</span></a>
                               </div>
                               <div class="mobile-menu-icon">
                                 <i class="fas fa-bars"></i>
                               </div>
                             </div>`;

    header.innerHTML = `${logoHTML}${navHTML}${headerIconsHTML}`;
    
    // Re-adicionar evento do carrinho após renderizar
    const carrinhaLink = document.getElementById('carrinha-link');
    if (carrinhaLink && typeof carrinha !== 'undefined') {
      carrinhaLink.addEventListener('click', (e) => {
        e.preventDefault();
        const modal = document.getElementById('carrinha-modal');
        if (modal) {
          modal.style.display = 'block';
          if (typeof carrinha.renderizarCarrinha === 'function') {
            carrinha.renderizarCarrinha();
          }
        }
      });
    }
  },

  footer: function() {
    const footer = document.querySelector('footer');
    if (!footer) return;

    const ano = new Date().getFullYear();

    let redesSociaisHTML = '<div class="redes-sociais">';
    if (CONFIG && CONFIG.redes) {
      if (CONFIG.redes.instagram && CONFIG.redes.instagram.ativo) {
        redesSociaisHTML += `<a href="${CONFIG.redes.instagram.url}" target="_blank"><i class="fab fa-instagram"></i></a>`;
      }
      if (CONFIG.redes.facebook && CONFIG.redes.facebook.ativo) {
        redesSociaisHTML += `<a href="${CONFIG.redes.facebook.url}" target="_blank"><i class="fab fa-facebook-f"></i></a>`;
      }
      if (CONFIG.redes.tiktok && CONFIG.redes.tiktok.ativo) {
        redesSociaisHTML += `<a href="${CONFIG.redes.tiktok.url}" target="_blank"><i class="fab fa-tiktok"></i></a>`;
      }
    }
    redesSociaisHTML += '</div>';

    footer.innerHTML = `<div class="footer-content">
                          ${redesSociaisHTML}
                          <p>&copy; ${ano} Napau design & arte. Todos os direitos reservados.</p>
                          <p>Desenvolvido com <i class="fas fa-heart"></i> por <a href="#">CodWorks Moz</a></p>
                        </div>`;
  }
};