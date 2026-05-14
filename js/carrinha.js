// ============================================
// CARRINHA DE COMPRAS
// ============================================

const CarrinhaModule = {
  itens: [],
  EXPIRATION_TIME: 15 * 24 * 60 * 60 * 1000, // 15 dias

  // ===== ADICIONAR ITEM =====
  adicionarItem: function(id, quantidade = 1) {
    if (typeof portfolioCompleto === 'undefined') {
      console.error('portfolioCompleto não está definido');
      this.mostrarToast('Erro ao adicionar item. Tente novamente.', 'erro');
      return;
    }
    
    const itemPortfolio = portfolioCompleto.find(function(p) {
      return p.id === id;
    });
    
    if (!itemPortfolio) {
      console.error('Item com id ' + id + ' não encontrado');
      return;
    }

    var itemExistente = this.itens.find(function(item) {
      return item.id === id;
    });

    if (itemExistente) {
      itemExistente.quantidade += quantidade;
    } else {
      this.itens.push({
        id: itemPortfolio.id,
        nome: itemPortfolio.nome,
        preco: itemPortfolio.preco,
        precoTexto: itemPortfolio.precoTexto || itemPortfolio.preco + " MZN",
        imagem: itemPortfolio.imagem,
        quantidade: quantidade
      });
    }

    this.salvarCarrinha();
    this.atualizarContagem();
    this.renderizarCarrinha();
    this.mostrarToast(itemPortfolio.nome + ' adicionado à carrinha!', 'sucesso');
  },

  // ===== REMOVER ITEM =====
  removerItem: function(id) {
    var itemRemovido = null;
    var novoItens = [];
    
    for (var i = 0; i < this.itens.length; i++) {
      if (this.itens[i].id === id) {
        itemRemovido = this.itens[i];
      } else {
        novoItens.push(this.itens[i]);
      }
    }
    
    this.itens = novoItens;
    this.salvarCarrinha();
    this.atualizarContagem();
    this.renderizarCarrinha();
    
    if (itemRemovido) {
      this.mostrarToast(itemRemovido.nome + ' removido da carrinha', 'info');
    }
  },

  // ===== ATUALIZAR QUANTIDADE =====
  atualizarQuantidade: function(id, quantidade) {
    for (var i = 0; i < this.itens.length; i++) {
      if (this.itens[i].id === id) {
        if (quantidade > 0) {
          this.itens[i].quantidade = quantidade;
        } else {
          this.removerItem(id);
          return;
        }
        break;
      }
    }
    this.salvarCarrinha();
    this.atualizarContagem();
    this.renderizarCarrinha();
  },

  // ===== ATUALIZAR CONTAGEM NO ÍCONE =====
  atualizarContagem: function() {
    var contagemEl = document.getElementById('carrinha-contagem');
    if (contagemEl) {
      var totalItens = 0;
      for (var i = 0; i < this.itens.length; i++) {
        totalItens += this.itens[i].quantidade;
      }
      contagemEl.textContent = totalItens;
      
      // Efeito visual de animação
      contagemEl.style.transform = 'scale(1.2)';
      setTimeout(function() {
        if (contagemEl) contagemEl.style.transform = 'scale(1)';
      }, 200);
    }
  },

  // ===== SALVAR NO LOCALSTORAGE =====
  salvarCarrinha: function() {
    var cartData = {
      itens: this.itens,
      timestamp: new Date().getTime()
    };
    localStorage.setItem('napau_carrinha', JSON.stringify(cartData));
  },

  // ===== CARREGAR DO LOCALSTORAGE =====
  carregarCarrinha: function() {
    var cartData = JSON.parse(localStorage.getItem('napau_carrinha'));
    if (cartData) {
      var now = new Date().getTime();
      if (now - cartData.timestamp > this.EXPIRATION_TIME) {
        localStorage.removeItem('napau_carrinha');
        this.itens = [];
      } else {
        this.itens = cartData.itens;
      }
    }
    this.atualizarContagem();
  },

  // ===== CALCULAR TOTAL =====
  calcularTotal: function() {
    var total = 0;
    for (var i = 0; i < this.itens.length; i++) {
      total += this.itens[i].preco * this.itens[i].quantidade;
    }
    return total;
  },

  // ===== FORMATAR PREÇO =====
  formatarPreco: function(valor) {
    if (valor % 1 === 0) {
      return Math.floor(valor) + ' MZN';
    }
    return valor.toFixed(2) + ' MZN';
  },

  // ===== GERAR MENSAGEM PARA WHATSAPP =====
  gerarMensagemWhatsApp: function() {
    if (this.itens.length === 0) return null;
    
    var mensagem = '*NOVO PEDIDO - NAPAU DESIGN*\n\n';
    mensagem += 'Olá! Gostaria de encomendar os seguintes itens:\n\n';
    
    for (var i = 0; i < this.itens.length; i++) {
      var item = this.itens[i];
      var subtotal = item.preco * item.quantidade;
      mensagem += '🍰 *' + item.nome + '*\n';
      mensagem += '   Quantidade: ' + item.quantidade + '\n';
      mensagem += '   Preço unitário: ' + this.formatarPreco(item.preco) + '\n';
      mensagem += '   Subtotal: ' + this.formatarPreco(subtotal) + '\n\n';
    }
    
    mensagem += '━━━━━━━━━━━━━━━━━━\n';
    mensagem += '📦 *TOTAL: ' + this.formatarPreco(this.calcularTotal()) + '*\n\n';
    mensagem += '📍 Entrega em Maputo\n';
    mensagem += '💳 Pagamento: M-Pesa / E-Mola / Numerário\n\n';
    mensagem += 'Aguardando confirmação do pedido. Obrigada!';
    
    return encodeURIComponent(mensagem);
  },

  // ===== LIMPAR CARRINHA =====
  limparCarrinha: function() {
    if (this.itens.length === 0) return;
    
    var confirmado = confirm('Tem certeza que deseja limpar toda a carrinha?');
    if (confirmado) {
      this.itens = [];
      this.salvarCarrinha();
      this.atualizarContagem();
      this.renderizarCarrinha();
      this.mostrarToast('Carrinha limpa com sucesso!', 'info');
    }
  },

  // ===== RENDERIZAR CARRINHA NO MODAL =====
  renderizarCarrinha: function() {
    var carrinhaContainer = document.getElementById('carrinha-container');
    if (!carrinhaContainer) return;

    if (this.itens.length === 0) {
      carrinhaContainer.innerHTML = '<div style="text-align: center; padding: 2rem;"><i class="fas fa-shopping-cart" style="font-size: 3rem; color: #ccc; margin-bottom: 1rem; display: block;"></i><p>A sua carrinha está vazia</p><a href="portfolio.html" class="cta-button" style="margin-top: 1rem; display: inline-block;">Ver Produtos</a></div>';
      return;
    }

    var carrinhaHTML = '<div style="max-height: 400px; overflow-y: auto;"><table style="width: 100%; border-collapse: collapse;"><thead><tr><th style="text-align: left; padding: 0.5rem;">Produto</th><th style="text-align: center; padding: 0.5rem;">Qtd</th><th style="text-align: right; padding: 0.5rem;">Subtotal</th><th style="width: 40px;"></th></tr></thead><tbody>';
    
    for (var i = 0; i < this.itens.length; i++) {
      var item = this.itens[i];
      var subtotal = item.preco * item.quantidade;
      carrinhaHTML += '<tr style="border-bottom: 1px solid #eee;"><td style="padding: 0.5rem;"><strong>' + item.nome + '</strong><br><small>' + this.formatarPreco(item.preco) + '/un</small></td><td style="padding: 0.5rem; text-align: center;"><div class="quantidade-controls" style="display: flex; align-items: center; justify-content: center; gap: 0.5rem;"><button class="qty-minus" data-id="' + item.id + '" style="width: 28px; height: 28px; border-radius: 50%; border: 1px solid #ddd; background: white; cursor: pointer;">-</button><span class="qty-value" style="min-width: 30px; text-align: center;">' + item.quantidade + '</span><button class="qty-plus" data-id="' + item.id + '" style="width: 28px; height: 28px; border-radius: 50%; border: 1px solid #ddd; background: white; cursor: pointer;">+</button></div></td><td style="padding: 0.5rem; text-align: right;">' + this.formatarPreco(subtotal) + '</td><td style="padding: 0.5rem; text-align: center;"><button class="remover-item-btn" data-id="' + item.id + '" style="background: none; border: none; color: #ff6b6b; cursor: pointer;"><i class="fas fa-trash-alt"></i></button></td></tr>';
    }
    
    carrinhaHTML += '</tbody></table></div><div class="carrinha-total" style="margin-top: 1rem; padding-top: 1rem; border-top: 2px solid #D4AF37; text-align: right;"><strong>TOTAL: ' + this.formatarPreco(this.calcularTotal()) + '</strong></div><div class="carrinha-actions" style="display: flex; gap: 1rem; margin-top: 1rem;"><button id="limpar-carrinha-btn" style="flex: 1; background: #f44336; color: white; border: none; padding: 0.75rem; border-radius: 0.5rem; cursor: pointer;"><i class="fas fa-trash-alt"></i> Limpar</button><button id="enviar-whatsapp-btn" style="flex: 2; background: #25D366; color: white; border: none; padding: 0.75rem; border-radius: 0.5rem; cursor: pointer;"><i class="fab fa-whatsapp"></i> Enviar Pedido</button></div>';

    carrinhaContainer.innerHTML = carrinhaHTML;
    this.addCarrinhaListeners();
  },

  // ===== ADICIONAR LISTENERS AOS BOTÕES DA CARRINHA =====
  addCarrinhaListeners: function() {
    var self = this;
    
    // Botões de remover
    var removerItemBtns = document.querySelectorAll('.remover-item-btn');
    for (var i = 0; i < removerItemBtns.length; i++) {
      var btn = removerItemBtns[i];
      btn.addEventListener('click', function(e) {
        var itemId = parseInt(this.dataset.id);
        self.removerItem(itemId);
      });
    }

    // Botões de menos (-)
    var qtyMinusBtns = document.querySelectorAll('.qty-minus');
    for (var i = 0; i < qtyMinusBtns.length; i++) {
      var btn = qtyMinusBtns[i];
      btn.addEventListener('click', function(e) {
        var itemId = parseInt(this.dataset.id);
        for (var j = 0; j < self.itens.length; j++) {
          if (self.itens[j].id === itemId) {
            self.atualizarQuantidade(itemId, self.itens[j].quantidade - 1);
            break;
          }
        }
      });
    }

    // Botões de mais (+)
    var qtyPlusBtns = document.querySelectorAll('.qty-plus');
    for (var i = 0; i < qtyPlusBtns.length; i++) {
      var btn = qtyPlusBtns[i];
      btn.addEventListener('click', function(e) {
        var itemId = parseInt(this.dataset.id);
        for (var j = 0; j < self.itens.length; j++) {
          if (self.itens[j].id === itemId) {
            self.atualizarQuantidade(itemId, self.itens[j].quantidade + 1);
            break;
          }
        }
      });
    }

    // Botão enviar WhatsApp
    var enviarBtn = document.getElementById('enviar-whatsapp-btn');
    if (enviarBtn) {
      enviarBtn.addEventListener('click', function() {
        var mensagem = self.gerarMensagemWhatsApp();
        if (mensagem) {
          if (typeof getWhatsAppLink === 'function') {
            var url = getWhatsAppLink(decodeURIComponent(mensagem));
            window.open(url, '_blank');
          } else {
            var numero = '258847615871';
            window.open('https://wa.me/' + numero + '?text=' + mensagem, '_blank');
          }
        }
      });
    }

    // Botão limpar carrinha
    var limparBtn = document.getElementById('limpar-carrinha-btn');
    if (limparBtn) {
      limparBtn.addEventListener('click', function() {
        self.limparCarrinha();
      });
    }
  },

  // ===== MOSTRAR TOAST (notificação) =====
  mostrarToast: function(mensagem, tipo) {
    if (tipo === undefined) tipo = 'sucesso';
    
    var toastExistente = document.querySelector('.toast-notification');
    if (toastExistente) toastExistente.remove();
    
    var toast = document.createElement('div');
    toast.className = 'toast-notification';
    
    var cores = {
      sucesso: '#4CAF50',
      erro: '#f44336',
      info: '#2196F3',
      alerta: '#FF9800'
    };
    
    var cor = cores[tipo] || cores.sucesso;
    var icone = 'fa-check-circle';
    if (tipo === 'erro') icone = 'fa-exclamation-circle';
    if (tipo === 'info') icone = 'fa-info-circle';
    if (tipo === 'alerta') icone = 'fa-exclamation-triangle';
    
    toast.style.cssText = 'position: fixed; bottom: 2rem; left: 50%; transform: translateX(-50%); background: ' + cor + '; color: white; padding: 0.75rem 1.5rem; border-radius: 2rem; z-index: 2000; animation: fadeInUp 0.3s ease; box-shadow: 0 4px 15px rgba(0,0,0,0.2); font-size: 0.85rem; max-width: 90vw; text-align: center;';
    toast.innerHTML = '<i class="fas ' + icone + '"></i> ' + mensagem;
    
    if (!document.querySelector('#toast-animation-style')) {
      var style = document.createElement('style');
      style.id = 'toast-animation-style';
      style.textContent = '@keyframes fadeInUp { from { opacity: 0; transform: translateX(-50%) translateY(20px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }';
      document.head.appendChild(style);
    }
    
    document.body.appendChild(toast);
    
    setTimeout(function() {
      if (toast && toast.parentNode) toast.remove();
    }, 2500);
  },

  // ===== INICIALIZAR =====
  init: function() {
    this.carregarCarrinha();
    this.atualizarContagem();
    console.log('✅ Carrinha inicializada com ' + this.itens.length + ' itens');
  }
};

// Variável global para acesso
var carrinha = CarrinhaModule;