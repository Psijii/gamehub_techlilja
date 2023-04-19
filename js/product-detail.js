const consumerKey = 'ck_5a5ea7532030354dc8d5037202c5800d2de0c04d';
const consumerSecret = 'cs_380586f080fd44dfcc3fbf6590d81f95f56fd7d6';

const apiURL = 'https://www.stress.techlilja.io/wp-json/wc/v3';

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
fetch(apiURL + '/products/' + productId, {
	headers: {
		Authorization: 'Basic ' + btoa(consumerKey + ':' + consumerSecret),
		'Content-Type': 'application/json'
	}
})
	.then(response => response.json())
	.then(product => {
		const productImage = document.getElementById('product-image');
		productImage.innerHTML = `<img src="${product.images[0].src}" alt="${product.name}">`;

		const productName = document.getElementById('product-name');
		productName.innerHTML = product.name;

		const productPrice = document.getElementById('product-price');
		if (product.on_sale) {
			productPrice.innerHTML = `<del>€${product.regular_price}</del> €${product.sale_price}`;
		} else {
			productPrice.innerHTML = `€${product.price}`;
		}
		const productGallery = document.getElementById('product-gallery');
		product.gallery_images.forEach(image => {
			const img = document.createElement('img');
			img.src = image.src;
			img.alt = image.name;
			productGallery.appendChild(img);
		});

		const productDescription = document.getElementById('product-description');
		productDescription.innerHTML = product.description;})
