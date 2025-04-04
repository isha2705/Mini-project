document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const chatMessages = document.getElementById('chat-messages');
    const typingIndicator = document.getElementById('typing-indicator');
    
    // Function to add a message to the chat
    function addMessage(message, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
        
        const avatar = document.createElement('div');
        avatar.classList.add('avatar');
        avatar.classList.add(isUser ? 'user-avatar' : 'bot-avatar');
        
        const icon = document.createElement('i');
        icon.classList.add('fa-solid');
        icon.classList.add(isUser ? 'fa-user' : 'fa-robot');
        avatar.appendChild(icon);
        
        const messageContent = document.createElement('div');
        messageContent.classList.add('message-content');
        
        const messagePara = document.createElement('p');
        messagePara.textContent = message;
        messageContent.appendChild(messagePara);
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(messageContent);
        
        chatMessages.appendChild(messageDiv);
        
        // Scroll to the bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Function to show typing indicator
    function showTypingIndicator() {
        typingIndicator.classList.add('active');
    }
    
    // Function to hide typing indicator
    function hideTypingIndicator() {
        typingIndicator.classList.remove('active');
    }
    
    // Function to process form submission
    async function handleSubmit(e) {
        e.preventDefault();
        
        const message = userInput.value.trim();
        if (!message) return;
        
        // Add user message to chat
        addMessage(message, true);
        
        // Clear input
        userInput.value = '';
        
        // Show typing indicator
        showTypingIndicator();
        
        try {
            // Send message to backend
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message })
            });
            
            const data = await response.json();
            
            // Hide typing indicator
            hideTypingIndicator();
            
            if (response.ok) {
                // Add bot response to chat
                addMessage(data.response);
            } else {
                // Show error message
                addMessage('Sorry, I encountered an error: ' + data.error);
            }
        } catch (error) {
            // Hide typing indicator
            hideTypingIndicator();
            
            // Show error message
            addMessage('Sorry, something went wrong. Please try again later.');
            console.error('Error:', error);
        }
    }
    
    // Event listener for form submission
    chatForm.addEventListener('submit', handleSubmit);
    
    // Focus input on page load
    userInput.focus();
    
    // Add animation effects
    const addAnimationEffects = () => {
        // Add subtle bounce effect to send button on hover
        const sendButton = document.getElementById('send-button');
        sendButton.addEventListener('mouseenter', () => {
            sendButton.style.transform = 'scale(1.1)';
        });
        
        sendButton.addEventListener('mouseleave', () => {
            sendButton.style.transform = 'scale(1)';
        });
    };
    
    addAnimationEffects();
}); 