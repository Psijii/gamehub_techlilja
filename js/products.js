const consumerKey = 'ck_2176461e904a2133ac4db8120fb54b1ca8015820';
const consumerSecret = 'cs_16bfe223bd6dd94e96e0d31aa62834fa0e21948f';

const apiURL = 'https://canor.techlilja.io/wp-json/wc/v3';

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

function showProductDetails(product) {
  const modal = document.createElement('div');
  modal.id = 'product-details-modal';
  modal.classList.add('modal');

  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');

  const closeBtn = document.createElement('span');
  closeBtn.classList.add('close');
  closeBtn.textContent = '[Close]';
  closeBtn.onclick = () => {
    modal.style.display = 'none';
  };
  modalContent.appendChild(closeBtn);

  const title = document.createElement('h2');
  title.textContent = product.name;
  modalContent.appendChild(title);

  const img = document.createElement('img');
  img.src = product.images[0].src;
  img.alt = product.name;
  img.width = 200;
  modalContent.appendChild(img);

  const description = document.createElement('p');
  description.innerHTML = product.description;
  modalContent.appendChild(description);

  modal.appendChild(modalContent);
  document.body.appendChild(modal);

  modal.style.display = 'block';

  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  };
}


function displayProducts(products) {
  products.forEach(product => {
    const li = document.createElement('li');
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');

    const img = document.createElement('img');
    img.src = product.images[0].src;
    img.alt = product.name;
    img.width = 200;
    img.height = 200;

    img.addEventListener('click', () => {
      showProductDetails(product);
    });

    productDiv.appendChild(img);

    const name = document.createElement('h2');
    name.textContent = product.name;
    productDiv.appendChild(name);

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

    li.appendChild(productDiv);
    productList.appendChild(li);
  });
}


categorySelect.addEventListener('change', getProducts);


getProducts();

function addToCart(productId) {
  let cart = localStorage.getItem('cart');

  if (cart) {
    cart = JSON.parse(cart);
  } else {
    cart = [];
  }

  const existingProduct = cart.find(item => item.id === productId);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ id: productId, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  showConfirmationModal();
}

function showConfirmationModal() {
  const modal = document.getElementById('confirmation-modal');
  modal.style.display = 'block';

  const closeModalButton = document.getElementById('close-modal');
  closeModalButton.onclick = function () {
    modal.style.display = 'none';
  };

  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  };
}



