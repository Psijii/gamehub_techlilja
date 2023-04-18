document.addEventListener("DOMContentLoaded", function () {
  displayCart();
});

function displayProducts(products) {
  products.forEach((product) => {
    const li = document.createElement("li");
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");

    const img = document.createElement("img");
    img.src = product.images[0].src;
    img.alt = product.name;
    img.width = 200;
    img.height = 200;
    productDiv.appendChild(img);

    const name = document.createElement("h2");
    name.textContent = product.name;
    productDiv.appendChild(name);

    const price = document.createElement("span");
    price.classList.add("price");
    if (product.on_sale) {
      const regularPrice = document.createElement("del");
      regularPrice.textContent = "€" + product.regular_price;
      price.appendChild(regularPrice);
      price.innerHTML += " €" + product.sale_price;
    } else {
      price.textContent = "€" + product.price;
    }
    productDiv.appendChild(price);

    const quantityContainer = document.createElement("div");

    const minusButton = document.createElement("button");
    minusButton.textContent = "-";
    minusButton.addEventListener("click", () => {
      updateQuantityInput(quantityInput, -1);
    });
    quantityContainer.appendChild(minusButton);

    const quantityInput = document.createElement("input");
    quantityInput.type = "number";
    quantityInput.value = 1;
    quantityInput.min = 1;
    quantityInput.style.width = "50px";
    quantityContainer.appendChild(quantityInput);

    const plusButton = document.createElement("button");
    plusButton.textContent = "+";
    plusButton.addEventListener("click", () => {
      updateQuantityInput(quantityInput, 1);
    });
    quantityContainer.appendChild(plusButton);

    productDiv.appendChild(quantityContainer);

    const button = document.createElement("button");
    button.textContent = "Add to Cart";
    button.addEventListener("click", () => {
      addToCart(product, parseInt(quantityInput.value));
    });
    productDiv.appendChild(button);

    li.appendChild(productDiv);
    productList.appendChild(li);
  });
}

function updateQuantityInput(input, delta) {
  const currentValue = parseInt(input.value);
  const newValue = currentValue + delta;

  if (newValue >= 1) {
    input.value = newValue;
  }
}

function addToCart(product, quantity) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingProduct = cart.find((item) => item.id === product.id);

  if (existingProduct) {
    existingProduct.quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      image: product.images[0].src,
      price: product.price,
      quantity: quantity,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}



function addToCart(productId, quantity) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const existingProduct = cart.find((item) => item.id === productId);

  if (existingProduct) {
    existingProduct.quantity += quantity;
  } else {
    cart.push({ id: productId, quantity });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCart();
}

function updateCartQuantity(productId, newQuantity) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const productIndex = cart.findIndex((item) => item.id === productId);

  if (productIndex > -1) {
    cart[productIndex].quantity = newQuantity;
    if (cart[productIndex].quantity <= 0) {
      cart.splice(productIndex, 1);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
  }
}


function fetchProduct(productId) {
  return fetch(apiURL + "/products/" + productId, {
    headers: {
      Authorization: "Basic " + btoa(consumerKey + ":" + consumerSecret),
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
}




function updateCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartContainer = document.getElementById('cart');

  cartContainer.innerHTML = '';

  const table = document.createElement('table');
  table.setAttribute('border', '1');

  cart.forEach((item) => {
    const row = document.createElement('tr');

    const imgCell = document.createElement('td');
    const img = document.createElement('img');
    img.src = item.image;
    img.alt = item.name;
    img.width = 100;
    img.height = 100;
    imgCell.appendChild(img);
    row.appendChild(imgCell);

    const nameCell = document.createElement('td');
    nameCell.textContent = item.name;
    row.appendChild(nameCell);

    const minusCell = document.createElement('td');
    const minusButton = document.createElement('button');
    minusButton.textContent = '-';
    minusButton.setAttribute('data-product-id', item.id);
    minusButton.addEventListener('click', decreaseQuantity);
    minusCell.appendChild(minusButton);
    row.appendChild(minusCell);

    const quantityCell = document.createElement('td');
    const quantityInput = document.createElement('input');
    quantityInput.type = 'number';
    quantityInput.min = 1;
    quantityInput.value = item.quantity;
    quantityInput.setAttribute('data-product-id', item.id);
    quantityInput.addEventListener('change', updateQuantity);
    quantityCell.appendChild(quantityInput);
    row.appendChild(quantityCell);

    const plusCell = document.createElement('td');
    const plusButton = document.createElement('button');
    plusButton.textContent = '+';
    plusButton.setAttribute('data-product-id', item.id);
    plusButton.addEventListener('click', increaseQuantity);
    plusCell.appendChild(plusButton);
    row.appendChild(plusCell);

    table.appendChild(row);
  });

  cartContainer.appendChild(table);
}


function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter((item) => item.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

function decreaseQuantity(event) {
  const productId = parseInt(event.target.getAttribute('data-product-id'));
  updateProductQuantity(productId, -1);
}

function increaseQuantity(event) {
  const productId = parseInt(event.target.getAttribute('data-product-id'));
  updateProductQuantity(productId, 1);
}

function updateQuantity(event) {
  const productId = parseInt(event.target.getAttribute('data-product-id'));
  const newQuantity = parseInt(event.target.value);
  updateProductQuantity(productId, newQuantity, true);
}

function updateProductQuantity(productId, delta, absolute = false) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const productIndex = cart.findIndex((item) => item.id === productId);

  if (productIndex > -1) {
    if (absolute) {
      cart[productIndex].quantity = delta;
    } else {
      cart[productIndex].quantity += delta;
    }

    if (cart[productIndex].quantity <= 0) {
      cart.splice(productIndex, 1);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
  }
}
updateCart();