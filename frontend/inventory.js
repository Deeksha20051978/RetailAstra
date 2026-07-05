/* ==========================================================
                RETAIL ASTRA INVENTORY PAGE
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeInventorySearch();

    initializeButtons();

    initializeRowAnimation();

});


/* ==========================================================
                    SEARCH INVENTORY
========================================================== */

function initializeInventorySearch() {

    const searchInput = document.getElementById("inventorySearch");

    const rows = document.querySelectorAll("#inventoryTable tr");

    if (!searchInput) return;

    searchInput.addEventListener("keyup", function () {

        const keyword = this.value.toLowerCase();

        rows.forEach(row => {

            const text = row.innerText.toLowerCase();

            if (text.includes(keyword)) {

                row.style.display = "";

            }

            else {

                row.style.display = "none";

            }

        });

    });

}


/* ==========================================================
                BUTTON CLICK EVENTS
========================================================== */

function initializeButtons() {

    const buttons = document.querySelectorAll(".inventory-table button");

    buttons.forEach(button => {

        button.addEventListener("click", function () {

            const row = this.closest("tr");

            const product = row.cells[1].innerText;

            const stock = row.cells[4].innerText;

            if (this.innerText === "Update") {

                alert(

                    "Updating Inventory\n\n" +

                    "Product : " + product +

                    "\nCurrent Stock : " + stock +

                    "\n\nBackend Integration Coming Soon."

                );

            }

            else {

                alert(

                    "Restocking Product\n\n" +

                    "Product : " + product +

                    "\n\nInventory Agent will update stock."

                );

            }

        });

    });

}


/* ==========================================================
            TABLE ROW HOVER ANIMATION
========================================================== */

function initializeRowAnimation() {

    const rows = document.querySelectorAll("#inventoryTable tr");

    rows.forEach(row => {

        row.addEventListener("mouseenter", () => {

            row.style.transition = ".25s";

            row.style.transform = "scale(1.01)";

        });

        row.addEventListener("mouseleave", () => {

            row.style.transform = "scale(1)";

        });

    });

}


/* ==========================================================
            SUMMARY CARD ANIMATION
========================================================== */

const cards = document.querySelectorAll(".summary-card");

cards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-10px)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "translateY(0px)";

    });

});


/* ==========================================================
              INSIGHT CARD EFFECT
========================================================== */

const insightCards = document.querySelectorAll(".insight-card");

insightCards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-10px) scale(1.02)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "translateY(0px) scale(1)";

    });

});


/* ==========================================================
            INVENTORY STATUS COUNTER
========================================================== */

const counters = document.querySelectorAll(".summary-card h3");

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const counter = entry.target;

        const target = parseInt(counter.innerText);

        let current = 0;

        const increment = Math.ceil(target / 50);

        counter.innerText = "0";

        function updateCounter() {

            current += increment;

            if (current < target) {

                counter.innerText = current;

                requestAnimationFrame(updateCounter);

            }

            else {

                counter.innerText = target;

            }

        }

        updateCounter();

        observer.unobserve(counter);

    });

});

counters.forEach(counter => observer.observe(counter));


/* ==========================================================
                BACKEND READY FUNCTIONS
========================================================== */

/*

InventoryController APIs

GET

/inventory

PUT

/inventory/update

GET

/inventory/low

*/


async function fetchInventory() {

    try {

        const response = await fetch(

            "http://localhost:8080/inventory"

        );

        const data = await response.json();

        console.log(data);

    }

    catch (error) {

        console.log("Inventory API not connected.");

    }

}


async function fetchLowStock() {

    try {

        const response = await fetch(

            "http://localhost:8080/inventory/low"

        );

        const data = await response.json();

        console.log(data);

    }

    catch (error) {

        console.log("Low Stock API unavailable.");

    }

}


async function updateInventory(productId) {

    try {

        await fetch(

            "http://localhost:8080/inventory/update",

            {

                method: "PUT",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    id: productId

                })

            }

        );

    }

    catch (error) {

        console.log("Inventory Update Failed.");

    }

}


/* ==========================================================
                    PAGE READY
========================================================== */

console.log("Retail Astra Inventory Loaded Successfully.");