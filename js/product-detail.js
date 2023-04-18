let productId = new URLSearchParams(window.location.search).get("id");

		// Call your API to get the product data with the given id
		fetch(`https://canor.techlilja.io/wp-json/wc/v3/products/${productId}?consumer_key=ck_2176461e904a2133ac4db8120fb54b1ca8015820&consumer_secret=cs_16bfe223bd6dd94e96e0d31aa62834fa0e21948f`)
			.then(response => response.json())
			.then(product => {
				// Add the product data to the table
				let table = document.createElement("table");

				// Add the product image
				let imageRow = document.createElement("tr");
				let imageCell = document.createElement("td");
				let image = document.createElement("img");
				image.src = product.images[0].src;
				image.alt = product.images[0].alt;
				imageCell.appendChild(image);
				imageRow.appendChild(imageCell);
				table.appendChild(imageRow);

				// Add the product name
				let nameRow = document.createElement("tr");
				let nameCell = document.createElement("td");
				nameCell.textContent = product.name;
				nameRow.appendChild(nameCell);
				table.appendChild(nameRow);

				// Add the product price
				let priceRow = document.createElement("tr");
				let priceCell = document.createElement("td");
				priceCell.textContent = "Price: $" + product.price;
				priceRow.appendChild(priceCell);
				table.appendChild(priceRow);

				// Add the product description
				let descriptionRow = document.createElement("tr");
				let descriptionCell = document.createElement("td");
				descriptionCell.innerHTML = product.description;
				descriptionRow.appendChild(descriptionCell);
				table.appendChild(descriptionRow);

				// Add the table to the product element
				document.getElementById("product").appendChild(table);
			})
			.catch(error => console.log(error));