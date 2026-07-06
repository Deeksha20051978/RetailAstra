document.addEventListener("DOMContentLoaded", () => {
    initializeSendButton();
    initializeQuickPrompts();
    initializeSuggestionChips();
    initializeEnterKey();
});

const chatMessages = document.getElementById("chatMessages");
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");

function initializeSendButton() {
    if (!sendButton) return;
    sendButton.addEventListener("click", sendMessage);
}

function initializeEnterKey() {
    if (!messageInput) return;
    messageInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") sendMessage();
    });
}

function sendMessage() {
    const message = messageInput.value.trim();
    if (message === "") return;

    addUserMessage(message);
    messageInput.value = "";
    showTypingIndicator();

    sendMessageToBackend(message);
}

function addUserMessage(message) {
    chatMessages.innerHTML += `
        <div class="user-message">
            <div class="chat-text">${message}</div>
            <div class="chat-avatar">👤</div>
        </div>`;
    scrollBottom();
}

function addBotMessage(message) {
    chatMessages.innerHTML += `
        <div class="bot-message">
            <div class="chat-avatar">🤖</div>
            <div class="chat-text">${message}</div>
        </div>`;
    scrollBottom();
}

function initializeQuickPrompts() {
    const prompts = document.querySelectorAll(".prompt-btn");
    prompts.forEach(button => {
        button.addEventListener("click", () => {
            messageInput.value = button.innerText;
            sendMessage();
        });
    });
}

function initializeSuggestionChips() {
    const chips = document.querySelectorAll(".suggestion-chip");
    chips.forEach(chip => {
        chip.addEventListener("click", () => {
            messageInput.value = chip.innerText;
            sendMessage();
        });
    });
}

function showTypingIndicator() {
    chatMessages.innerHTML += `
        <div class="bot-message" id="typingIndicator">
            <div class="chat-avatar">🤖</div>
            <div class="chat-text"><em>Retail Astra AI is typing...</em></div>
        </div>`;
    scrollBottom();
}

function removeTypingIndicator() {
    const typing = document.getElementById("typingIndicator");
    if (typing) typing.remove();
}

function scrollBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function sendMessageToBackend(message) {
    try {
        const response = await fetch("http://localhost:8080/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: message })
        });

        const result = await response.json();
        removeTypingIndicator();

        if (result.data && result.data.reply) {
            addBotMessage(result.data.reply);
        } else {
            addBotMessage("Sorry, I couldn't understand that. Try again.");
        }

    } catch (error) {
        console.log("Chat API not connected:", error);
        removeTypingIndicator();
        addBotMessage("⚠️ Could not reach the AI server. Please make sure the backend is running and try again.");
    }
}

console.log("Retail Astra AI Assistant Loaded Successfully.");