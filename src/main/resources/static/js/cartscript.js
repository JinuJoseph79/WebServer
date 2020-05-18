let carts = document.querySelectorAll('.add-cart');

let products = [
	{
		name: 'Red bag',
		tag:  'redbag',
		price: 135,
		inCart: 0
	},
	{
		name: 'Blue bag',
		tag:  'bluebag',
		price: 120,
		inCart: 0
	},
	{
		name: 'Black bag',
		tag:  'blackbag',
		price: 130,
		inCart: 0
	},
	{
		name: 'Pink Clutch',
		tag:  'Pinkclutch',
		price: 115,
		inCart: 0
	}
]
for (let i=0; i < carts.length; i++) {
	carts[i].addEventListener ('click', () => {
		cartNumbers(products[i]);
		totalCost(products[i])
	})
}

function onLoadCartNumbers() {
	let productNumbers = localStorage.getItem('cartNumbers');
	if (productNumbers) {
		document.querySelector ('.cart span').textContent = productNumbers;
	}
}

function cartNumbers(product) {
	
	let productNumbers = localStorage.getItem('cartNumbers');
	
	productNumbers = parseInt(productNumbers);
	
	if ( productNumbers) {
		localStorage.setItem('cartNumbers', productNumbers + 1);
		document.querySelector ('.cart span').textContent = productNumbers + 1;
	} else {
		localStorage.setItem('cartNumbers', 1);
		document.querySelector ('.cart span').textContent = 1;
		
	}	
	
	setItems(product);
}

function setItems(product) {
	let cartItems = localStorage.getItem ('productsInCart');
	cartItems = JSON.parse(cartItems);
		
	if ( cartItems != null) {
	
		if(cartItems[product.tag] == undefined ) {
			
			
			cartItems[[product.tag]] = product;
			/*cartItems = {
					...cartItems,
					[product.tag]: product
			}*/
		}
		cartItems[product.tag].inCart += 1;
		
		
	} else {
		
		product.inCart = 1;
		
		cartItems = {
				[product.tag]: product
		}
	}
	
	
	localStorage.setItem("productsInCart", JSON.stringify(cartItems ));
}

function totalCost(product) {
	let cartCost = localStorage.getItem('totalCost');
	
	console.log(cartCost);
	
	if( cartCost != null ) {
		cartCost = parseInt(cartCost);
		console.log(typeof cartCost);
		localStorage.setItem("totalCost",cartCost + product.price );
	} else {
		localStorage.setItem("totalCost", product.price);
	}
}

function displayCart() {
	let cartItems = localStorage.getItem('productsInCart');
	cartItems =JSON.parse(cartItems);
	let productContainer = document.querySelector
	(".products");
	let cartCost = localStorage.getItem('totalCost');
	console.log(cartCost);
	console.log(productContainer);
	if (cartItems && productContainer ) {
		
		productContainer.innerHTML = '';
		Object.values(cartItems).map(item => {
			productContainer.innerHTML += `	
				<div class ="productList">
					<div class ="product">
						<ion-icon name="close-circle-outline" onClick=onCloseClick()></ion-icon>
						<img src="./images/${item.tag}.jpg">
						<span>${item.name}</span>
					</div> 
					<div class ="price" > $${item.price}</div>
					<div class = "quantity">
						<ion-icon class="decrease" 
						name= "arrow-dropleft-circle" onClick=onDecrease()></ion-icon>
						<span>${item.inCart}</span>
						<ion-icon class="increase "
						name= "arrow-dropright-circle" onClick=onIncrease()></ion-icon>
					</div>
					<div class ="total">
							<span>$${item.inCart * item.price},00</span>
					</div>
				</div>
				`;
				
		});
		
		productContainer.innerHTML += `
		 <div class = "basketTotalContainer">
			<h4 class="basketTotalTitle">
				Basket Total :
				</h4>
				<h4 class = "basketTotal">
					$${cartCost},00
				</h4>
		`
	}
	
}

