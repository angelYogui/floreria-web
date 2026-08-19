/**
 * FLORERIA NGL - Gastronomía Botánica & Cocina de Autor
 * Application Logic, Interactive Menu, Cart & Reservation Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initLiveStatus();
  initPetals();
  initNavbar();
  initMenu();
  initCart();
  initReservation();
  initGalleryLightbox();
  initFAQ();
  initNewsletter();
});

/* ==========================================================================
   1. MENU DATA STORE & CATALOG
   ========================================================================== */
const MENU_ITEMS = [
  {
    id: 'dish-1',
    name: 'Pato Glaseado con Flor de Jamaica',
    category: 'fuertes',
    price: 34.50,
    tag: 'Recomendación del Chef',
    tagType: 'chef',
    diet: ['gluten-free', 'chef'],
    image: 'assets/images/hero_dish.jpg',
    description: 'Magret de pato sellado a la perfección con reducción de hibiscus y frutos rojos, puré aterciopelado de chirivía y flores de pensamiento comestibles del huerto.',
    ingredients: ['Magret de Pato', 'Flor de Jamaica', 'Frambuesas Silvestres', 'Flores de Pensamiento', 'Puré de Chirivía'],
    pairing: 'Maridaje sugerido: Pinot Noir Reserva 2021'
  },
  {
    id: 'dish-2',
    name: 'Tartar de Salmón & Perlas Cítricas',
    category: 'entradas',
    price: 18.50,
    tag: 'Especialidad NGL',
    tagType: 'popular',
    diet: ['gluten-free', 'popular'],
    image: 'assets/images/appetizer.jpg',
    description: 'Salmón fresco en dados sobre abanico de aguacate cremoso, vinagreta botánica de flor de azahar, microbrotes y violas púrpuras.',
    ingredients: ['Salmón Noruego Fresco', 'Aguacate Haas', 'Flor de Azahar', 'Violas Comestibles', 'Emulsión de Yuzu'],
    pairing: 'Maridaje sugerido: Sauvignon Blanc del Valle de Casablanca'
  },
  {
    id: 'dish-3',
    name: 'Risotto Dorado con Azafrán & Caléndula',
    category: 'pastas',
    price: 26.00,
    tag: 'Vegetariano',
    tagType: 'veggie',
    diet: ['veggie', 'chef'],
    image: 'assets/images/risotto.jpg',
    description: 'Arroz carnaroli mantecado con azafrán español, pétalos de caléndula fresca, teja crujiente de parmesano reggiano de 24 meses y trufa negra laminada.',
    ingredients: ['Arroz Carnaroli', 'Azafrán Español', 'Pétalos de Caléndula', 'Parmesano Reggiano', 'Trufa Negra'],
    pairing: 'Maridaje sugerido: Chardonnay envejecido en roble'
  },
  {
    id: 'dish-4',
    name: 'Cóctel Orquídea Violeta & Lavanda Humo',
    category: 'cocteleria',
    price: 14.00,
    tag: 'Mixología Insignia',
    tagType: 'popular',
    diet: ['veggie', 'popular'],
    image: 'assets/images/cocktail.jpg',
    description: 'Gin artesanal infusionado con flor de guisante mariposa, licor de violetas silvestres, jarabe de lavanda orgánica y niebla aromática de romero.',
    ingredients: ['Gin Botánico', 'Flor Butterfly Pea', 'Licor de Violetas', 'Lavanda Orgánica', 'Humo de Romero'],
    pairing: 'Ideal como aperitivo o digestivo floral'
  },
  {
    id: 'dish-5',
    name: 'Panna Cotta de Lavanda & Oro Comestible',
    category: 'postres',
    price: 13.50,
    tag: 'Postre de Autor',
    tagType: 'chef',
    diet: ['gluten-free', 'chef'],
    image: 'assets/images/dessert.jpg',
    description: 'Suave panna cotta aromatizada con infusión lenta de lavanda y vainilla de Papantla, compota de frutos del bosque, pétalos de rosa escarchados y láminas de oro puro 24k.',
    ingredients: ['Crema de Leche de Origen', 'Flores de Lavanda', 'Vainilla Natural', 'Pétalos de Rosa Cristalizados', 'Oro 24k'],
    pairing: 'Maridaje sugerido: Vino de Hielo o Cava Brut Nature'
  },
  {
    id: 'dish-6',
    name: 'Ceviche Floral de Pesca del Día',
    category: 'entradas',
    price: 19.00,
    tag: 'Sin Gluten',
    tagType: 'gluten-free',
    diet: ['gluten-free', 'popular'],
    image: 'assets/images/appetizer.jpg',
    description: 'Corte fino de corvina marinada en leche de tigre de maracuyá y rosas, cebolla morada encurtida, maíz choclo y flores de borraja azul.',
    ingredients: ['Corvina Fresca', 'Leche de Tigre de Rosas', 'Maracuyá', 'Flores de Borraja', 'Canchita Serrana'],
    pairing: 'Maridaje sugerido: Albariño D.O. Rías Baixas'
  },
  {
    id: 'dish-7',
    name: 'Raviolis de Ricotta & Flor de Calabaza',
    category: 'pastas',
    price: 24.50,
    tag: 'Vegetariano',
    tagType: 'veggie',
    diet: ['veggie'],
    image: 'assets/images/risotto.jpg',
    description: 'Pasta fresca hecha a mano rellena de queso ricotta artesanal y flor de calabaza, bañada en mantequilla de salvia tostada y nueces pecanas.',
    ingredients: ['Pasta Artesanal', 'Flor de Calabaza', 'Ricotta de Búfala', 'Mantequilla de Salvia', 'Pecanas Tostadas'],
    pairing: 'Maridaje sugerido: Chianti Classico Riserva'
  },
  {
    id: 'dish-8',
    name: 'Gin Tonic Botánico NGL con Pétalos',
    category: 'cocteleria',
    price: 13.00,
    tag: 'Clásico Reinventado',
    tagType: 'popular',
    diet: ['veggie', 'gluten-free'],
    image: 'assets/images/cocktail.jpg',
    description: 'Ginebra floral destilada con 12 botánicos, agua tónica premium mediterránea, bayas de enebro, pimienta rosa y corona de flores secas comestibles.',
    ingredients: ['Gin 12 Botánicos', 'Tónica Mediterránea', 'Pimienta Rosa', 'Enebro Silvestre', 'Pétalos Mixtos'],
    pairing: 'Perfecto acompañante para entradas y carnes'
  }
];

