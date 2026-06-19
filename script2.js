const products = [
  {
    id:1,
    title:"Wireless Headphone",
    price:1999,
    image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    description:"High quality wireless headphone with amazing sound."
  },

  {
    id:2,
    title:"Smart Watch",
    price:2499,
    image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    description:"Stylish smart watch with fitness tracking."
  },

  {
    id:3,
    title:"Gaming Mouse",
    price:999,
    image:"https://images.unsplash.com/photo-1527814050087-3793815479db",
    description:"RGB gaming mouse for professional gamers."
  },

  {
    id:4,
    title:"Laptop",
    price:45999,
    image:"https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
    description:"Powerful laptop for coding and gaming."
  },

  {
    id:5,
    title:"Bluetooth Speaker",
    price:1499,
    image:"https://images.unsplash.com/photo-1547052178-7f2c5a20c332",
    description:"Portable speaker with deep bass sound."
  },

  {
    id:6,
    title:"Mobile Phone",
    price:18999,
    image:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
    description:"Latest smartphone with excellent camera."
  }
];

const productContainer = document.getElementById("productContainer");

const popup = document.getElementById("popup");

const popupImage = document.getElementById("popupImage");

const popupTitle = document.getElementById("popupTitle");

const popupPrice = document.getElementById("popupPrice");

const popupDesc = document.getElementById("popupDesc");

const closeBtn = document.getElementById("closeBtn");

const addToCartBtn = document.getElementById("addToCartBtn");

const cartItems = document.getElementById("cartItems");

const totalPrice = document.getElementById("totalPrice");

const cartCount = document.getElementById("cartCount");

const searchInput = document.getElementById("searchInput");

let selectedProduct = null;

/* Show Products */

function displayProducts(items){

  productContainer.innerHTML = "";

  items.forEach(product => {

    const card = document.createElement("div");

    card.classList.add("product-card");

    card.innerHTML = `
    
      <img src="${product.image}" alt="">
      
      <div class="product-info">

        <h3>${product.title}</h3>

        <p class="price">₹${product.price}</p>

        <button onclick="showPopup(${product.id})">
          View Details
        </button>

      </div>
    `;

    productContainer.appendChild(card);

  });

}

displayProducts(products);

/* Popup */

function showPopup(id){

  selectedProduct = products.find(p => p.id === id);

  popup.style.display = "flex";

  popupImage.src = selectedProduct.image;

  popupTitle.innerText = selectedProduct.title;

  popupPrice.innerText = "Price: ₹" + selectedProduct.price;

  popupDesc.innerText = selectedProduct.description;
}

closeBtn.addEventListener("click", () => {
  popup.style.display = "none";
});

/* Local Storage Cart */

function getCart(){
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart){
  localStorage.setItem("cart", JSON.stringify(cart));
}

/* Add To Cart */

addToCartBtn.addEventListener("click", () => {

  let cart = getCart();

  cart.push(selectedProduct);

  saveCart(cart);

  popup.style.display = "none";

  updateCart();
});

/* Update Cart */

function updateCart(){

  const cart = getCart();

  cartItems.innerHTML = "";

  let total = 0;

  cart.forEach((item,index) => {

    total += item.price;

    const div = document.createElement("div");

    div.classList.add("cart-item");

    div.innerHTML = `
    
      <div>
        <h4>${item.title}</h4>
        <p>₹${item.price}</p>
      </div>

      <button onclick="removeItem(${index})">
        Remove
      </button>
    `;

    cartItems.appendChild(div);

  });

  totalPrice.innerText = "Total: ₹" + total;

  cartCount.innerText = cart.length;
}

updateCart();

/* Remove Item */

function removeItem(index){

  let cart = getCart();

  cart.splice(index,1);

  saveCart(cart);

  updateCart();
}

/* Search Function */

searchInput.addEventListener("keyup", () => {

  const value = searchInput.value.toLowerCase();

  const filtered = products.filter(product =>
    product.title.toLowerCase().includes(value)
  );

  displayProducts(filtered);
});