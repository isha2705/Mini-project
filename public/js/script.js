document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const chatMessages = document.getElementById('chat-messages');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const startChatBtn = document.querySelector('.start-chat-btn');
    const newChatBtn = document.querySelector('.new-chat-btn');
    const saveChatBtn = document.querySelector('.save-chat-btn');
    const savedChats = document.getElementById('saved-chats');

    // Navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = link.getAttribute('data-section');
            
            // Update active states
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetSection) {
                    section.classList.add('active');
                }
            });
        });
    });

    // Start new chat from home
    startChatBtn.addEventListener('click', () => {
        navLinks[1].click(); // Click the chat link
    });

    // New chat button
    newChatBtn.addEventListener('click', () => {
        chatMessages.innerHTML = `
            <div class="message bot-message">
                <div class="avatar bot-avatar">
                    <i class="fa-solid fa-robot"></i>
                </div>
                <div class="message-content">
                    <p>Hello! I'm your Gemini AI assistant. How can I help you today?</p>
                </div>
            </div>
        `;
        saveChatBtn.classList.remove('saved');
        saveChatBtn.innerHTML = '<i class="fa-solid fa-star"></i> Save Chat';
    });

    // Save chat button
    saveChatBtn.addEventListener('click', () => {
        if (!saveChatBtn.classList.contains('saved')) {
            saveChat();
            saveChatBtn.classList.add('saved');
            saveChatBtn.innerHTML = '<i class="fa-solid fa-check"></i> Saved';
        }
    });

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

    // Function to save chat
    function saveChat() {
        const messages = Array.from(chatMessages.children).map(msg => {
            const isUser = msg.classList.contains('user-message');
            const content = msg.querySelector('.message-content p').textContent;
            return { isUser, content };
        });

        if (messages.length > 1) { // Don't save if only the initial message
            const chatCard = document.createElement('div');
            chatCard.classList.add('saved-chat-card');
            
            const title = document.createElement('h3');
            title.textContent = `Chat ${savedChats.children.length + 1}`;
            
            const preview = document.createElement('p');
            preview.textContent = messages[1].content.substring(0, 50) + '...';
            
            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('delete-chat');
            deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
            
            chatCard.appendChild(title);
            chatCard.appendChild(preview);
            chatCard.appendChild(deleteBtn);
            
            // Save to localStorage
            const chatId = Date.now();
            localStorage.setItem(`chat_${chatId}`, JSON.stringify(messages));
            
            // Add click event to view chat
            chatCard.addEventListener('click', (e) => {
                if (!e.target.closest('.delete-chat')) {
                    viewChat(chatId);
                }
            });
            
            // Add delete event
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                localStorage.removeItem(`chat_${chatId}`);
                chatCard.remove();
            });
            
            savedChats.appendChild(chatCard);
        }
    }

    // Function to view saved chat
    function viewChat(chatId) {
        const messages = JSON.parse(localStorage.getItem(`chat_${chatId}`));
        const starredContainer = document.querySelector('.starred-container');
        
        // Create a chat view container
        const chatView = document.createElement('div');
        chatView.classList.add('chat-view');
        
        // Add back button
        const backButton = document.createElement('button');
        backButton.classList.add('back-button');
        backButton.innerHTML = '<i class="fa-solid fa-arrow-left"></i> Back to Saved Chats';
        backButton.addEventListener('click', () => {
            chatView.remove();
            loadSavedChats();
        });
        chatView.appendChild(backButton);
        
        // Create messages container
        const messagesContainer = document.createElement('div');
        messagesContainer.classList.add('chat-messages');
        
        // Add messages to the container
        messages.forEach(msg => {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message');
            messageDiv.classList.add(msg.isUser ? 'user-message' : 'bot-message');
            
            const avatar = document.createElement('div');
            avatar.classList.add('avatar');
            avatar.classList.add(msg.isUser ? 'user-avatar' : 'bot-avatar');
            
            const icon = document.createElement('i');
            icon.classList.add('fa-solid');
            icon.classList.add(msg.isUser ? 'fa-user' : 'fa-robot');
            avatar.appendChild(icon);
            
            const messageContent = document.createElement('div');
            messageContent.classList.add('message-content');
            
            const messagePara = document.createElement('p');
            messagePara.textContent = msg.content;
            messageContent.appendChild(messagePara);
            
            messageDiv.appendChild(avatar);
            messageDiv.appendChild(messageContent);
            
            messagesContainer.appendChild(messageDiv);
        });
        
        chatView.appendChild(messagesContainer);
        
        // Clear and add the chat view
        starredContainer.innerHTML = '';
        starredContainer.appendChild(chatView);
    }

    // Function to load saved chats
    function loadSavedChats() {
        const starredContainer = document.querySelector('.starred-container');
        const emptyState = document.querySelector('.empty-state');
        const savedChats = JSON.parse(localStorage.getItem('savedChats') || '[]');
        
        starredContainer.innerHTML = '';
        
        if (savedChats.length === 0) {
            emptyState.style.display = 'flex';
            return;
        }
        
        emptyState.style.display = 'none';
        
        savedChats.forEach((chat, index) => {
            const chatCard = document.createElement('div');
            chatCard.className = 'saved-chat-card';
            chatCard.innerHTML = `
                <h3>Chat ${index + 1}</h3>
                <p>${chat.messages[0]?.content || 'No messages'}</p>
                <button class="delete-chat" onclick="deleteChat(${index})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            `;
            chatCard.onclick = () => viewChat(index);
            starredContainer.appendChild(chatCard);
        });
    }

    // Load saved chats on page load
    loadSavedChats();

    // Function to process form submission
    async function handleSubmit(e) {
        e.preventDefault();
        
        const message = userInput.value.trim();
        if (!message) return;
        
        // Add user message to chat
        addMessage(message, true);
        
        // Clear input
        userInput.value = '';
        
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
            
            if (response.ok) {
                // Add bot response to chat
                addMessage(data.response);
                // Reset save button state
                saveChatBtn.classList.remove('saved');
                saveChatBtn.innerHTML = '<i class="fa-solid fa-star"></i> Save Chat';
            } else {
                // Show error message
                addMessage('Sorry, I encountered an error: ' + data.error);
            }
        } catch (error) {
            // Show error message
            addMessage('Sorry, something went wrong. Please try again later.');
            console.error('Error:', error);
        }
    }
    
    // Event listener for form submission
    chatForm.addEventListener('submit', handleSubmit);
    
    // Focus input on page load
    userInput.focus();

    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        icon.className = theme === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
    }
}); 