/* ==========================================================================
   2. LIVE STATUS INDICATOR
   ========================================================================== */
function initLiveStatus() {
  const statusElement = document.getElementById('live-status-text');
  if (!statusElement) return;

  const now = new Date();
  const currentHour = now.getHours();
  // Horario: 12:30 a 23:30 hrs
  const isOpen = currentHour >= 12 && currentHour < 23;

  if (isOpen) {
    statusElement.innerHTML = `🟢 <strong>Abierto Ahora</strong> · Cierra a las 23:30 hrs`;
  } else {
    statusElement.innerHTML = `🟡 <strong>Próxima Apertura</strong> · Hoy 12:30 hrs (Reservas abiertas)`;
  }
}

/* ==========================================================================
   3. FLOATING BOTANICAL PETALS
   ========================================================================== */
function initPetals() {
  const container = document.getElementById('petals-container');
  if (!container) return;

  const petalCount = 14;
  for (let i = 0; i < petalCount; i++) {
    const petal = document.createElement('div');
    petal.classList.add('petal');
    
    const size = Math.random() * 14 + 10;
    const startX = Math.random() * 100;
    const duration = Math.random() * 10 + 9;
    const delay = Math.random() * 8;
    
    petal.style.width = `${size}px`;
    petal.style.height = `${size * 1.3}px`;
    petal.style.left = `${startX}%`;
    petal.style.animationDuration = `${duration}s`;
    petal.style.animationDelay = `${delay}s`;
    
    container.appendChild(petal);
  }
}

/* ==========================================================================
   4. NAVBAR SCROLL & MOBILE DRAWER
   ========================================================================== */
