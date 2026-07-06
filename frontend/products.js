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

    if (!searchInput) return;

    searchInput.addEventListener("keyup", function () {

        searchProducts(this.value);

    });

}


/* ==========================================================
                  CATEGORY FILTER
========================================================== */

function initializeCategoryFilter() {

    const buttons = document.querySelectorAll(".category-btn");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            buttons.forEach(btn => btn.classList.remove("active"));

            button.classList.add("active");

            const category = button.dataset.category;

            const products = document.querySelectorAll(".product-card");

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

function initializeCardAnimations() {

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

}


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
             BACKEND API FUNCTIONS
========================================================== */

/*

ProductController APIs

GET     /products

GET     /products/{id}

POST    /products

PUT     /products/{id}

DELETE  /products/{id}

RecommendationController API

GET     /recommendations/{customerId}?productId={productId}

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
                    <div class="card product-item" data-product-id="${product.id}">

                        <img src="${product.imageUrl ||