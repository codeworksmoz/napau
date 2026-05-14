document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const menuIcon = document.querySelector('.mobile-menu-icon');
  const nav = document.querySelector('.main-nav');
  if (menuIcon && nav) {
    menuIcon.addEventListener('click', () => {
      nav.classList.toggle('active');
      const icon = menuIcon.querySelector('i');
      if (nav.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
  }

  // Accordion FAQ
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });

  // Render Featured Products on Homepage
  const destaquesContainer = document.querySelector('.destaques-container');
  if (destaquesContainer) {
    const featuredItems = portfolioCompleto.filter(item => item.destaque === true);
    let itemsHTML = '';
    featuredItems.forEach(item => {
      itemsHTML += `<div class="portfolio-item" data-id="${item.id}">
                      <img src="${item.imagem}" alt="${item.nome}">
                      <h3>${item.nome}</h3>
                      <p>Preço: ${item.preco} MZN</p>
                      <button class="add-to-cart-btn">Adicionar à Carrinha</button>
                    </div>`;
    });
    destaquesContainer.innerHTML = itemsHTML;

    // Add cart listeners to the new buttons
    const cartButtons = destaquesContainer.querySelectorAll('.add-to-cart-btn');
    cartButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const portfolioItem = e.target.closest('.portfolio-item');
        const itemId = parseInt(portfolioItem.dataset.id);
        carrinha.adicionarItem(itemId);
      });
    });
  }

  // Cart Modal
  const cartModal = document.getElementById('carrinha-modal');
  const cartIcon = document.querySelector('.carrinha a');
  const closeModalBtn = document.querySelector('.close-modal-btn');

  if (cartModal && cartIcon && closeModalBtn) {
    cartIcon.addEventListener('click', (e) => {
      e.preventDefault();
      cartModal.style.display = 'block';
      carrinha.renderizarCarrinha(); // Ensure cart is rendered when opened
    });

    closeModalBtn.addEventListener('click', () => {
      cartModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
      if (e.target === cartModal) {
        cartModal.style.display = 'none';
      }
    });
  }

});
