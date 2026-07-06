/* ==========================================================
                RETAIL ASTRA PRODUCTS PAGE
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    fetchProducts();

    initializeSearch();

    initializeCategoryFilter();

});

/* ==========================================================
                    PRODUCT SEARCH
========================================================== */

function initializeSearch() {

    const searchInput = document.getElementById("searchInput");

    const products = document.querySelectorAll(".product-card");

    if (!searchInput) return;

    searchInput.addEventListener("keyup", function () {

        const keyword = this.value.toLowerCase();

        products.forEach(product => {

            const text = product.innerText.toLowerCase();

            if (text.includes(keyword)) {

                product.style.display = "block";

            }

            else {

                product.style.display = "none";

            }

        });

    });

}


/* ==========================================================
                  CATEGORY FILTER
========================================================== */

function initializeCategoryFilter() {

    const buttons = document.querySelectorAll(".category-btn");

    const products = document.querySelectorAll(".product-card");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            buttons.forEach(btn => btn.classList.remove("active"));

            button.classList.add("active");

            const category = button.dataset.category;

            products.forEach(product => {

                if (category === "all") {

                    product.style.display = "block";

                }

                else {

                    if (product.dataset.category === category) {

                        product.style.display = "block";

                    }

                    else {

                        product.style.display = "none";

                    }

                }

            });

        });

    });

}


/* ==========================================================
                 VIEW DETAILS BUTTON
========================================================== */

function initializeProductButtons() {

    const buttons = document.querySelectorAll(".view-btn");

    buttons.forEach(button => {

        button.addEventListener("click", function () {

            const card = this.closest(".product-item");

            const name = card.querySelector("h5").innerText;

            const category = card.querySelector("p").innerText;

            const price = card.querySelector("h4").innerText;

            alert(

                "Product : " + name +

                "\nCategory : " + category +

                "\nPrice : " + price +

                "\n\nBackend Integration Coming Soon."

            );

        });

    });

}


/* ==========================================================
                 PRODUCT CARD ANIMATION
========================================================== */

const cards = document.querySelectorAll(".product-item");

cards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transition = ".3s";

        card.style.transform = "translateY(-10px) scale(1.02)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "translateY(0px) scale(1)";

    });

});


/* ==========================================================
                RECOMMENDATION CARD EFFECT
========================================================== */

const recommendationCards = document.querySelectorAll(".recommend-card");

recommendationCards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-10px)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "translateY(0px)";

    });

});


/* ==========================================================
              PRODUCT IMAGE ZOOM EFFECT
========================================================== */

const productImages = document.querySelectorAll(".product-item img");

productImages.forEach(image => {

    image.addEventListener("mouseenter", () => {

        image.style.transition = ".4s";

        image.style.transform = "scale(1.08)";

    });

    image.addEventListener("mouseleave", () => {

        image.style.transform = "scale(1)";

    });

});


/* ==========================================================
              SMOOTH SCROLL TO TOP
========================================================== */

window.addEventListener("scroll", () => {

    if (window.scrollY > 300) {

        document.title = "🛍️ Retail Astra | Products";

    }

    else {

        document.title = "Retail Astra | Products";

    }

});


/* ==========================================================
             BACKEND API READY FUNCTIONS
========================================================== */

/*

These functions are placeholders for Spring Boot integration.

Backend APIs:

GET     /products

GET     /products/search

GET     /products/category/{category}

GET     /recommend/{productId}

*/


async function fetchProducts() {

    try {

        const response = await fetch("http://localhost:8080/products");

        const result = await response.json();

        const products = result.data;

        const container = document.getElementById("productContainer");

        container.innerHTML = "";

        products.forEach(product => {

            container.innerHTML += `
                <div class="col-lg-3 col-md-6 product-card" data-category="${product.category}">
                    <div class="card product-item">

                        <img src="${product.imageUrl || 'https://placehold.co/400x450'}"
                             class="card-img-top">

                        <div class="card-body">

                            <h5>${product.name}</h5>

                            <p>${product.brand}</p>

                            <h4>₹${product.price}</h4>

                            <button class="btn btn-primary w-100 view-btn">
                                View Details
                            </button>

                        </div>

                    </div>
                </div>
            `;

        });

        initializeProductButtons();

    }

    catch (error) {

        console.error(error);

    }

}

async function searchProducts(keyword) {

    try {

        const response = await fetch(

            `http://localhost:8080/products/search?keyword=${keyword}`

        );

        const data = await response.json();

        console.log(data);

    }

    catch (error) {

        console.log("Search API unavailable.");

    }

}


async function fetchRecommendations(productId) {

    try {

        const response = await fetch(

            `http://localhost:8080/recommend/${productId}`

        );

        const data = await response.json();

        console.log(data);

    }

    catch (error) {

        console.log("Recommendation API unavailable.");

    }

}


/* ==========================================================
                PAGE LOADED
========================================================== */

console.log("Retail Astra Products Loaded Successfully.");