function initNavbar() {
  const header = document.getElementById('main-header');
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const navLinks = document.getElementById('nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = toggleBtn.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    // Cerrar al dar click en un link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = toggleBtn.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }
}

/* ==========================================================================
   5. MENU FILTERING & RENDERING
   ========================================================================== */
let activeCategory = 'todos';
let activeDiet = 'todos';
let searchQuery = '';

function initMenu() {
  renderMenu();

  // Category tab buttons
  const categoryBtns = document.querySelectorAll('.category-tabs .tab-btn');
  categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      categoryBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.dataset.category;
      renderMenu();
    });
  });

  // Diet filter chips
  const dietChips = document.querySelectorAll('.diet-chip');
  dietChips.forEach(chip => {
    chip.addEventListener('click', () => {
      if (chip.classList.contains('active')) {
        chip.classList.remove('active');
        activeDiet = 'todos';
      } else {
        dietChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        activeDiet = chip.dataset.diet;
      }
      renderMenu();
    });
  });

  // Search input
  const searchInput = document.getElementById('menu-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderMenu();
    });
  }
}

function renderMenu() {
  const container = document.getElementById('menu-grid');
  if (!container) return;

  const filtered = MENU_ITEMS.filter(item => {
    const matchCategory = activeCategory === 'todos' || item.category === activeCategory;
    const matchDiet = activeDiet === 'todos' || item.diet.includes(activeDiet);
    const matchSearch = searchQuery === '' || 
      item.name.toLowerCase().includes(searchQuery) ||
      item.description.toLowerCase().includes(searchQuery) ||
      item.ingredients.some(ing => ing.toLowerCase().includes(searchQuery));

    return matchCategory && matchDiet && matchSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem;">
        <i class="fa-solid fa-seedling" style="font-size: 3rem; color: var(--gold-primary); margin-bottom: 1rem;"></i>
        <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem;">No se encontraron platillos</h3>
        <p>Intenta con otros filtros o términos de búsqueda botánica.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(dish => `
    <div class="dish-card" data-id="${dish.id}">
      <div class="dish-media">
        <img src="${dish.image}" alt="${dish.name}" loading="lazy">
        <span class="dish-tag-badge">
          <i class="fa-solid fa-spa"></i> ${dish.tag}
        </span>
        <span class="dish-price-tag">$${dish.price.toFixed(2)}</span>
      </div>
      <div class="dish-body">
        <div class="dish-header">
          <h3 class="dish-title">${dish.name}</h3>
        </div>
        <p class="dish-desc">${dish.description}</p>
        <div class="dish-ingredients">
          ${dish.ingredients.slice(0, 3).map(ing => `<span class="ingredient-pill">${ing}</span>`).join('')}
          ${dish.ingredients.length > 3 ? `<span class="ingredient-pill">+${dish.ingredients.length - 3}</span>` : ''}
        </div>
        <div class="dish-actions">
          <button class="btn btn-secondary btn-sm" onclick="openDishDetail('${dish.id}')">
            <i class="fa-regular fa-eye"></i> Detalle
          </button>
          <button class="btn btn-primary btn-sm btn-add-cart" onclick="addToCart('${dish.id}')">
            <i class="fa-solid fa-plus"></i> Pedir
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   6. DISH DETAIL MODAL
   ========================================================================== */
window.openDishDetail = function(dishId) {
  const dish = MENU_ITEMS.find(d => d.id === dishId);
  if (!dish) return;

  const modal = document.getElementById('dish-detail-modal');
  const content = document.getElementById('dish-modal-content');
  if (!modal || !content) return;

  content.innerHTML = `
    <div style="position: relative;">
      <img src="${dish.image}" alt="${dish.name}" style="width: 100%; height: 260px; object-fit: cover;">
      <div style="position: absolute; bottom: 1rem; right: 1rem; background: var(--gold-gradient); color: #000; font-family: var(--font-display); font-weight: 700; font-size: 1.3rem; padding: 0.4rem 1.2rem; border-radius: 99px;">
        $${dish.price.toFixed(2)}
      </div>
    </div>
    <div style="padding: 2rem;">
      <span class="badge badge-gold" style="margin-bottom: 0.8rem;">
        <i class="fa-solid fa-spa"></i> ${dish.tag}
      </span>
      <h2 style="font-size: 1.8rem; margin-bottom: 0.8rem;">${dish.name}</h2>
      <p style="font-size: 1rem; margin-bottom: 1.5rem; line-height: 1.7;">${dish.description}</p>
      
      <div style="margin-bottom: 1.5rem;">
        <h4 style="font-size: 0.95rem; text-transform: uppercase; color: var(--gold-light); margin-bottom: 0.6rem; letter-spacing: 0.05em;">
          <i class="fa-solid fa-leaf"></i> Ingredientes de Cosecha Propia:
        </h4>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
          ${dish.ingredients.map(ing => `<span class="ingredient-pill" style="padding: 0.35rem 0.75rem; font-size: 0.85rem;">${ing}</span>`).join('')}
        </div>
      </div>

      <div style="background: rgba(212, 175, 55, 0.08); border-left: 3px solid var(--gold-primary); padding: 0.9rem 1.2rem; border-radius: 6px; margin-bottom: 2rem;">
        <p style="font-size: 0.92rem; color: var(--gold-light); margin: 0;">
          <i class="fa-solid fa-wine-glass"></i> ${dish.pairing}
        </p>
      </div>

      <div style="display: flex; gap: 1rem;">
        <button class="btn btn-primary" style="flex: 1;" onclick="addToCart('${dish.id}'); closeDishModal();">
          <i class="fa-solid fa-bag-shopping"></i> Agregar al Pedido ($${dish.price.toFixed(2)})
        </button>
      </div>
    </div>
  `;

  modal.classList.add('active');
};

window.closeDishModal = function() {
  const modal = document.getElementById('dish-detail-modal');
  if (modal) modal.classList.remove('active');
};

/* ==========================================================================
   7. SHOPPING CART & WHATSAPP GENERATOR
   ========================================================================== */
let cart = [];
const RESTAURANT_WHATSAPP = '51999888777'; // Número de WhatsApp del restaurante FloreriA NGL

function initCart() {
  const cartToggleBtn = document.getElementById('cart-toggle-btn');
  const cartDrawerOverlay = document.getElementById('cart-drawer-overlay');
  const cartCloseBtn = document.getElementById('cart-close-btn');

  if (cartToggleBtn && cartDrawerOverlay) {
    cartToggleBtn.addEventListener('click', () => {
      cartDrawerOverlay.classList.add('active');
    });
  }

  if (cartCloseBtn && cartDrawerOverlay) {
    cartCloseBtn.addEventListener('click', () => {
      cartDrawerOverlay.classList.remove('active');
    });
  }

  if (cartDrawerOverlay) {
    cartDrawerOverlay.addEventListener('click', (e) => {
      if (e.target === cartDrawerOverlay) {
        cartDrawerOverlay.classList.remove('active');
      }
    });
  }

  const checkoutBtn = document.getElementById('checkout-whatsapp-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', sendOrderToWhatsApp);
  }
}

window.addToCart = function(dishId) {
  const dish = MENU_ITEMS.find(d => d.id === dishId);
  if (!dish) return;

  const existingItem = cart.find(item => item.id === dishId);
  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cart.push({
      id: dish.id,
      name: dish.name,
      price: dish.price,
      image: dish.image,
      qty: 1
    });
  }

  updateCartUI();
  showToast(`✨ Se agregó "${dish.name}" a tu pedido.`);
};

window.updateQty = function(dishId, change) {
  const item = cart.find(i => i.id === dishId);
  if (!item) return;

  item.qty += change;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== dishId);
  }
  updateCartUI();
};

function updateCartUI() {
  const countBadge = document.getElementById('cart-count');
  const itemsContainer = document.getElementById('cart-items-container');
  const subtotalElement = document.getElementById('cart-subtotal');
  const totalElement = document.getElementById('cart-total');

  const totalQty = cart.reduce((acc, item) => acc + item.qty, 0);
  if (countBadge) {
    countBadge.textContent = totalQty;
    countBadge.style.transform = totalQty > 0 ? 'scale(1.2)' : 'scale(1)';
    setTimeout(() => {
      if (countBadge) countBadge.style.transform = 'scale(1)';
    }, 200);
  }

  if (!itemsContainer) return;

  if (cart.length === 0) {
    itemsContainer.innerHTML = `
      <div class="cart-empty-state">
        <i class="fa-solid fa-basket-shopping"></i>
        <h4 style="font-size: 1.15rem; margin-bottom: 0.4rem;">Tu canasta está vacía</h4>
        <p style="font-size: 0.9rem;">Explora nuestra carta botánica y agrega tus platillos favoritos.</p>
      </div>
    `;
    if (subtotalElement) subtotalElement.textContent = '$0.00';
    if (totalElement) totalElement.textContent = '$0.00';
    return;
  }

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

  itemsContainer.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" class="cart-item-img">
      <div class="cart-item-info">
        <h5 class="cart-item-title">${item.name}</h5>
        <span class="cart-item-price">$${(item.price * item.qty).toFixed(2)} ($${item.price.toFixed(2)} c/u)</span>
        <div class="cart-item-controls">
          <button class="qty-btn" onclick="updateQty('${item.id}', -1)"><i class="fa-solid fa-minus"></i></button>
          <span style="font-size: 0.9rem; font-weight: 600; min-width: 18px; text-align: center;">${item.qty}</span>
          <button class="qty-btn" onclick="updateQty('${item.id}', 1)"><i class="fa-solid fa-plus"></i></button>
        </div>
      </div>
    </div>
  `).join('');

  if (subtotalElement) subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
  if (totalElement) totalElement.textContent = `$${subtotal.toFixed(2)}`;
}

function sendOrderToWhatsApp() {
  if (cart.length === 0) {
    showToast('⚠️ Por favor agrega al menos un plato a tu pedido.');
    return;
  }

  const deliveryType = document.querySelector('input[name="delivery-type"]:checked')?.value || 'Para Llevar';
  const customerName = document.getElementById('order-customer-name')?.value.trim() || 'Cliente';
  const customerNotes = document.getElementById('order-notes')?.value.trim() || 'Ninguna';

  const total = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

  let message = `🌿 *NUEVO PEDIDO - FLORERIA NGL* 🌿\n\n`;
  message += `👤 *Cliente:* ${customerName}\n`;
  message += `📍 *Modalidad:* ${deliveryType}\n`;
  message += `📝 *Observaciones:* ${customerNotes}\n\n`;
  message += `📋 *DETALLE DEL PEDIDO:*\n`;
  
  cart.forEach((item, index) => {
    message += `${index + 1}. ${item.qty}x ${item.name} - $${(item.price * item.qty).toFixed(2)}\n`;
  });

  message += `\n💰 *TOTAL:* $${total.toFixed(2)}\n`;
  message += `\n✨ _¡Hola! Me gustaría confirmar este pedido de la carta de FloreriA NGL._`;

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${RESTAURANT_WHATSAPP}&text=${encodedMessage}`;

  window.open(whatsappUrl, '_blank');
  showToast('🚀 Redirigiendo a WhatsApp para confirmar tu pedido...');
}

/* ==========================================================================
   8. TABLE RESERVATIONS ENGINE
   ========================================================================== */
function initReservation() {
  const dateInput = document.getElementById('booking-date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    dateInput.value = today;
  }

  const bookingForm = document.getElementById('table-booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('booking-name').value;
      const phone = document.getElementById('booking-phone').value;
      const date = document.getElementById('booking-date').value;
      const time = document.getElementById('booking-time').value;
      const guests = document.getElementById('booking-guests').value;
      const zone = document.querySelector('input[name="booking-zone"]:checked')?.value || 'Terraza Jardín Botánico';
      const occasion = document.getElementById('booking-occasion').value;

      // Generar mensaje de confirmación para WhatsApp opcional
      let msg = `🌸 *RESERVA DE MESA - FLORERIA NGL* 🌸\n\n`;
      msg += `👤 *Nombre:* ${name}\n`;
      msg += `📞 *Teléfono:* ${phone}\n`;
      msg += `📅 *Fecha:* ${date}\n`;
      msg += `⏰ *Hora:* ${time}\n`;
      msg += `👥 *Comensales:* ${guests} personas\n`;
      msg += `🌿 *Zona elegida:* ${zone}\n`;
      msg += `🥂 *Ocasión:* ${occasion}\n\n`;
      msg += `✨ _¡Hola! Acabo de solicitar esta reserva de mesa en su sitio web._`;

      showBookingConfirmation(name, date, time, guests, zone, msg);
    });
  }
}

function showBookingConfirmation(name, date, time, guests, zone, whatsappMsg) {
  const modal = document.getElementById('reservation-confirm-modal');
  const content = document.getElementById('reservation-modal-content');
  if (!modal || !content) return;

  content.innerHTML = `
    <div style="padding: 2.5rem; text-align: center;">
      <div style="width: 70px; height: 70px; border-radius: 50%; background: var(--gold-gradient); color: #000; font-size: 2rem; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem auto;">
        <i class="fa-solid fa-check"></i>
      </div>
      <h2 style="font-size: 1.8rem; margin-bottom: 0.5rem;">¡Solicitud de Reserva Registrada!</h2>
      <p style="color: var(--gold-light); font-size: 1.05rem; margin-bottom: 1.5rem;">Estimado/a ${name}, estamos preparando tu mesa.</p>
      
      <div style="background: rgba(255,255,255,0.04); border: 1px solid var(--border-subtle); border-radius: 12px; padding: 1.2rem; text-align: left; margin-bottom: 2rem;">
        <p style="margin-bottom: 0.4rem;"><strong>📅 Fecha:</strong> ${date} | <strong>⏰ Hora:</strong> ${time}</p>
        <p style="margin-bottom: 0.4rem;"><strong>👥 Personas:</strong> ${guests} comensales</p>
        <p style="margin: 0;"><strong>🌿 Zona:</strong> ${zone}</p>
      </div>

      <div style="display: flex; flex-direction: column; gap: 0.8rem;">
        <a href="https://api.whatsapp.com/send?phone=${RESTAURANT_WHATSAPP}&text=${encodeURIComponent(whatsappMsg)}" target="_blank" class="btn btn-primary" style="width: 100%;">
          <i class="fa-brands fa-whatsapp"></i> Confirmar Inmediato por WhatsApp
        </a>
        <button class="btn btn-secondary" onclick="closeReservationModal()" style="width: 100%;">
          Aceptar y Cerrar
        </button>
      </div>
    </div>
  `;

  modal.classList.add('active');
  showToast('🎉 ¡Reserva registrada con éxito!');
}

window.closeReservationModal = function() {
  const modal = document.getElementById('reservation-confirm-modal');
  if (modal) modal.classList.remove('active');
};

/* ==========================================================================
   9. GALLERY LIGHTBOX
   ========================================================================== */
function initGalleryLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('gallery-lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-image');
  const lightboxCaption = document.getElementById('lightbox-caption');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const title = item.querySelector('h4')?.textContent || 'FloreriA NGL';
      const sub = item.querySelector('span')?.textContent || '';

      if (lightbox && lightboxImg && img) {
        lightboxImg.src = img.src;
        if (lightboxCaption) {
          lightboxCaption.innerHTML = `<strong>${title}</strong> — ${sub}`;
        }
        lightbox.classList.add('active');
      }
    });
  });
}

window.closeLightbox = function() {
  const lightbox = document.getElementById('gallery-lightbox-modal');
  if (lightbox) lightbox.classList.remove('active');
};

/* ==========================================================================
   10. FAQ ACCORDION
   ========================================================================== */
function initFAQ() {
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      item.classList.toggle('open');
    });
  });
}

/* ==========================================================================
   11. NEWSLETTER & TOASTS
   ========================================================================== */
function initNewsletter() {
  const form = document.getElementById('newsletter-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('newsletter-email').value;
      if (email) {
        showToast('💌 ¡Bienvenido/a al Club Gourmet de FloreriA NGL! Recibirás invitaciones exclusivas.');
        form.reset();
      }
    });
  }
}

function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.classList.add('toast');
  toast.innerHTML = `
    <i class="fa-solid fa-spa toast-icon"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  // Animación entrada
  setTimeout(() => toast.classList.add('show'), 50);

  // Animación salida
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}
