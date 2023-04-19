const consumerKey = 'ck_5a5ea7532030354dc8d5037202c5800d2de0c04d';
const consumerSecret = 'cs_380586f080fd44dfcc3fbf6590d81f95f56fd7d6';
const apiURL = 'https://www.stress.techlilja.io/wp-json/wc/v3';

// Retrieve featured products
fetch(`${apiURL}/products?featured=true&currency=EUR`, {
  method: 'GET',
  headers: {
    'Authorization': `Basic ${btoa(`${consumerKey}:${consumerSecret}`)}`,
    'Content-Type': 'application/json',
  },
})
.then(response => response.json())
.then(products => {
  // Display products on front page
  const container = document.getElementById('featured-products');
  products.forEach(product => {
    const imgSrc = product.images[0].src;
    const imgWidth = Math.min(product.images[0].width, 200);
    const price = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR' }).format(product.price);
    const html = `
      <div class="featured-product"><a href="product.html">
        <img src="${imgSrc}" alt="${product.name}" width="${imgWidth}">
        <h3>${product.name}</h3></a>
      </div>
    `;
    container.insertAdjacentHTML('beforeend', html);
  });
})
.catch(error => console.error(error));
