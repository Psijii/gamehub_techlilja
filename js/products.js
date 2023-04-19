const consumerKey = 'ck_5a5ea7532030354dc8d5037202c5800d2de0c04d';
const consumerSecret = 'cs_380586f080fd44dfcc3fbf6590d81f95f56fd7d6';

const apiURL = 'https://www.stress.techlilja.io/wp-json/wc/v3';

const productList = document.getElementById('product-list');
const categorySelect = document.getElementById('category-select');

fetch(apiURL + '/products/categories', {
  headers: {
    Authorization: 'Basic ' + btoa(consumerKey + ':' + consumerSecret),
    'Content-Type': 'application/json'
  }
})
  .then(response => response.json())
  .then(data => {
    const featuredOption = document.createElement('option');
    featuredOption.value = 'featured';
    featuredOption.textContent = 'Featured';
    categorySelect.appendChild(featuredOption);

    data.forEach(category => {
      const option = document.createElement('option');
      option.value = category.id;
      option.textContent = category.name;
      categorySelect.appendChild(option);
    });
  })
  .catch(error => console.error(error));

function getProducts() {
  productList.innerHTML = '';

  let url = apiURL + '/products';

  if (categorySelect.value === 'featured') {
    url += '?featured=true';
  } else if (categorySelect.value) {
    url += '?category=' + categorySelect.value;
  }

  fetch(url, {
    headers: {
      Authorization: 'Basic ' + btoa(consumerKey + ':' + consumerSecret),
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => {
      displayProducts(data);
    })
    .catch(error => console.error(error));
}

function displayProducts(products) {
  products.forEach(product => {
    const li = document.createElement('li');
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');

    const productLink = document.createElement('a');
    productLink.href = `product-detail.html?id=${product.id}`;

    const img = document.createElement('img');
    img.src = product.images[0].src;
    img.alt = product.name;
    img.width = 200;
    productLink.appendChild(img);

    const name = document.createElement('h2');
    name.textContent = product.name;
    productLink.appendChild(name);

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
    productLink.appendChild(price);

    const button = document.createElement('button');
    button.textContent = 'Add to cart';
    button.classList.add('cartbtns');
    button.addEventListener('click', () => {
      addToCart(product.id);
    });
    productLink.appendChild(button);

    productDiv.appendChild(productLink);
    li.appendChild(productDiv);
    productList.appendChild(li);
  });
}


categorySelect.addEventListener('change', getProducts);

getProducts();

function addToCart(productId) {
  const cartURL = 'https://gamehub.techlilja.io/cart.html';
  window.open(cartURL, '_blank');

}
