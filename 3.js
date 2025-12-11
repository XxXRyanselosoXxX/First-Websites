const products = [
  {id:1,name:"Product 1",price:10,img:"coc.jpeg"},
  {id:2,name:"Product 2",price:20,img:"shirt.jpg"},
  {id:3,name:"Product 3",price:15,img:"shoes.jpg"}
];

// DOM Elements
const productList = document.getElementById('product-list');
const cartItems = document.getElementById('cart-items');
const totalEl = document.getElementById('total');
const cartCount = document.getElementById('cart-count');
const clearCartBtn = document.getElementById('clear-cart');
const checkoutBtn = document.getElementById('checkout-btn');
const checkoutSection = document.getElementById('checkout-section');
const checkoutForm = document.getElementById('checkout-form');
const gcashPaymentDiv = document.getElementById('gcash-payment');
const ordersList = document.getElementById('orders-list');
const ordersDisplay = document.getElementById('orders-display');
const adminBtn = document.getElementById('admin-btn');

let cart = [];
let orders = [];
let isAdmin = false;

// Render products
function renderProducts() {
  productList.innerHTML = "";
  products.forEach(p=>{
    const div = document.createElement('div');
    div.classList.add('product-card');
    div.innerHTML = `
      <img src="${p.img}" alt="${p.name}" style="width:150px;height:150px;">
      <h3>${p.name}</h3>
      <p>$${p.price}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    `;
    productList.appendChild(div);
  });
}

// Cart functions
function addToCart(id) {
  const product = products.find(p=>p.id===id);
  cart.push(product);
  updateCart();
}

function updateCart() {
  cartItems.innerHTML="";
  let total=0;
  cart.forEach((item,index)=>{
    total+=item.price;
    const li = document.createElement('li');
    li.innerHTML=`${item.name} - $${item.price} <button onclick="removeFromCart(${index})">Remove</button>`;
    cartItems.appendChild(li);
  });
  totalEl.textContent = total;
  cartCount.textContent = cart.length;
}

function removeFromCart(index){
  cart.splice(index,1);
  updateCart();
}

clearCartBtn.addEventListener('click',()=>{
  cart=[];
  updateCart();
});

// Checkout button
checkoutBtn.addEventListener('click',()=>{
  if(cart.length===0){ alert("Cart is empty!"); return; }
  checkoutSection.style.display = 'block';
});

// Checkout form submit → show QR code + automatically confirm payment
checkoutForm.addEventListener('submit',function(e){
  e.preventDefault();

  const paymentMethod = document.getElementById('payment-method').value;
  if(paymentMethod !== 'gcash'){ alert("Please select GCash"); return; }

  // Show QR code
  gcashPaymentDiv.style.display = 'block';

  const name = document.getElementById('customer-name').value;
  const email = document.getElementById('customer-email').value;
  const address = document.getElementById('customer-address').value;
  const total = cart.reduce((sum,i)=>sum+i.price,0);

  // Simulate "payment successful" instantly
  alert("Payment successful! Thank you for your purchase.");

  const order = {
    customer: {name,email,address},
    items:[...cart],
    total: total,
    paymentMethod: 'GCash'
  };

  orders.push(order);

  cart=[];
  updateCart();
  checkoutForm.reset();
  checkoutSection.style.display='none';
  gcashPaymentDiv.style.display='none';

  // Admin sees updated orders if logged in
  if(isAdmin) displayOrders();
});

// Display orders (admin only)
function displayOrders(){
  ordersDisplay.style.display='block';
  ordersList.innerHTML="";
  orders.forEach((order,index)=>{
    const tr = document.createElement('tr');
    tr.innerHTML=`
      <td>${index+1}</td>
      <td>${order.customer.name}</td>
      <td>${order.customer.email}</td>
      <td>${order.customer.address}</td>
      <td>${order.items.map(i=>i.name).join(', ')}</td>
      <td>$${order.total}</td>
      <td>${order.paymentMethod}</td>
    `;
    ordersList.appendChild(tr);
  });
}

// Admin login
adminBtn.addEventListener('click',()=>{
  const password = prompt("Enter admin password:");
  if(password==="admin123"){
    isAdmin=true;
    alert("Admin mode enabled. You can now see all orders.");
    displayOrders();
  }else alert("Wrong password!");
});

// Initialize
document.addEventListener('DOMContentLoaded',()=>{
  renderProducts();
  updateCart();
});