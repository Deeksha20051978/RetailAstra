/* ==========================================================
                RETAIL ASTRA AI ASSISTANT
                chatbot.js
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeSendButton();

    initializeQuickPrompts();

    initializeSuggestionChips();

    initializeEnterKey();

});


/* ==========================================================
                    DOM ELEMENTS
========================================================== */

const chatMessages = document.getElementById("chatMessages");

const messageInput = document.getElementById("messageInput");

const sendButton = document.getElementById("sendButton");


/* ==========================================================
                    SEND MESSAGE
========================================================== */

function initializeSendButton() {

    if (!sendButton) return;

    sendButton.addEventListener("click", sendMessage);

}


/* ==========================================================
                    ENTER KEY
========================================================== */

function initializeEnterKey() {

    if (!messageInput) return;

    messageInput.addEventListener("keypress", function (event) {

        if (event.key === "Enter") {

            sendMessage();

        }

    });

}


/* ==========================================================
                    SEND MESSAGE FUNCTION
========================================================== */

function sendMessage() {

    const message = messageInput.value.trim();

    if (message === "") return;

    addUserMessage(message);

    messageInput.value = "";

    showTypingIndicator();

    setTimeout(() => {

        removeTypingIndicator();

        generateDemoReply(message);

    }, 1200);

}


/* ==========================================================
                    USER MESSAGE
========================================================== */

function addUserMessage(message) {

    chatMessages.innerHTML += `

        <div class="user-message">

            <div class="chat-text">

                ${message}

            </div>

            <div class="chat-avatar">

                👤

            </div>

        </div>

    `;

    scrollBottom();

}


/* ==========================================================
                    BOT MESSAGE
========================================================== */

function addBotMessage(message) {

    chatMessages.innerHTML += `

        <div class="bot-message">

            <div class="chat-avatar">

                🤖

            </div>

            <div class="chat-text">

                ${message}

            </div>

        </div>

    `;

    scrollBottom();

}


/* ==========================================================
                DEMO AI RESPONSES
========================================================== */

function generateDemoReply(userMessage) {

    const msg = userMessage.toLowerCase();

    let response = "";

    if (msg.includes("stock")) {

        response =
        "Inventory Agent reports that 5 products are running low and should be restocked within the next 48 hours.";

    }

    else if (msg.includes("sales")) {

        response =
        "Today's sales reached ₹3.8 Lakhs with 214 completed orders.";

    }

    else if (msg.includes("recommend")) {

        response =
        "Recommended products:\n\n• Allen Solly Shirt\n• Louis Philippe Blazer\n• Leather Wallet\n• Reebok Shoes";

    }

    else if (msg.includes("price")) {

        response =
        "Pricing Agent suggests increasing Formal Wear prices by 5% because demand is high.";

    }

    else if (msg.includes("inventory")) {

        response =
        "Current inventory health is excellent. 85% products are available, 10% are low in stock and 5% require immediate restocking.";

    }

    else {

        response =
        "I understood your request. Once the Spring Boot backend and Gemini API are connected, I'll provide live AI-generated responses.";

    }

    addBotMessage(response);

}


/* ==========================================================
                QUICK PROMPTS
========================================================== */

function initializeQuickPrompts() {

    const prompts = document.querySelectorAll(".prompt-btn");

    prompts.forEach(button => {

        button.addEventListener("click", () => {

            messageInput.value = button.innerText;

            sendMessage();

        });

    });

}


/* ==========================================================
                SUGGESTION CHIPS
========================================================== */

function initializeSuggestionChips() {

    const chips = document.querySelectorAll(".suggestion-chip");

    chips.forEach(chip => {

        chip.addEventListener("click", () => {

            messageInput.value = chip.innerText;

            sendMessage();

        });

    });

}


/* ==========================================================
                TYPING INDICATOR
========================================================== */

function showTypingIndicator() {

    chatMessages.innerHTML += `

        <div class="bot-message" id="typingIndicator">

            <div class="chat-avatar">

                🤖

            </div>

            <div class="chat-text">

                <em>Retail Astra AI is typing...</em>

            </div>

        </div>

    `;

    scrollBottom();

}


function removeTypingIndicator() {

    const typing = document.getElementById("typingIndicator");

    if (typing) {

        typing.remove();

    }

}


/* ==========================================================
                    AUTO SCROLL
========================================================== */

function scrollBottom() {

    chatMessages.scrollTop = chatMessages.scrollHeight;

}


/* ==========================================================
                BACKEND READY API
========================================================== */

/*

ChatController

POST

/chat

Expected Request

{

"message":"Show low stock products"

}

*/


async function sendMessageToBackend(message) {

    try {

        const response = await fetch(

            "http://localhost:8080/chat",

            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    message: message

                })

            }

        );

        const data = await response.json();

        addBotMessage(data.reply);

    }

    catch (error) {

        console.log("Chat API not connected.");

    }

}


/* ==========================================================
                    PAGE READY
========================================================== */

console.log("Retail Astra AI Assistant Loaded Successfully.");