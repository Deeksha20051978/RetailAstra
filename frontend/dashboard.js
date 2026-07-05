/* ==========================================================
                RETAIL ASTRA DASHBOARD PAGE
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    animateCounters();

    initializeCards();

    initializeNotifications();

});


/* ==========================================================
                    KPI COUNTERS
========================================================== */

function animateCounters() {

    const counters = document.querySelectorAll(".dashboard-card h2");

    counters.forEach(counter => {

        const targetText = counter.innerText;

        const target = parseInt(targetText.replace(/[^\d]/g, ""));

        if (isNaN(target)) return;

        let current = 0;

        const increment = Math.ceil(target / 60);

        counter.innerText = "0";

        function updateCounter() {

            current += increment;

            if (current < target) {

                if (targetText.includes("₹")) {

                    counter.innerText = "₹" + current;

                } else {

                    counter.innerText = current;

                }

                requestAnimationFrame(updateCounter);

            }

            else {

                counter.innerText = targetText;

            }

        }

        updateCounter();

    });

}


/* ==========================================================
                    CARD ANIMATION
========================================================== */

function initializeCards() {

    const cards = document.querySelectorAll(

        ".dashboard-card,.agent-card,.analytics-card,.recommendation-box"

    );

    cards.forEach(card => {

        card.addEventListener("mouseenter", () => {

            card.style.transition = ".3s";

            card.style.transform = "translateY(-10px)";

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform = "translateY(0px)";

        });

    });

}


/* ==========================================================
                    TABLE HOVER
========================================================== */

const rows = document.querySelectorAll("tbody tr");

rows.forEach(row => {

    row.addEventListener("mouseenter", () => {

        row.style.transition = ".2s";

        row.style.background = "#eef6ff";

    });

    row.addEventListener("mouseleave", () => {

        row.style.background = "";

    });

});


/* ==========================================================
                ALERT AUTO HIGHLIGHT
========================================================== */

function initializeNotifications() {

    const alerts = document.querySelectorAll(".dashboard-alerts .alert");

    alerts.forEach((alert, index) => {

        setTimeout(() => {

            alert.style.transition = ".5s";

            alert.style.transform = "scale(1.02)";

            setTimeout(() => {

                alert.style.transform = "scale(1)";

            }, 700);

        }, index * 400);

    });

}


/* ==========================================================
                AGENT STATUS BADGES
========================================================== */

const badges = document.querySelectorAll(".agent-card .badge");

badges.forEach(badge => {

    badge.addEventListener("mouseenter", () => {

        badge.classList.remove("bg-success");

        badge.classList.add("bg-primary");

    });

    badge.addEventListener("mouseleave", () => {

        badge.classList.remove("bg-primary");

        badge.classList.add("bg-success");

    });

});


/* ==========================================================
                CHART PLACEHOLDER
========================================================== */

const chart = document.querySelector(".chart-placeholder");

if (chart) {

    chart.addEventListener("click", () => {

        alert(

            "Sales Analytics\n\n" +

            "Chart will be connected to DashboardController\n\n" +

            "GET /dashboard"

        );

    });

}


/* ==========================================================
                BACKEND READY FUNCTIONS
========================================================== */

/*

DashboardController

GET /dashboard

*/


async function fetchDashboard() {

    try {

        const response = await fetch(

            "http://localhost:8080/dashboard"

        );

        const data = await response.json();

        console.log(data);

        /*

        Example:

        document.getElementById("revenueValue").innerText =
        data.revenue;

        */

    }

    catch (error) {

        console.log("Dashboard API not connected.");

    }

}


/* ==========================================================
                REFRESH DASHBOARD
========================================================== */

function refreshDashboard() {

    fetchDashboard();

    console.log("Refreshing dashboard...");

}


/* ==========================================================
                AUTO REFRESH
========================================================== */

setInterval(() => {

    refreshDashboard();

}, 30000);


/* ==========================================================
                PAGE READY
========================================================== */

console.log("Retail Astra Dashboard Loaded Successfully.");