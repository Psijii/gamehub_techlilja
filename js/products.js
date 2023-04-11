const apiURL = 'https://canor.techlilja.io/wp-json/wc/v3/products';
const consumerKey = 'ck_2176461e904a2133ac4db8120fb54b1ca8015820';
const consumerSecret = 'cs_16bfe223bd6dd94e96e0d31aa62834fa0e21948f';

fetch(apiURL, {
  headers: {
    Authorization: 'Basic ' + btoa(consumerKey + ':' + consumerSecret),
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => {
  const productList = document.getElementById('product-list');
  data.forEach(product => {
    const li = document.createElement('li');
    li.textContent = product.name;
    productList.appendChild(li);
  });
})
.catch(error => console.error(error));
