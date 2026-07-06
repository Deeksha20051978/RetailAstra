document.addEventListener("DOMContentLoaded", () => {
    initializeCards();
    initializeNotifications();
    fetchDashboard();
});

function initializeCards() {
    const cards = document.querySelectorAll(".dashboard-card,.agent-card,.analytics-card,.recommendation-box");
    cards.forEach(card => {
        card.addEventListener("mouseenter", () => { card.style.transition = ".3s"; card.style.transform = "translateY(-10px)"; });
        card.addEventListener("mouseleave", () => { card.style.transform = "translateY(0px)"; });
    });
}

function initializeNotifications() {
    const alerts = document.querySelectorAll(".dashboard-alerts .alert");
    alerts.forEach((alert, index) => {
        setTimeout(() => {
            alert.style.transition = ".5s";
            alert.style.transform = "scale(1.02)";
            setTimeout(() => { alert.style.transform = "scale(1)"; }, 700);
        }, index * 400);
    });
}

function animateValue(el, target, isCurrency) {
    let current = 0;
    const increment = Math.max(1, Math.ceil(target / 60));
    function step() {
        current += increment;
        if (current < target) {
            el.innerText = (isCurrency ? "₹" : "") + current.toLocaleString();
            requestAnimationFrame(step);
        } else {
            el.innerText = (isCurrency ? "₹" : "") + target.toLocaleString();
        }
    }
    step();
}

async function fetchDashboard() {
    try {
        const response = await fetch("http://localhost:8080/dashboard");
        const result = await response.json();
        const data = result.data;

        const revenueEl = document.getElementById("revenueValue");
        const ordersEl = document.getElementById("ordersValue");
        const customersEl = document.getElementById("customersValue");
        const stockEl = document.getElementById("stockValue");

        if (revenueEl) animateValue(revenueEl, Math.round(data.totalRevenue || 0), true);
        if (ordersEl) animateValue(ordersEl, data.totalOrders || 0, false);
        if (customersEl) animateValue(customersEl, data.totalCustomers || 0, false);
        if (stockEl) animateValue(stockEl, data.lowStockCount || 0, false);

    } catch (error) {
        console.log("Dashboard API not connected:", error);
    }
}

function refreshDashboard() {
    fetchDashboard();
}

setInterval(refreshDashboard, 30000);

console.log("Retail Astra Dashboard Loaded Successfully.");