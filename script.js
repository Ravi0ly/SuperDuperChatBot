// Configuration
const CONFIG = {
    OPENAI_API_KEY: 'y0ur_key_in_53cret}',
    API_ENDPOINT: 'https://api.openai.com/v1/chat/completions',
    MODEL: 'gpt-3.5-turbo',
    MAX_TOKENS: 150
};

// DOM Elements
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

// Event Listeners
sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Main Functions
async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    // Add user message to chat
    addMessageToChat('You', message, 'user-message');
    userInput.value = '';

    // Show typing indicator
    showTypingIndicator();

    try {
        // Simulate API call (in real implementation, this would call OpenAI API)
        const response = await simulateAIResponse(message);
        
        // Remove typing indicator and add AI response
        hideTypingIndicator();
        addMessageToChat('AI Assistant', response, 'bot-message');
    } catch (error) {
        hideTypingIndicator();
        addMessageToChat('AI Assistant', 'Sorry, I encountered an error. Please try again.', 'bot-message');
        console.error('Error:', error);
    }
}

function addMessageToChat(sender, text, className) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${className}`;
    
    const senderSpan = document.createElement('span');
    senderSpan.className = 'message-sender';
    senderSpan.textContent = sender + ':';
    
    const textSpan = document.createElement('span');
    textSpan.className = 'message-text';
    textSpan.textContent = text;
    
    messageDiv.appendChild(senderSpan);
    messageDiv.appendChild(textSpan);
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.id = 'typing-indicator';
    typingDiv.className = 'typing-indicator';
    typingDiv.textContent = 'AI is typing...';
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Simulate AI response (replace with actual OpenAI API call in production)
async function simulateAIResponse(userMessage) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    const responses = [
        "That's an interesting question! Let me think about that...",
        "I understand what you're asking. Here's my perspective:",
        "Great point! I'd be happy to help you with that.",
        "That's a fascinating topic. Let me share some thoughts:",
        "I see what you mean. Here's how I would approach that:",
        "Thanks for asking! I think the key thing to consider is:",
        "That's a really good question. In my experience:",
        "I appreciate you bringing that up. My take on it is:"
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
}


// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    console.log('AI Chat Assistant initialized');
    console.log('API Key configured:', CONFIG.OPENAI_API_KEY.substring(0, 10) + '...');
});