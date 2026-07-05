/* ==========================================================
                RETAIL ASTRA CHECKOUT PAGE
                checkout.js
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeCheckout();

    initializeRecommendationButtons();

    initializeFormValidation();

});


/* ==========================================================
                    DOM ELEMENTS
========================================================== */

const placeOrderBtn = document.getElementById("placeOrderBtn");

const customerName = document.getElementById("customerName");

const customerEmail = document.getElementById("customerEmail");

const customerPhone = document.getElementById("customerPhone");

const customerAddress = document.getElementById("customerAddress");

const paymentMethod = document.getElementById("paymentMethod");


/* ==========================================================
                PLACE ORDER BUTTON
========================================================== */

function initializeCheckout() {

    if (!placeOrderBtn) return;

    placeOrderBtn.addEventListener("click", placeOrder);

}


/* ==========================================================
                PLACE ORDER
========================================================== */

function placeOrder() {

    if (!validateForm()) {

        return;

    }

    alert(

        "🎉 Order Placed Successfully!\n\n" +

        "Thank you for shopping with Retail Astra.\n\n" +

        "Your order has been sent for processing."

    );

    submitOrder();

}


/* ==========================================================
                FORM VALIDATION
========================================================== */

function initializeFormValidation() {

    const fields = [

        customerName,

        customerEmail,

        customerPhone,

        customerAddress

    ];

    fields.forEach(field => {

        if (!field) return;

        field.addEventListener("focus", () => {

            field.style.borderColor = "#2563eb";

        });

        field.addEventListener("blur", () => {

            field.style.borderColor = "#ced4da";

        });

    });

}


function validateForm() {

    if (customerName.value.trim() === "") {

        alert("Please enter your name.");

        customerName.focus();

        return false;

    }

    if (customerEmail.value.trim() === "") {

        alert("Please enter your email.");

        customerEmail.focus();

        return false;

    }

    if (customerPhone.value.trim() === "") {

        alert("Please enter your phone number.");

        customerPhone.focus();

        return false;

    }

    if (customerAddress.value.trim() === "") {

        alert("Please enter your delivery address.");

        customerAddress.focus();

        return false;

    }

    return true;

}


/* ==========================================================
            RECOMMENDATION BUTTONS
========================================================== */

function initializeRecommendationButtons() {

    const buttons = document.querySelectorAll(".recommend-card button");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            const product = button.parentElement.querySelector("h4").innerText;

            alert(

                product +

                "\n\nAdded to cart successfully."

            );

        });

    });

}


/* ==========================================================
                BACKEND READY API
========================================================== */

/*

CheckoutController

POST

/checkout

Expected Request

{

"name":"Ananya",

"email":"abc@gmail.com",

"phone":"9876543210",

"address":"Bangalore",

"paymentMethod":"UPI"

}

*/


async function submitOrder() {

    const order = {

        name: customerName.value,

        email: customerEmail.value,

        phone: customerPhone.value,

        address: customerAddress.value,

        paymentMethod: paymentMethod.value

    };

    try {

        const response = await fetch(

            "http://localhost:8080/checkout",

            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify(order)

            }

        );

        const data = await response.json();

        console.log(data);

    }

    catch (error) {

        console.log("Checkout API not connected.");

    }

}


/* ==========================================================
                ORDER SUMMARY EFFECT
========================================================== */

const summaryRows = document.querySelectorAll(".checkout-card tbody tr");

summaryRows.forEach(row => {

    row.addEventListener("mouseenter", () => {

        row.style.transition = ".2s";

        row.style.transform = "scale(1.01)";

    });

    row.addEventListener("mouseleave", () => {

        row.style.transform = "scale(1)";

    });

});


/* ==========================================================
                CARD ANIMATION
========================================================== */

const cards = document.querySelectorAll(

    ".checkout-card,.recommend-card"

);

cards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-8px)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "translateY(0px)";

    });

});


/* ==========================================================
                PAGE READY
========================================================== */

console.log("Retail Astra Checkout Loaded Successfully.");