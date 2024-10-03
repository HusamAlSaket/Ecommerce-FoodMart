fetch('../pages/dataPro.json')
  .then(response => response.json())
  .then(data => {
    const products = data.products;  // Access the products array



    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoritesCounter = document.getElementById('favorites-counter');  // Counter element
    const favoritesList = document.getElementById('fav-list');  // Favorites list element

    var categoryName = "breadsAndSweets";
    products.forEach((product, index) => {


      if(categoryName != product.category){
        categoryName = product.category;
        console.log(categoryName);
        document.getElementById('card_trending').innerHTML += `
         <div class="col">
                      <div class="product-item">
                        <a id="fav-btn-${index + 1}" href="#" class=" btn-wishlist"><svg width="24" height="24"><use xlink:href="#heart"></use></svg></a>
                        <figure>
                          <a href="index.html" title="Product Title">
                            <img id="product-img-${index + 1}" src="${product.image_url}"  class="tab-image">
                          </a>
                        </figure>
                        <h3 id="product-name-${index + 1}"></h3>
                        <span class="qty">1 Unit</span><span class="rating"><svg width="24" height="24" class="text-primary"><use xlink:href="#star-solid"></use></svg> 4.5</span>
                        <span id="product-price-${index + 1}" class="price">${product.price.toFixed(2)+ " $"}</span>
                        <div  class="d-flex align-items-center justify-content-between">
                          <div class="input-group product-qty">
                              <span class="input-group-btn">
                                  <button type="button" class="quantity-left-minus btn btn-danger btn-number" data-type="minus">
                                    <svg width="16" height="16"><use xlink:href="#minus"></use></svg>
                                  </button>
                              </span>
                              <input type="text" id="quantity" name="quantity" class="form-control input-number" value="1">
                              <span class="input-group-btn">
                                  <button type="button" class="quantity-right-plus btn btn-success btn-number" data-type="plus">
                                      <svg width="16" height="16"><use xlink:href="#plus"></use></svg>
                                  </button>
                              </span>
                          </div>
                          <a href="#" class="nav-link">Add to Cart <iconify-icon icon="uil:shopping-cart"></a>
                        </div>
                      </div>
                    </div>`;
      const imgElement = document.getElementById(`product-img-${index + 1}`);
      const productPrice =document.getElementById(`product-price-${index + 1}`)
      const productName =document.getElementById(`product-name-${index + 1}`)
      const favButton = document.getElementById(`fav-btn-${index + 1}`);     

      
        imgElement.src = product.image_url;
        productPrice.textContent = product.price.toFixed(2)+ " $";
        productName.textContent = product.name;

        imgElement.style.width = "240px";
        imgElement.style.height = "188px";
        imgElement.style.objectFit = "fill";
        imgElement.classList.add("rounded-3")

        
// navigate to fruit page --------------------------------------
const fruitLinks = document.getElementsByClassName("fruit-btn");

for (let i = 0; i < fruitLinks.length; i++) {
    fruitLinks[i].addEventListener('click', (event) => {
      event.preventDefault();  // Prevents the default action (navigation)
      window.location.href = 'fruits.html';  // Navigate to fruits.html
    });
  }

// ---------------------------------------------------------------






// Navigate to the product details page with the product ID in the URL

imgElement.addEventListener('click', (event) => {
    event.preventDefault();  
    window.location.href = `product.html?id=${product.id}`;
  });

//-------------------------------------------------------------



  favButton.addEventListener('click', (event) => {
    event.preventDefault();
    // favButton.style.backgroundColor ="orange";
    addToFavorites(product,favButton);
    
  });



  favoritesList.addEventListener('click', (event) => {
    event.preventDefault();
    displayFavorites();

    window.location.href = 'fav.html';

  });









//-----------------------------------------------------------------


      
  }});

    
  })
  .catch(error => console.error('Error fetching JSON:', error));


 


// product details page -----------------------------------------

// Get the product ID from the URL
const urlParams_3 = new URLSearchParams(window.location.search);
const productId_3 = urlParams_3.get('id');  // Get the product ID from the URL

