
const products = [
  {
    id: 1,
    name: "Dresses",
    price: 20.00,
    image: "https://cdn.shopify.com/s/files/1/0589/1322/6961/files/Heavy_Cotton_Pakistani_Salwar_Kameez_Cream_Embroidered_With_Imported_Silk_Chex_Dupatta-1_480x480.jpg?v=1724419486"
  },
  {
    id: 2,
    name: "Running Shoes",
    price: 50.00,
    image: "https://onedegree.com.pk/cdn/shop/files/11_4b2e8b7b-fe96-40c2-97eb-9de23fbb85d6.jpg?v=1710317050"
  },
  {
    id: 3,
    name: "Denim Jeans",
    price: 45.00,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500"
  },
  {
    id: 4,
    name: "Ladies watch",
    price: 85.00,
    image: "https://img.magnific.com/premium-photo/gold-watch-with-rhinestones_125367-21.jpg?semt=ais_hybrid&w=740&q=80"
  },
  {
    id: 5,
    name: "Wireless Headphones",
    price: 60.00,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
  },
  {
    id: 6,
    name: "Handbages",
    price: 35.00,
    image: "https://plus.unsplash.com/premium_photo-1723826753083-2309f7203ab1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
];

let cart = [];

const productGrid = document.getElementById("product-grid");
const cartItemsContainer = document.getElementById("cart-items-container");
const cartCount = document.getElementById("cart-count");
const cartSubtotal = document.getElementById("cart-subtotal");
const cartTotal = document.getElementById("cart-total");

// Render Product List
function renderProducts() {
  productGrid.innerHTML = products.map(product => `
    <div class="product-card">
      <img src="${product.image}" alt="${product.name}" />
      <div class="product-info">
        <div>
          <div class="product-title">${product.name}</div>           <div class="product-price">$${product.price.toFixed(2)}</div>
        </div>
        <button class="btn-add"  onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    </div>
  `).join('');
}

// Add Item 
function addToCart(productId) {
  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    const product = products.find(p => p.id === productId);
    cart.push({ ...product, quantity: 1 });
  }

  updateCartUI();
}

// Change Quantity 
function changeQuantity(productId, delta) {
  const item = cart.find(item => item.id === productId);

  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) {
      removeFromCart(productId);
      return;
    }
  }

  updateCartUI();
}

// Remove Item 
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCartUI();
}

// Update 
function updateCartUI() {
  renderCartItems();
  updateTotals();
}

// Render Cart 
function renderCartItems() {
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `<p class="empty-cart-msg"> Cart is empty...</p>`;
    return;
  }

  const tableHTML = `
    <table class="cart-table">
      <thead>
        <tr>
          <th>Product</th>
          <th>Price</th>
          <th>Qty</th>
          <th>Subtotal</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        ${cart.map(item => `
          <tr>
            <td>${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>
              <div class="qty-controls">
                <button class="qty-btn" onclick="changeQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button class="qty-btn" onclick="changeQuantity(${item.id}, 1)">+</button>
              </div>
            </td>
            <td>$${(item.price * item.quantity).toFixed(2)}</td>
            <td>
              <button class="btn-remove" onclick="removeFromCart(${item.id})">Remove</button>
         </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;

  cartItemsContainer.innerHTML = tableHTML;
}

// Calculate and Update 
function updateTotals() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  cartCount.textContent = totalItems;
  cartSubtotal.textContent = `$${totalAmount.toFixed(2)}`;
  cartTotal.textContent = `$${totalAmount.toFixed(2)}`;
}
renderProducts();
updateCartUI();