// Simple interactive JS for FoodieBites

// Mobile toggle for nav
const mobileToggle = document.getElementById('mobile-toggle');
mobileToggle?.addEventListener('click', () => {
  const nav = document.querySelector('.nav');
  nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
});

// Simple counters animation
document.querySelectorAll('.counter span').forEach(span => {
  const target = +span.dataset.target;
  let current = 0;
  const step = Math.ceil(target / 200);
  const id = setInterval(() => {
    current += step;
    if (current >= target) {
      span.innerText = target;
      clearInterval(id);
    } else {
      span.innerText = current;
    }
  }, 10);
});

// FAQ toggle
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const a = btn.nextElementSibling;
    const open = a.style.display === 'block';
    document.querySelectorAll('.faq-a').forEach(x => x.style.display = 'none');
    a.style.display = open ? 'none' : 'block';
  });
});

// Filter menu
function filterMenu(type) {
  const items = document.querySelectorAll('#menuGrid .menu-item');
  items.forEach(it => {
    if (type === 'all' || it.dataset.type === type) {
      it.style.display = '';
    } else {
      it.style.display = 'none';
    }
  });
}

// Search
document.getElementById('searchBtn')?.addEventListener('click', () => {
  const q = document.getElementById('searchInput').value.toLowerCase().trim();
  if (!q) return filterMenu('all');
  document.querySelectorAll('#menuGrid .menu-item').forEach(it => {
    const name = it.querySelector('h3').innerText.toLowerCase();
    it.style.display = name.includes(q) ? '' : 'none';
  });
});

// Cart logic (simple, in-memory)
let cart = [];

function updateCartCount() {
  document.getElementById('cart-count').innerText = cart.reduce((s, i) => s + i.qty, 0);
}

function addToCart(name, price) {
  const existing = cart.find(i => i.name === name);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name, price: +price, qty: 1 });
  }
  updateCartCount();
}

Attach add-to-cart buttons
document.querySelectorAll('button[data-name]').forEach(btn => {
  btn.addEventListener('click', () => {
    const name = btn.dataset.name;
    const price = btn.dataset.price;
    addToCart(name, price);
    showCartModal();
  });
});

// Cart modal
let cartModal;

function showCartModal() {
  if (!cartModal) {
    cartModal = document.createElement('div');
    cartModal.id = 'cartModal';
    document.body.appendChild(cartModal);
  }

  cartModal.innerHTML = '';
  const h = document.createElement('h4');
  h.innerText = 'Your Cart';
  cartModal.appendChild(h);

  if (cart.length === 0) {
    const e = document.createElement('div');
    e.className = 'cart-empty';
    e.innerText = 'Cart is empty';
    cartModal.appendChild(e);
    return;
  }

  cart.forEach(it => {
    const row = document.createElement('div');
    row.className = 'cart-item';
    row.innerHTML = `<div>${it.name} x${it.qty}</div><div>Rs. ${it.price * it.qty}</div>`;
    cartModal.appendChild(row);
  });

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const foot = document.createElement('div');
  foot.style.marginTop = '8px';
  foot.innerHTML = `<strong>Total: Rs. ${total}</strong> <button class="btn" id="checkoutBtn">Checkout</button>`;
  cartModal.appendChild(foot);

  document.getElementById('checkoutBtn')?.addEventListener('click', () => {
    alert('Checkout not implemented in demo.');
  });
}

document.getElementById('open-cart')?.addEventListener('click', showCartModal);

// Booking form handler
document.getElementById('bookingForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('bname').value.trim();
  const email = document.getElementById('bemail').value.trim();
  const item = document.getElementById('bitem').value.trim();
  const qty = document.getElementById('bqty').value;

  if (!name || !email || !item || !qty) {
    return alert('Please fill all required fields');
  }

  const toast = document.createElement('div');
  toast.className = 'toast fade-in';
  toast.innerText = `Thanks ${name}! Your booking for ${qty} x ${item} received.`;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);

  document.getElementById('bookingForm').reset();
});

// Subscribe
document.getElementById('subForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('subEmail').value.trim();
  if (!email) return alert('Please enter your email');
  alert('Thanks! Subscribed: ' + email);
  document.getElementById('subForm').reset();
});

// Initial render of offers (example of dynamic addition)
(function renderOffers() {
  const offers = [
    // { name: 'Thali Combo', desc: 'Veg thali with 4 dishes', price: 299, old: 399 },
    // { name: 'Schezwan Noodles', desc: 'Spicy noodles', price: 169, old: 220 }
  ];

  const grid = document.getElementById('offersGrid');

  offers.forEach(o => {
    const card = document.createElement('div');
    card.className = 'offer-card';
    card.innerHTML = `
      <h3>${o.name}</h3>
      <p>${o.desc}</p>
      <div class="price">Rs. ${o.price} <span class="old">Rs. ${o.old}</span></div>
      <button class="btn" data-name="${o.name}" data-price="${o.price}">Add to Cart</button>
    `;
    grid.appendChild(card);
  });

  // Re-attach add-to-cart listeners
  // document.querySelectorAll('button[data-name]').forEach(btn => {
  //   if (!btn.dataset.listener) {
  //     btn.dataset.listener = true;
  //     btn.addEventListener('click', () => {
  //       addToCart(btn.dataset.name, btn.dataset.price);
  //       showCartModal();
  //     });
  //   }
  // });
})();

// small accessibility: focus outlines
document.addEventListener('keydown', e => {
  if (e.key === 'Tab') {
    document.body.classList.add('show-focus');
  }
});

/* End of script.js */
