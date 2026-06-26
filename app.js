// Product Database
const products = [
  {
    id: 1,
    name: "Zapatillas Urbanas Hombre New Balance Negra ML 515 BT3",
    price: 69990,
    category: "hombre",
    tag: "Running",
    badge: "Nuevo",
    image: "assets/zapatilla_new_balance_ML515.jpeg",
    description: "Calzado de estilo retro-running diseñado para el uso diario casual, combinando una estética clásica con tecnologías modernas de confort."
  },
  {
    id: 2,
    name: "Zapatilla armour curry",
    price: 129990,
    category: "hombre",
    tag: "Running",
    badge: "Destacado",
    image: "assets/zapatilla_under_curry.jpeg",
    description: "Destacan por su diseño ultraligero y su agarre superior en la cancha. Ofrecen una excelente amortiguación reactiva, soporte dinámico en el mediopié y estabilidad sin igual para cortes rápidos y cambios de dirección explosivos."
  },
  {
    id: 3,
    name: "Zapatillas urbana converse",
    price: 69990,
    category: "hombre",
    tag: "Running",
    badge: "",
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=600&q=80",
    description: "Son un ícono atemporal que combina comodidad, diseño versátil y herencia deportiva."
  },
  {
    id: 4,
    name: "Sostén HeatGear Armor High mujer Negro",
    price: 39990,
    category: "mujer",
    tag: "Running",
    badge: "Popular",
    image: "assets/sosten_under_armour.jpeg",
    description: "El sostén deportivo Under Armour HeatGear Armor High en color negro es una prenda de alto rendimiento diseñada para actividades de alto impacto, como running, deportes de cancha y aeróbicos. Ofrece un soporte estratégico, una excelente transpirabilidad y una sensación de compresión que mantiene todo en su lugar."
  },
  {
    id: 5,
    name: "Under Armour TECH TWIST Camiseta de manga larga ",
    price: 39990,
    category: "mujer",
    tag: "Running",
    badge: "Tech",
    image: "assets/camiseta_under.jpeg",
    description: "Es una prenda de entrenamiento premium. Está confeccionada con el tejido insignia UA Tech™, diseñado para ser ultraligero y de secado rápido, ofreciendo una sensación suave y natural."
  },
  {
    id: 6,
    name: "Calza  Fitful Two Legging Long everlast",
    price: 39990,
    category: "mujer",
    tag: "Running",
    badge: "",
    image: "assets/calza_everlast.jpg",
    description: "Prenda deportiva de tiro alto y calce ajustado. Diseñada para brindar máxima comodidad y soporte, está confeccionada con tejido elástico (86% Poliéster / 14% Elastano) que garantiza libertad de movimiento y un tacto muy suave, ideal para ir al gimnasio o para un estilo urbano."
  },
  {
    id: 7,
    name: "Columbia Polar Mujer Glacial Iv 1/2 Zip Blanco",
    price: 69990,
    category: "mujer",
    tag: "Training",
    badge: "Nuevo",
    image: "assets/polar_columbia.jpg",
    description: "Prenda térmica ultraligera y versátil. Confeccionada en micropolar suave (100% poliéster), cuenta con un diseño de medio cierre frontal y cuello alto que aísla el frío. Su tejido elástico aporta comodidad y libertad de movimiento."
  },
  {
    id: 8,
    name: "Balon voleybol reebok",
    price: 29990,
    category: "equipamiento",
    tag: "voleibol",
    badge: "",
    image: "assets/balon_volleyball_reebok.jpg",
    description: "Son balones de tamaño y peso reglamentarios ideales para entrenamiento y partidos recreativos. Están diseñados para ofrecer un rendimiento óptimo tanto en interiores (cancha cerrada) como en exteriores o playa."
  },
  {
    id: 9,
    name: "Pelota reebok Basquet classic",
    price: 46990,
    category: "equipamiento",
    tag: "basquetball",
    badge: "",
    image: "assets/pelota_basquet.jpg",
    description: "Es un balón de alto rendimiento diseñado para competición y entrenamiento. Combina una estética vintage con materiales modernos, ofreciendo un agarre superior y un control óptimo tanto en canchas interiores como exteriores."
  }
];

