document.addEventListener('DOMContentLoaded', function() {
  const isPortfolioPage = document.querySelector('h1') && document.querySelector('h1').textContent === 'Nosso Portfólio';

  if (isPortfolioPage) {
    const main = document.querySelector('main');
    const portfolioContainer = document.createElement('div');
    portfolioContainer.id = 'portfolio-container';
    
    const filterContainer = document.createElement('div');
    filterContainer.id = 'filter-container';

    main.appendChild(filterContainer);
    main.appendChild(portfolioContainer);

    const portfolio = {
      activeCategory: 'todos',

      renderFilters: function() {
        let filtersHTML = '';
        CATEGORIAS.forEach(categoria => {
          filtersHTML += `<button class="filter-btn ${this.activeCategory === categoria.id ? 'active' : ''}" data-category="${categoria.id}">${categoria.nome}</button>`;
        });
        filterContainer.innerHTML = filtersHTML;
        this.addFilterListeners();
      },

      renderItems: function() {
        let itemsHTML = '';
        const filteredItems = this.activeCategory === 'todos' 
          ? portfolioCompleto 
          : portfolioCompleto.filter(item => item.categoria === this.activeCategory);

        filteredItems.forEach(item => {
          itemsHTML += `<div class="portfolio-item" data-id="${item.id}">
                          <div class="portfolio-image-container">
                            <img src="${item.imagem}" alt="${item.nome}" class="portfolio-image">
                            <div class="image-overlay">
                              <button class="view-image-btn" data-image="${item.imagem}" data-title="${item.nome}" data-price="${item.preco}" data-id="${item.id}">
                                <i class="fas fa-expand"></i>
                              </button>
                            </div>
                          </div>
                          <h3>${item.nome}</h3>
                          <p>Preço: ${item.preco} MZN</p>
                          <button class="add-to-cart-btn">Adicionar à Carrinha</button>
                        </div>`;
        });

        portfolioContainer.innerHTML = itemsHTML;
        this.addCartListeners();
      },

      addFilterListeners: function() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
          btn.addEventListener('click', (e) => {
            this.activeCategory = e.target.dataset.category;
            this.renderFilters();
            this.renderItems();
            // Close modal if open when filter changes
            if (document.getElementById('image-modal') && document.getElementById('image-modal').classList.contains('active')) {
              document.getElementById('image-modal').classList.remove('active');
              document.body.style.overflow = 'auto';
            }
          });
        });
      },

      addCartListeners: function() {
        const cartButtons = document.querySelectorAll('.add-to-cart-btn');
        cartButtons.forEach(btn => {
          btn.addEventListener('click', (e) => {
            const portfolioItem = e.target.closest('.portfolio-item');
            const itemId = parseInt(portfolioItem.dataset.id);
            carrinha.adicionarItem(itemId);
          });
        });
      },

      init: function() {
        const urlParams = new URLSearchParams(window.location.search);
        const categoria = urlParams.get('categoria');
        if (categoria && CATEGORIAS.find(c => c.id === categoria)) {
          this.activeCategory = categoria;
        }

        this.renderFilters();
        this.renderItems();
      }
    };

    portfolio.init();
  }
});
