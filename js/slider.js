// ============================================
// SLIDER DE CATEGORIAS E REDES SOCIAIS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  
  // ===== 1. SLIDER DE CATEGORIAS =====
  const sliderContainer = document.querySelector('#category-slider .slider-container');
  const slider = document.querySelector('#category-slider .slider');
  
  if (!sliderContainer || !slider) {
    console.log('Slider não encontrado na página');
  } else {
    inicializarSlider();
  }

  renderHomeCategoryNav();
  renderHomeCategoryGrids();
  
  function inicializarSlider() {
    const prevButton = document.querySelector('#category-slider .prev');
    const nextButton = document.querySelector('#category-slider .next');
    
    // Limpar slider existente
    slider.innerHTML = '';
    
    // Verificar se portfolioCompleto existe
    if (typeof portfolioCompleto === 'undefined') {
      console.error('portfolioCompleto não definido. Verifique se dados.js foi carregado.');
      return;
    }
    
    // Filtrar produtos com imagens válidas
    const produtosComImagem = portfolioCompleto.filter(produto => produto.imagem && produto.imagem.trim() !== '');
    
    if (produtosComImagem.length === 0) {
      console.warn('Nenhum produto com imagem encontrado para o slider');
      return;
    }
    
    // Criar slides para cada produto
    const slides = [];
    
    produtosComImagem.forEach(produto => {
      const categoria = CATEGORIAS.find(cat => cat.id === produto.categoria);
      const categoriaNome = categoria ? categoria.nome : produto.categoria;
      
      const slide = document.createElement('div');
      slide.classList.add('slide');
      slide.dataset.produtoId = produto.id;
      
      slide.innerHTML = `
        <div class="slide-image" style="background-image: url(${produto.imagem})">
          <div class="slide-overlay">
            <div class="slide-category">${categoriaNome}</div>
            <div class="slide-title">${produto.nome}</div>
            <div class="slide-price">${produto.preco} MZN</div>
          </div>
        </div>
      `;
      
      slider.appendChild(slide);
      slides.push(slide);
    });
    
    // Configurar navegação dos slides principais
    let currentIndex = 0;
    let slideWidth = slides.length > 0 ? slides[0].offsetWidth : 0;
    let slideMargin = 0;
    
    function calcularDimensoes() {
      if (slides.length > 0) {
        slideWidth = slides[0].offsetWidth;
        const slideStyle = window.getComputedStyle(slides[0]);
        slideMargin = parseFloat(slideStyle.marginLeft) + parseFloat(slideStyle.marginRight);
      }
    }
    
    function updateSlider() {
      calcularDimensoes();
      const totalSlideWidth = slideWidth + slideMargin;
      const offset = (sliderContainer.offsetWidth - slideWidth) / 2;
      slider.style.transform = `translateX(${-currentIndex * totalSlideWidth + offset}px)`;
      updateIndicators();
    }
    
    function advanceSlider() {
      currentIndex = (currentIndex + 1) % slides.length;
      updateSlider();
    }
    
    function prevSlider() {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateSlider();
    }
    
    // Criar indicadores
    const indicatorsContainer = document.querySelector('#category-slider .slider-indicators');
    if (indicatorsContainer) {
      indicatorsContainer.innerHTML = '';
      slides.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.classList.add('slider-indicator');
        if (index === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => {
          clearInterval(autoPlayInterval);
          currentIndex = index;
          updateSlider();
          autoPlayInterval = setInterval(advanceSlider, 4000);
        });
        indicatorsContainer.appendChild(indicator);
      });
    }
    
    function updateIndicators() {
      const indicators = document.querySelectorAll('#category-slider .slider-indicator');
      indicators.forEach((ind, idx) => {
        if (idx === currentIndex) {
          ind.classList.add('active');
        } else {
          ind.classList.remove('active');
        }
      });
    }
    
    // Eventos dos botões
    if (prevButton) {
      prevButton.addEventListener('click', () => {
        clearInterval(autoPlayInterval);
        prevSlider();
        autoPlayInterval = setInterval(advanceSlider, 4000);
      });
    }
    
    if (nextButton) {
      nextButton.addEventListener('click', () => {
        clearInterval(autoPlayInterval);
        advanceSlider();
        autoPlayInterval = setInterval(advanceSlider, 4000);
      });
    }
    
    // Auto-play
    let autoPlayInterval = setInterval(advanceSlider, 4000);
    
    // Pausar auto-play ao passar o mouse
    sliderContainer.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
    sliderContainer.addEventListener('mouseleave', () => {
      autoPlayInterval = setInterval(advanceSlider, 4000);
    });
    
    // Ajustar ao redimensionar
    window.addEventListener('resize', () => {
      updateSlider();
    });
    
    // Inicializar
    setTimeout(() => {
      updateSlider();
    }, 100);
    
    // Evento de clique nos botões "Ver todos"
    document.querySelectorAll('.ver-mais-categoria').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const slide = btn.closest('.slide');
        if (slide && slide.dataset.categoria) {
          window.location.href = `portfolio.html?categoria=${slide.dataset.categoria}`;
        }
      });
    });
  }
  
  // ===== 2. MINI-SLIDERS DAS CATEGORIAS =====
  function configurarMiniSliders() {
    const categorySliders = document.querySelectorAll('.category-photos-slider');
    
    categorySliders.forEach(sliderElement => {
      const container = sliderElement.querySelector('.category-photos-container');
      const photos = sliderElement.querySelectorAll('.category-photo');
      const prevBtn = sliderElement.querySelector('.photo-prev');
      const nextBtn = sliderElement.querySelector('.photo-next');
      
      if (!container || photos.length <= 1) return;
      
      let currentPhotoIndex = 0;
      let photoAutoPlay = null;
      
      function updatePhotoSlider() {
        if (container) {
          container.style.transform = `translateX(-${currentPhotoIndex * 100}%)`;
        }
      }
      
      function startPhotoAutoPlay() {
        if (photoAutoPlay) clearInterval(photoAutoPlay);
        photoAutoPlay = setInterval(() => {
          currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
          updatePhotoSlider();
        }, 3000);
      }
      
      function stopPhotoAutoPlay() {
        if (photoAutoPlay) {
          clearInterval(photoAutoPlay);
          photoAutoPlay = null;
        }
      }
      
      if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          stopPhotoAutoPlay();
          currentPhotoIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
          updatePhotoSlider();
          startPhotoAutoPlay();
        });
      }
      
      if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          stopPhotoAutoPlay();
          currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
          updatePhotoSlider();
          startPhotoAutoPlay();
        });
      }
      
      // Auto-play para as fotos da categoria
      startPhotoAutoPlay();
      
      // Pausar auto-play quando mouse entra na categoria
      sliderElement.addEventListener('mouseenter', stopPhotoAutoPlay);
      sliderElement.addEventListener('mouseleave', startPhotoAutoPlay);
      
      // Inicializar posição
      updatePhotoSlider();
    });
  }
  
  // ===== 3. REDES SOCIAIS =====
  const socialLinksContainer = document.querySelector('#social-media .social-links');
  
  if (socialLinksContainer) {
    // Verificar se CONFIG e CONFIG.redes existem
    if (typeof CONFIG !== 'undefined' && CONFIG.redes) {
      const redesAtivas = [
        { id: 'instagram', nome: 'Instagram', icone: 'instagram', cor: '#E4405F', frase: 'Siga-nos no Instagram' },
        { id: 'facebook', nome: 'Facebook', icone: 'facebook-f', cor: '#1877F2', frase: 'Curta nossa página' },
        { id: 'tiktok', nome: 'TikTok', icone: 'tiktok', cor: '#000000', frase: 'Siga no TikTok' },
        { id: 'whatsapp', nome: 'WhatsApp', icone: 'whatsapp', cor: '#25D366', frase: 'Fale connosco' }
      ];
      
      socialLinksContainer.innerHTML = '';
      
      redesAtivas.forEach(rede => {
        if (CONFIG.redes[rede.id] && CONFIG.redes[rede.id].ativo) {
          const link = document.createElement('a');
          link.href = CONFIG.redes[rede.id].url || getWhatsAppLink();
          link.target = '_blank';
          link.classList.add('social-link');
          link.style.backgroundColor = rede.cor;
          link.innerHTML = `
            <i class="fab fa-${rede.icone}"></i>
            <p>${rede.frase}</p>
          `;
          socialLinksContainer.appendChild(link);
        }
      });
    } else {
      console.warn('CONFIG.redes não disponível');
    }
  }
  
  function renderHomeCategoryNav() {
    const navContainer = document.getElementById('category-nav');
    if (!navContainer || typeof CATEGORIAS === 'undefined') return;

    const buttonsHTML = CATEGORIAS
      .filter(cat => cat.id !== 'todos')
      .slice(0, 8)
      .map(cat => `<button class="category-nav-btn" data-category="${cat.id}">${cat.nome}</button>`)
      .join('');

    navContainer.innerHTML = buttonsHTML;
    navContainer.querySelectorAll('.category-nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const categoryId = btn.dataset.category;
        const section = document.getElementById(`category-${categoryId}`);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  function renderHomeCategoryGrids() {
    const container = document.getElementById('product-category-sections');
    if (!container || typeof portfolioCompleto === 'undefined' || typeof CATEGORIAS === 'undefined') return;

    const categories = CATEGORIAS
      .filter(cat => cat.id !== 'todos')
      .map(cat => {
        const products = portfolioCompleto.filter(item => item.categoria === cat.id && item.imagem && item.imagem.trim() !== '');
        return { ...cat, products };
      })
      .filter(cat => cat.products.length > 0)
      .sort((a, b) => b.products.length - a.products.length)
      .slice(0, 6);

    const sectionsHTML = categories.map(cat => {
      const phrase = typeof CATEGORY_DATA !== 'undefined' && CATEGORY_DATA[cat.id] ? CATEGORY_DATA[cat.id].phrase : '';
      const productsHTML = cat.products.slice(0, 4).map(item => `
        <div class="portfolio-item home-product-card" data-id="${item.id}">
          <img src="${item.imagem}" alt="${item.nome}">
          <h3>${item.nome}</h3>
          <p>${item.preco} MZN</p>
          <button class="add-to-cart-btn">Adicionar</button>
        </div>
      `).join('');

      return `
        <section id="category-${cat.id}" class="category-section">
          <div class="category-header">
            <div>
              <h4>${cat.nome}</h4>
              ${phrase ? `<p>${phrase}</p>` : ''}
            </div>
            <a href="portfolio.html?categoria=${cat.id}" class="category-view-all">Ver todos</a>
          </div>
          <div class="category-grid">
            ${productsHTML}
          </div>
        </section>
      `;
    }).join('');

    container.innerHTML = sectionsHTML;

    container.querySelectorAll('.add-to-cart-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const productCard = e.target.closest('.portfolio-item');
        if (!productCard) return;
        const itemId = parseInt(productCard.dataset.id, 10);
        if (typeof carrinha !== 'undefined' && typeof carrinha.adicionarItem === 'function') {
          carrinha.adicionarItem(itemId);
        }
      });
    });
  }

  // ===== 4. TOAST DE BOAS-VINDAS NO PORTFÓLIO =====
  if (window.location.pathname.includes('portfolio.html') || window.location.pathname.includes('/portfolio')) {
    mostrarToastBoasVindas();
  }
  
  function mostrarToastBoasVindas() {
    // Verificar se já viu nesta sessão
    if (sessionStorage.getItem('toast_portfolio_visto')) return;
    
    const toast = document.createElement('div');
    toast.style.cssText = `
      position: fixed;
      bottom: 2rem;
      left: 1rem;
      right: 1rem;
      max-width: 350px;
      background: #333;
      color: white;
      padding: 1rem;
      border-radius: 1rem;
      z-index: 2000;
      animation: slideUp 0.3s ease;
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
      font-size: 0.85rem;
    `;
    toast.innerHTML = `
      <i class="fas fa-info-circle" style="margin-right: 0.5rem; color: #D4AF37;"></i>
      💡 Dica: Clique em qualquer foto para ver preços, descrição e adicionar à carrinha!
      <button id="fecharToast" style="background: none; border: none; color: #D4AF37; float: right; cursor: pointer; font-size: 1.2rem;">×</button>
    `;
    
    // Adicionar animação se não existir
    if (!document.querySelector('#toast-animation')) {
      const style = document.createElement('style');
      style.id = 'toast-animation';
      style.textContent = `
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `;
      document.head.appendChild(style);
    }
    
    document.body.appendChild(toast);
    sessionStorage.setItem('toast_portfolio_visto', 'true');
    
    const fecharBtn = document.getElementById('fecharToast');
    if (fecharBtn) {
      fecharBtn.addEventListener('click', () => toast.remove());
    }
    
    setTimeout(() => {
      if (toast && toast.parentNode) toast.remove();
    }, 5000);
  }
  
  console.log('✅ Site inicializado com sucesso');
});