// App State
let cart = JSON.parse(localStorage.getItem('punto_fit_cart')) || [];
let activePage = 'inicio';
let selectedProduct = null;
let activeCategory = 'todos';
let searchQuery = '';
let sortBy = 'featured';

// DOM Elements
const pages = {
  inicio: document.getElementById('page-inicio'),
  catalogo: document.getElementById('page-catalogo'),
  nosotros: document.getElementById('page-nosotros'),
  producto: document.getElementById('page-producto'),
  contacto: document.getElementById('page-contacto')
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  setupRouter();
  setupCart();
  renderFeaturedProducts();
  renderCatalogProducts();
  setupCatalogFilters();
  setupContactForm();
  updateCartBadge();

  // Close loader/smooth display
  document.body.style.opacity = 1;
});

// 1. SIMPLE SPA ROUTER
function setupRouter() {
  const navigate = (pageId) => {
    // Hide all pages, show selected
    Object.keys(pages).forEach(key => {
      if (pages[key]) {
        pages[key].classList.remove('active');
      }
    });

    if (pages[pageId]) {
      pages[pageId].classList.add('active');
      activePage = pageId;
      window.scrollTo(0, 0);
    } else {
      pages.inicio.classList.add('active');
      activePage = 'inicio';
    }

    // Update nav links active states
    document.querySelectorAll('.nav-link, .nav-mobile-item').forEach(link => {
      const href = link.getAttribute('href') || link.getAttribute('data-target');
      if (href === `#${pageId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };

  // Listen to hash changes
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.substring(1) || 'inicio';
    // If it's a product detail link with id: product-X
    if (hash.startsWith('producto-')) {
      const prodId = parseInt(hash.split('-')[1]);
      showProductDetails(prodId);
    } else {
      navigate(hash);
    }
  });

  // Handle initial page load
  const initialHash = window.location.hash.substring(1) || 'inicio';
  if (initialHash.startsWith('producto-')) {
    const prodId = parseInt(initialHash.split('-')[1]);
    showProductDetails(prodId);
  } else {
    navigate(initialHash);
  }

  // Intercept click on data-navigate elements for flexibility
  document.querySelectorAll('[data-navigate]').forEach(elem => {
    elem.addEventListener('click', (e) => {
      e.preventDefault();
      const target = elem.getAttribute('data-navigate');
      window.location.hash = target;
    });
  });
}

// 2. PRODUCT RENDERING (HOME)
function renderFeaturedProducts() {
  const container = document.getElementById('featured-products-container');
  if (!container) return;

  // Show first 5 products for mobile, or first 4 as featured
  const featured = products.slice(0, 5);

  container.innerHTML = featured.map(prod => createProductCardMarkup(prod)).join('');
}

function createProductCardMarkup(prod) {
  const badgeHTML = prod.badge ? `<span class="product-badge">${prod.badge}</span>` : '';

  return `
    <article class="product-card">
      ${badgeHTML}
      <div class="product-img-wrapper">
        <img class="product-card-img" src="${prod.image}" alt="${prod.name}" loading="lazy">
      </div>
      <div class="product-info">
        <div class="product-header-row">
          <h3 class="product-title">${prod.name}</h3>
          <span class="product-price">$${prod.price.toFixed(2)}</span>
        </div>
        <p class="product-category">${prod.category.charAt(0).toUpperCase() + prod.category.slice(1)} • ${prod.tag}</p>
        
        <div class="product-actions">
          <button class="btn btn-primary btn-sm btn-full" onclick="quickAddToCart(${prod.id}, event)">
            Agregar al Carrito
          </button>
          <a href="#producto-${prod.id}" class="product-card-link">
            Ver detalles
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </a>
        </div>
      </div>
    </article>
  `;
}

// 3. CATALOG LOGIC
function renderCatalogProducts() {
  const container = document.getElementById('catalog-products-container');
  if (!container) return;

  // Filter
  let filtered = products.filter(prod => {
    const matchesCategory = activeCategory === 'todos' || prod.category === activeCategory;
    const matchesSearch = prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.tag.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort
  if (sortBy === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else {
    // default sort (by id)
    filtered.sort((a, b) => a.id - b.id);
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="cart-empty-state" style="grid-column: 1 / -1; padding: 60px 20px;">
        <svg class="cart-empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <h3 class="text-headline-md">No se encontraron productos</h3>
        <p class="text-body-md" style="margin-top: 8px;">Intenta cambiar los filtros o tu búsqueda.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(prod => createProductCardMarkup(prod)).join('');
}

function setupCatalogFilters() {
  // Category chips
  const chips = document.querySelectorAll('.filter-chip');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeCategory = chip.getAttribute('data-category');
      renderCatalogProducts();
    });
  });

  // Search input
  const searchInput = document.getElementById('catalog-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderCatalogProducts();
    });
  }

  // Sort select
  const sortSelect = document.getElementById('catalog-sort');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      sortBy = e.target.value;
      renderCatalogProducts();
    });
  }
}

// 4. PRODUCT DETAILS LOGIC
function showProductDetails(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  selectedProduct = product;

  // Render content
  const container = document.getElementById('product-detail-view-container');
  if (!container) return;

  container.innerHTML = `
    <a href="#catalogo" class="back-link">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
      </svg>
      Volver al catálogo
    </a>
    
    <div class="product-detail-wrapper">
      <div class="detail-img-container">
        <img class="detail-img" src="${product.image}" alt="${product.name}">
      </div>
      
      <div class="detail-content">
        <span class="detail-category">${product.category} • ${product.tag}</span>
        <h2 class="text-headline-lg detail-title">${product.name}</h2>
        <div class="detail-price">$${product.price.toFixed(2)}</div>
        
        <p class="text-body-md detail-desc">${product.description}</p>
        
        <div class="detail-divider"></div>
        
        <!-- Size Selector (Apparel only) -->
        ${(product.category === 'hombre' || product.category === 'mujer') ? `
          <div class="option-group">
            <h4 class="option-label">Seleccionar Talle</h4>
            <div class="sizes-grid" id="detail-size-selector">
              <button class="size-btn active">S</button>
              <button class="size-btn">M</button>
              <button class="size-btn">L</button>
              <button class="size-btn">XL</button>
            </div>
          </div>
        ` : ''}
        
        <div class="option-group">
          <h4 class="option-label">Cantidad</h4>
          <div class="qty-selector">
            <button class="qty-btn" id="detail-qty-minus">-</button>
            <input type="text" class="qty-input" id="detail-qty-input" value="1" readonly>
            <button class="qty-btn" id="detail-qty-plus">+</button>
          </div>
        </div>
        
        <div class="add-actions">
          <button class="btn btn-primary" id="detail-add-btn">
            Agregar al Carrito
          </button>
        </div>
      </div>
    </div>
  `;

  // Size Selector Events
  const sizeBtns = container.querySelectorAll('.size-btn');
  sizeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sizeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Qty selector events
  const qtyInput = container.querySelector('#detail-qty-input');
  const btnMinus = container.querySelector('#detail-qty-minus');
  const btnPlus = container.querySelector('#detail-qty-plus');

  btnMinus.addEventListener('click', () => {
    let val = parseInt(qtyInput.value);
    if (val > 1) {
      qtyInput.value = val - 1;
    }
  });

  btnPlus.addEventListener('click', () => {
    let val = parseInt(qtyInput.value);
    qtyInput.value = val + 1;
  });

  // Add to cart event
  const addBtn = container.querySelector('#detail-add-btn');
  addBtn.addEventListener('click', () => {
    const qty = parseInt(qtyInput.value);
    const sizeActive = container.querySelector('.size-btn.active');
    const size = sizeActive ? sizeActive.innerText : 'N/A';

    addToCart(product.id, qty, size);
  });

  // Change hash to switch to detail screen container
  Object.keys(pages).forEach(key => {
    if (pages[key]) {
      pages[key].classList.remove('active');
    }
  });
  pages.producto.classList.add('active');
  window.scrollTo(0, 0);
}

// 5. SHOPPING CART LOGIC
function setupCart() {
  const cartBtn = document.getElementById('header-cart-btn');
  const mobileCartBtn = document.getElementById('mobile-cart-btn');
  const cartCloseBtn = document.getElementById('cart-close-btn');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartBackdrop = document.getElementById('cart-backdrop');

  const openDrawer = (e) => {
    if (e) e.preventDefault();
    cartDrawer.classList.add('open');
    cartBackdrop.classList.add('open');
    renderCart();
  };

  const closeDrawer = () => {
    cartDrawer.classList.remove('open');
    cartBackdrop.classList.remove('open');
  };

  if (cartBtn) cartBtn.addEventListener('click', openDrawer);
  if (mobileCartBtn) mobileCartBtn.addEventListener('click', openDrawer);
  if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeDrawer);
  if (cartBackdrop) cartBackdrop.addEventListener('click', closeDrawer);

  window.closeCart = closeDrawer;
  window.openCart = openDrawer;
}

function addToCart(productId, qty = 1, size = 'N/A') {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  // Check if already in cart with same size
  const existingItemIndex = cart.findIndex(item => item.id === productId && item.size === size);

  if (existingItemIndex > -1) {
    cart[existingItemIndex].qty += qty;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: size,
      qty: qty
    });
  }

  saveCart();
  updateCartBadge();
  showToast(`${qty} x ${product.name} agregado al carrito!`);

  // Auto open cart for immediate feedback
  setTimeout(() => {
    window.openCart();
  }, 400);
}

// Quick add from card (Home / Catalog lists)
window.quickAddToCart = function (productId, event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  const product = products.find(p => p.id === productId);
  if (!product) return;

  // Default sizes for quick addition if clothing
  let defaultSize = 'N/A';
  if (product.category === 'hombre' || product.category === 'mujer') {
    defaultSize = 'M';
  }

  addToCart(productId, 1, defaultSize);
};

function saveCart() {
  localStorage.setItem('punto_fit_cart', JSON.stringify(cart));
}

function updateCartBadge() {
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  document.querySelectorAll('.badge-count').forEach(badge => {
    badge.innerText = totalItems;
    badge.style.display = totalItems > 0 ? 'flex' : 'none';
  });
}

function renderCart() {
  const container = document.getElementById('cart-items-container');
  const subtotalLabel = document.getElementById('cart-subtotal');
  const totalLabel = document.getElementById('cart-total');
  const cartFooter = document.querySelector('.cart-footer');

  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty-state">
        <svg class="cart-empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        <h3 class="text-headline-md">Tu carrito está vacío</h3>
        <p class="text-body-md" style="margin-top: 8px;">Explora la tienda y agrega los mejores productos deportivos.</p>
        <button class="btn btn-primary" style="margin-top: 20px;" onclick="window.closeCart(); window.location.hash='#catalogo'">Ver Catálogo</button>
      </div>
    `;
    if (cartFooter) cartFooter.style.display = 'none';
    return;
  }

  if (cartFooter) cartFooter.style.display = 'block';

  container.innerHTML = cart.map((item, index) => `
    <div class="cart-item">
      <div class="cart-item-img-container">
        <img class="cart-item-img" src="${item.image}" alt="${item.name}">
      </div>
      <div class="cart-item-details">
        <div>
          <h4 class="cart-item-name">${item.name}</h4>
          <span class="cart-item-meta">Talle: ${item.size}</span>
        </div>
        
        <div class="cart-item-bottom">
          <span class="cart-item-price">$${(item.price * item.qty).toFixed(2)}</span>
          
          <div style="display: flex; align-items: center;">
            <div class="cart-item-qty">
              <button class="cart-item-qty-btn" onclick="updateCartItemQty(${index}, -1)">-</button>
              <input type="text" class="cart-item-qty-input" value="${item.qty}" readonly>
              <button class="cart-item-qty-btn" onclick="updateCartItemQty(${index}, 1)">+</button>
            </div>
            
            <button class="cart-item-remove" onclick="removeCartItem(${index})">Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  // Calculate prices
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  if (subtotalLabel) subtotalLabel.innerText = `$${subtotal.toFixed(2)}`;
  if (totalLabel) totalLabel.innerText = `$${subtotal.toFixed(2)}`;
}

window.updateCartItemQty = function (index, change) {
  if (cart[index]) {
    cart[index].qty += change;

    if (cart[index].qty <= 0) {
      cart.splice(index, 1);
    }

    saveCart();
    updateCartBadge();
    renderCart();
  }
};

window.removeCartItem = function (index) {
  if (cart[index]) {
    cart.splice(index, 1);
    saveCart();
    updateCartBadge();
    renderCart();
  }
};

window.checkout = function () {
  // Internal reset used after WhatsApp redirect
  cart = [];
  saveCart();
  updateCartBadge();
  renderCart();
  setTimeout(() => {
    window.closeCart();
  }, 1500);
};

window.checkoutWhatsApp = function () {
  if (cart.length === 0) {
    showToast('Tu carrito está vacío', true);
    return;
  }

  // Build the WhatsApp message with cart summary
  const lines = cart.map(item => {
    const sizeText = item.size && item.size !== 'N/A' ? ` (Talle: ${item.size})` : '';
    return `• ${item.qty}x ${item.name}${sizeText} - $${(item.price * item.qty).toFixed(2)}`;
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const message =
    `¡Hola Punto Fit! 👋 Quiero realizar el siguiente pedido:\n\n` +
    lines.join('\n') +
    `\n\n*Total: $${total.toFixed(2)}*\n\n¿Podríamos coordinar el pago y envío? ¡Gracias!`;

  const encoded = encodeURIComponent(message);
  const waUrl = `https://wa.me/56976014642?text=${encoded}`;

  // Open WhatsApp in a new tab
  window.open(waUrl, '_blank');

  // Show confirmation toast and reset cart
  showToast('¡Redirigiendo a WhatsApp! 🎉');
  window.checkout();
};

// 6. CONTACT FORM VALIDATION
function setupContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Simple verification
    const name = form.querySelector('#contact-name').value.trim();
    const email = form.querySelector('#contact-email').value.trim();
    const message = form.querySelector('#contact-message').value.trim();

    if (!name || !email || !message) {
      showToast("Por favor complete todos los campos requeridos.", true);
      return;
    }

    // Success simulation
    showToast("¡Mensaje enviado con éxito! Nos contactaremos pronto.");
    form.reset();
  });
}

// 7. TOAST NOTIFICATION
function showToast(message, isError = false) {
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  if (isError) toast.style.borderLeftColor = 'var(--error)';

  toast.innerHTML = `
    <svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" ${isError ? 'style="color: var(--error)"' : ''}>
      ${isError ? `
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      ` : `
        <polyline points="20 6 9 17 4 12"></polyline>
      `}
    </svg>
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);

  // Trigger entry animation
  setTimeout(() => {
    toast.classList.add('show');
  }, 50);

  // Trigger exit animation and remove
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
}

// 8. NEWSLETTER SUBSCRIBE
window.subscribeNewsletter = function (e) {
  if (e) e.preventDefault();
  const emailInput = document.getElementById('newsletter-email');
  if (!emailInput) return;

  const email = emailInput.value.trim();
  if (!email) {
    showToast("Por favor ingresa un email válido.", true);
    return;
  }

  showToast("¡Te has suscrito con el 20% OFF!");
  emailInput.value = '';
};

// 9. MOBILE SLIDER MANUAL SCROLL ACTION
window.scrollCategories = function (direction) {
  const slider = document.getElementById('categories-slider-container');
  if (!slider) return;

  const scrollAmount = 300;
  if (direction === 'left') {
    slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  } else {
    slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }
};
