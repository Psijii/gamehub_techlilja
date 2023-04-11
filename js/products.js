const consumerKey = 'ck_2176461e904a2133ac4db8120fb54b1ca8015820';
const consumerSecret = 'cs_16bfe223bd6dd94e96e0d31aa62834fa0e21948f';

const apiURL = 'https://canor.techlilja.io/wp-json/wc/v3';

const productList = document.getElementById('product-list');
const categorySelect = document.getElementById('category-select');

// Retrieve the list of categories from the API and populate the category select element
fetch(apiURL + '/products/categories', {
  headers: {
    Authorization: 'Basic ' + btoa(consumerKey + ':' + consumerSecret),
    'Content-Type': 'application/json'
  }
})
  .then(response => response.json())
  .then(data => {
    // Add an option for featured products
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
      displayProducts(data, categorySelect.value === 'featured');
    })
    .catch(error => console.error(error));
}

function displayProducts(products, isFeatured = false) {
  products.forEach(product => {
    const li = document.createElement('li');

    // Create a div to hold the product image and details
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');
    if (isFeatured) {
      productDiv.classList.add('featured');
    }

    // Add the "FEATURED" label for featured products
    if (isFeatured) {
      const featuredLabel = document.createElement('div');
      featuredLabel.classList.add('featured-label');
      featuredLabel.textContent = 'FEATURED';
      productDiv.appendChild(featuredLabel);
    }


    // Add the product image to the product div
    const img = document.createElement('img');
    img.src = product.images[0].src;
    img.alt = product.name;
    img.width = 200;
    img.height = 200;
    productDiv.appendChild(img);

    // Add the product name to the product div
    const name = document.createElement('h2');
    name.textContent = product.name;
    productDiv.appendChild(name);

    // Add the product price to the product div
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

    // Add an "Add to Cart" button to the product div
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

function getFeaturedProducts() {
  fetch(apiURL + '/products?featured=true', {
    headers: {
      Authorization: 'Basic ' + btoa(consumerKey + ':' + consumerSecret),
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => {
      displayProducts(data, true);
    })
    .catch(error => console.error(error));
}

function getProducts() {
  let url = apiURL + '/products';

  if (categorySelect.value) {
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
    productList.innerHTML = '';
    displayProducts(data);
    getFeaturedProducts();
  })
  .catch(error => console.error(error));
}

// Add event listener to the category select element to filter the products by category
categorySelect.addEventListener('change', getProducts);

// Call the getProducts function to display all products initially
getProducts();

function addToCart(productId) {
const cartURL = 'https://gamehub.techlilja.io/cart.html';
window.open(cartURL, '_blank');
}