fetch('../pages/dataPro.json')
  .then(response => response.json())
  .then(data => {
    const products = data.products;
    const product = products.find(p => p.id == productId_3);  // Find the product by ID

    if (product) {
      // Inject product details using innerHTML on the product.html page
      document.getElementById('product-details-container').innerHTML = `
        <h1>${product.name}</h1>
        <img src="${product.image_url}" alt="Product Image">
        <p>Price: $${product.price.toFixed(2)}</p>
        <p>Description: ${product.description}</p>
      `;
    } else {
      document.getElementById('product-details-container').innerHTML = `
        <p>Product not found.</p>
      `;
    }
  })
  .catch(error => console.error('Error fetching product data:', error));






// ---------------------------------------------------------------------------------


// -------------------------------------------------------------------------------



// fruits page ---------------------------


  fetch('../pages/dataPro.json')
  .then(response => response.json())
  .then(data => {
    const fruits = data.products.filter(product => product.category === 'Fruits'); // Filter for fruits
    console.log(fruits);  // Log the filtered fruits

    // Assuming you have a container to render the fruits
    const fruitsContainer = document.getElementById('fruits-container');

    // Clear the container before rendering
    fruitsContainer.innerHTML = '';

    // Render each fruit in the container
    fruits.forEach(fruit => {
      const fruitElement = document.createElement('div');  // Create a new div for each fruit
      fruitElement.className = 'fruit-item';  // Add a class for styling

      // Create image and name elements
      const imgElement = document.createElement('img');
      imgElement.src = fruit.image_url;  // Set the image URL
      imgElement.alt = fruit.name;  // Set the alt text

      const nameElement = document.createElement('p');
      nameElement.textContent = fruit.name;  // Set the fruit name

      // Append image and name to the fruit element
      fruitElement.appendChild(imgElement);
      fruitElement.appendChild(nameElement);

      // Append the fruit element to the container
      fruitsContainer.appendChild(fruitElement);
    });
  })
  .catch(error => console.error('Error fetching JSON:', error));


// Add to favorites function ----------------------------------------------


function addToFavorites(product, favButton) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoritesCounter = document.getElementById('favorites-counter');
  
    // Check if the product is already in favorites
    const existingIndex = favorites.findIndex(fav => fav.id === product.id);
  
    if (existingIndex === -1) {
      // Product is not in favorites, add it
      favorites.push(product);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      favButton.classList.add("text-white");
      favButton.style.backgroundColor = 'red'; // Set background color to orange when added
    } else {
      // Product is already in favorites, remove it
      favorites.splice(existingIndex, 1);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      favButton.style.backgroundColor = ''; // Set background color back to white when removed
      favButton.classList.remove("text-white");
    }
  
    // Update the favorites counter
    favoritesCounter.textContent = favorites.length;
  }
  





  // Display favorites on the fav.html page
function displayFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoritesContainer = document.getElementById('favorites-container');
  
    // Check if favoritesContainer exists
    if (!favoritesContainer) {
      console.error('Favorites container element not found!');
      return;
    }
  
    // If no favorites, show a message
    if (favorites.length === 0) {
      favoritesContainer.innerHTML = '<p class="no-favorites">No favorite items added yet.</p>';
      return;
    }
  
    // Clear the container to avoid duplicate items
    favoritesContainer.innerHTML = '';
  
    // Add each favorite item to the page
    favorites.forEach(fav => {
      const favItem = document.createElement('div');
      favItem.classList.add('fav-item');
  
      // Create image element
      const imgElement = document.createElement('img');
      imgElement.src = fav.image_url;
      imgElement.alt = fav.name;
      imgElement.classList.add('favorite-img'); // Optional: Add class for styling
  
      // Create name and price details
      const detailsElement = document.createElement('div');
      detailsElement.classList.add('favorite-details'); // Optional: Add class for styling
  
      const nameElement = document.createElement('h3');
      nameElement.textContent = fav.name;
      
      const priceElement = document.createElement('p');
      priceElement.textContent = `Price: $${fav.price.toFixed(2)}`;
  
      // Append name and price to the details container
      detailsElement.appendChild(nameElement);
      detailsElement.appendChild(priceElement);
  
      // Append the image and details to the favorite item container
      favItem.appendChild(imgElement);
      favItem.appendChild(detailsElement);
  
      // Append the favorite item to the main container
      favoritesContainer.appendChild(favItem);
    });
  }
  
  // Ensure displayFavorites is called on page load for fav.html
  if (window.location.pathname.includes('fav.html')) {
    window.onload = displayFavorites;
  }
  



