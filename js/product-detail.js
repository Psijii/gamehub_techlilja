const consumerKey = 'ck_2176461e904a2133ac4db8120fb54b1ca8015820';
const consumerSecret = 'cs_16bfe223bd6dd94e96e0d31aa62834fa0e21948f';

const apiURL = 'https://canor.techlilja.io/wp-json/wc/v3';

const productDetail = document.getElementById('product-detail');

function getProductById(id) {
  fetch(apiURL + '/products/' + id, {
    headers: {
      Authorization: 'Basic ' + btoa(consumerKey + ':' + consumerSecret),
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => {
      displayProductDetail(data);
    })
    .catch(error => console.error(error));
}

function displayProductDetail(product) {
  const productDiv = document.createElement('div');
  productDiv.classList.add('product');

  const img = document.createElement('img');
  img.src = product.images[0].src;
  img.alt = product.name;
  img.width = 200;
  img.height = 200;
  productDiv.appendChild(img);

  const name = document.createElement('h2');
  name.textContent = product.name;
  productDiv.appendChild(name);

  const description = document.createElement('p');
  description.innerHTML = product.description;
  productDiv.appendChild(description);

  const price = document.createElement('span');
  price.classList.add('price');
  if (product.on_sale) {
    const regularPrice = document.createElement('del');
    regularPrice.textContent = '€' + product.regular_price;
    price.appendChild(regularPrice);
    price.innerHTML += ' €' + product.sale_price;
  } else {
    price.textContent = '€' + product.price;
  }
  productDiv.appendChild(price);

  const button = document.createElement('button');
  button.textContent = 'Add to Cart';
  button.addEventListener('click', () => {
    addToCart(product.id);
  });
  productDiv.appendChild(button);

  productDetail.appendChild(productDiv);
}

function addToCart(productId) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  const existingProductIndex = cart.findIndex(item => item.id === productId);

  if (existingProductIndex >= 0) {
    cart[existingProductIndex].quantity += 1;
  } else {
    cart.push({ id: productId, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  alert('Product added to cart!');
}

function getProductIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('id');
}

const productId = getProductIdFromUrl();
if (productId) {
  getProductById(productId);
}
