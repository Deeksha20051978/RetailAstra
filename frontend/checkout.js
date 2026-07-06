document.addEventListener("DOMContentLoaded", () => {
    initializeCheckout();
    initializeRecommendationButtons();
    initializeFormValidation();
});

const placeOrderBtn = document.getElementById("placeOrderBtn");
const customerName = document.getElementById("customerName");
const customerEmail = document.getElementById("customerEmail");
const customerPhone = document.getElementById("customerPhone");
const customerAddress = document.getElementById("customerAddress");
const paymentMethod = document.getElementById("paymentMethod");

// ⚠️ Replace these IDs with real product IDs from your database (products table)
const CART_ITEMS = [
    { productId: 1, quantity: 1 }, // Allen Solly Shirt
    { productId: 2, quantity: 1 }, // Leather Wallet
    { productId: 3, quantity: 1 }  // Travel Backpack
];

// ⚠️ Replace with a real customer ID once you have login/signup, or keep 1 for demo/testing
const CUSTOMER_ID = 1;

function initializeCheckout() {
    if (!placeOrderBtn) return;
    placeOrderBtn.addEventListener("click", placeOrder);
}

function initializeFormValidation() {
    [customerName, customerEmail, customerPhone, customerAddress].forEach(field => {
        if (!field) return;
        field.addEventListener("focus", () => { field.style.borderColor = "#2563eb"; });
        field.addEventListener("blur", () => { field.style.borderColor = "#ced4da"; });
    });
}

function validateForm() {
    if (customerName.value.trim() === "") { alert("Please enter your name."); customerName.focus(); return false; }
    if (customerEmail.value.trim() === "") { alert("Please enter your email."); customerEmail.focus(); return false; }
    if (customerPhone.value.trim() === "") { alert("Please enter your phone number."); customerPhone.focus(); return false; }
    if (customerAddress.value.trim() === "") { alert("Please enter your delivery address."); customerAddress.focus(); return false; }
    return true;
}

function initializeRecommendationButtons() {
    const buttons = document.querySelectorAll(".recommend-card button");
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const product = button.parentElement.querySelector("h4").innerText;
            alert(product + "\n\nAdded to cart successfully.");
        });
    });
}

async function placeOrder() {
    if (!validateForm()) return;
    await submitOrder();
}

async function submitOrder() {
    const payload = {
        customerId: CUSTOMER_ID,
        cartItems: CART_ITEMS,
        couponCode: null
    };

    try {
        const response = await fetch("http://localhost:8080/checkout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (!response.ok || result.success === false) {
            alert("Order failed: " + (result.message || "Unknown error"));
            return;
        }

        const data = result.data;
        alert(
            "🎉 Order Placed Successfully!\n\n" +
            "Order ID: " + data.orderId + "\n" +
            "Total: ₹" + data.totalAmount + "\n" +
            "Discount: ₹" + (data.discount || 0) + "\n" +
            "Loyalty Points Earned: " + (data.loyaltyEarned || 0)
        );

    } catch (error) {
        console.log("Checkout API not connected:", error);
        alert("Could not reach the server. Is the backend running on port 8080?");
    }
}

console.log("Retail Astra Checkout Loaded Successfully.");