/* ==========================================================
   RETAIL ASTRA
   MAIN JAVASCRIPT
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeLoader();
    initializeNavbar();
    initializeScrollButton();
    initializeCounters();
    initializeRevealAnimation();
    initializeSmoothScrolling();
    initializeFloatingButton();

});

/* ==========================================================
   LOADER
========================================================== */

function initializeLoader() {

    const loader = document.getElementById("loader");

    if (!loader) return;

    window.addEventListener("load", () => {

        setTimeout(() => {

            loader.classList.add("hide");

        }, 1800);

    });

}

/* ==========================================================
   NAVBAR SCROLL EFFECT
========================================================== */

function initializeNavbar() {

    const navbar = document.querySelector(".custom-navbar");

    if (!navbar) return;

    window.addEventListener("scroll", () => {

        if (window.scrollY > 60) {

            navbar.style.background = "#0f172a";
            navbar.style.padding = "10px 0";
            navbar.style.boxShadow = "0 8px 20px rgba(0,0,0,.18)";

        }

        else {

            navbar.style.background = "rgba(15,23,42,.90)";
            navbar.style.padding = "16px 0";
            navbar.style.boxShadow = "0 3px 12px rgba(0,0,0,.15)";

        }

    });

}

/* ==========================================================
   SCROLL TO TOP BUTTON
========================================================== */

function initializeScrollButton() {

    const button = document.getElementById("scrollTop");

    if (!button) return;

    window.addEventListener("scroll", () => {

        if (window.scrollY > 400) {

            button.style.display = "block";

        }

        else {

            button.style.display = "none";

        }

    });

    button.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}

/* ==========================================================
   COUNTER ANIMATION
========================================================== */

function initializeCounters() {

    const counters = document.querySelectorAll(".counter");

    if (counters.length === 0) return;

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const counter = entry.target;

            const target = Number(counter.dataset.target);

            const duration = 2000;

            const increment = target / (duration / 16);

            let current = 0;

            const updateCounter = () => {

                current += increment;

                if (current < target) {

                    if (target >= 1000000) {

                        counter.innerText =
                            (current / 1000000).toFixed(1) + "M+";

                    }

                    else if (target >= 1000) {

                        counter.innerText =
                            Math.floor(current).toLocaleString() + "+";

                    }

                    else {

                        counter.innerText =
                            Math.floor(current);

                    }

                    requestAnimationFrame(updateCounter);

                }

                else {

                    if (target >= 1000000) {

                        counter.innerText =
                            (target / 1000000).toFixed(1) + "M+";

                    }

                    else if (target >= 1000) {

                        counter.innerText =
                            target.toLocaleString() + "+";

                    }

                    else {

                        counter.innerText = target + "+";

                    }

                }

            };

            updateCounter();

            observer.unobserve(counter);

        });

    }, {

        threshold: 0.5

    });

    counters.forEach(counter => observer.observe(counter));

}

/* ==========================================================
   SCROLL REVEAL
========================================================== */

function initializeRevealAnimation() {

    const sections = document.querySelectorAll(

        "section"

    );

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("fade-in");

            }

        });

    }, {

        threshold: 0.15

    });

    sections.forEach(section => {

        observer.observe(section);

    });

}

/* ==========================================================
   SMOOTH SCROLLING
========================================================== */

function initializeSmoothScrolling() {

    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {

        link.addEventListener("click", function (e) {

            e.preventDefault();

            const target = document.querySelector(

                this.getAttribute("href")

            );

            if (!target) return;

            target.scrollIntoView({

                behavior: "smooth"

            });

        });

    });

}

/* ==========================================================
   FLOATING AI BUTTON
========================================================== */

function initializeFloatingButton() {

    const aiButton = document.querySelector(".floating-ai");

    if (!aiButton) return;

    aiButton.addEventListener("mouseenter", () => {

        aiButton.style.transform = "scale(1.15)";

    });

    aiButton.addEventListener("mouseleave", () => {

        aiButton.style.transform = "scale(1)";

    });

}

/* ==========================================================
   ACTIVE NAVIGATION
========================================================== */

const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navLinks.forEach(item =>

            item.classList.remove("active")

        );

        link.classList.add("active");

    });

});

/* ==========================================================
   HERO BUTTON HOVER EFFECT
========================================================== */

const heroButtons = document.querySelectorAll(".hero-buttons .btn");

heroButtons.forEach(button => {

    button.addEventListener("mouseenter", () => {

        button.style.transform = "translateY(-6px)";

    });

    button.addEventListener("mouseleave", () => {

        button.style.transform = "translateY(0)";

    });

});

/* ==========================================================
   CONSOLE MESSAGE
========================================================== */

console.log(`
========================================

      RETAIL ASTRA

 Multi-Agent AI Retail Platform

 Frontend Initialized Successfully

========================================
`);