function onCloseClick(){
	let product = document.querySelector('.productList');
	let productTotalCost = document.querySelector ('.productList .total span').textContent;

	let name = document.querySelector ('.product span').textContent ;
	let cartTotal = localStorage.getItem('cartNumbers');
	let cartItems = localStorage.getItem('productsInCart');
	
	cartItems = JSON.parse(cartItems);
	
	Object.keys(cartItems).forEach(function(key) {
	    value = cartItems[key];
	    console.log(value);
	    if(value.name == name) {
	    	console.log(value.name);
	    	localStorage.setItem('cartNumbers', cartTotal - value.inCart );
			document.querySelector ('.cart span').textContent = cartTotal - value.inCart;
	    	delete cartItems[key];
	    }
	   
	});
	
	console.log(cartItems);
	
	localStorage.setItem("productsInCart", JSON.stringify(cartItems ));
	
	productTotalCost = productTotalCost.substr(1, productTotalCost.length -3);
	
    productTotalCost = parseInt(productTotalCost); 
	console.log(productTotalCost);
	
	updateBasketTotalCost(productTotalCost);	
	product.remove();
	
}

function updateBasketTotalCost(productCost) {
		
	let cartCost = localStorage.getItem('totalCost');
	
	cartCost = parseInt(cartCost);
	console.log(productCost);
	console.log(cartCost);
	
	cartCost = cartCost - productCost;
	
	localStorage.setItem("totalCost", cartCost );
	document.querySelector ('.basketTotal').textContent = "$" + cartCost +",00";
}

function onDecrease() {
	let quantity = document.querySelector('.productList .quantity span').textContent;
	let productNumbers = localStorage.getItem('cartNumbers');
	
	let name = document.querySelector ('.product span').textContent ;
	console.log(name);
	quantity= parseInt(quantity);
	
	if(quantity != 0 ) {
		quantity = quantity -1 ;
		
		localStorage.setItem('cartNumbers', productNumbers -1 );
		document.querySelector ('.cart span').textContent = productNumbers - 1;
	}
	

	let cartItems = localStorage.getItem('productsInCart');
	cartItems = JSON.parse(cartItems);
	let productCost;
	let value;
	Object.keys(cartItems).forEach(function(key) {
	    value = cartItems[key];
	    
	    if(value.name == name) {
	    	
	    	value.inCart = quantity;
	    	productCost = value.price;
	    	cartItems[key] = value;
	    }
	   
	});
	
	localStorage.setItem("productsInCart", JSON.stringify(cartItems ));
	
	updateBasketTotalCost(productCost);		
	displayCart() ;	
}

function onIncrease() {
	
	let quantity = document.querySelector('.productList .quantity span').textContent;
	let productNumbers = localStorage.getItem('cartNumbers');
	
	let name = document.querySelector ('.product span').textContent ;
	productNumbers = parseInt(productNumbers);
	quantity= parseInt(quantity);
	
	if(quantity < 20 ) {
		quantity = quantity + 1 ;
		
		localStorage.setItem('cartNumbers', productNumbers + 1 );
		document.querySelector ('.cart span').textContent = productNumbers + 1;
	}
	

	let cartItems = localStorage.getItem('productsInCart');
	cartItems = JSON.parse(cartItems);
	let productCost;
	let value;
	Object.keys(cartItems).forEach(function(key) {
	    value = cartItems[key];
	    
	    if(value.name == name) {
	    	
	    	value.inCart = quantity;
	    	productCost = value.price;
	    	cartItems[key] = value;
	    }
	   
	});
	
	localStorage.setItem("productsInCart", JSON.stringify(cartItems ));
	
	let cartCost = localStorage.getItem('totalCost');
	
	cartCost = parseInt(cartCost);
	
	cartCost = cartCost + productCost;
	
	localStorage.setItem("totalCost", cartCost );
	document.querySelector ('.basketTotal').textContent = "$" + cartCost +",00";

	displayCart() ;	
}


onLoadCartNumbers();

displayCart() ;

