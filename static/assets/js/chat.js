let isChatOpen = false;
let chatHistory = [];

addMessageToHistory('Hello, I\'m here to help you get answers to any Insurance-related question you have according to the policies offered by Faithful Insurance', 'bot')
addMessageToHistory('I\'ll connect you to an agent shortly', 'bot')
async function sendMessage() {
            const input = document.getElementById('userInput');
            const message = input.value.trim();
            if (!message) return;

            addMessageToHistory(message, 'user');
            input.value = '';

            try {
                const typingIndicator = addTypingIndicator();

                // Send to Flask backend
                const response = await fetch('http://localhost:5000/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ message: message })
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                typingIndicator.remove();
                addMessageToHistory(data.response, 'bot');

            } catch (error) {
                console.error('Error:', error);
                addMessageToHistory('Sorry, there was an error processing your request.', 'bot');
            }
        }
    function toggleChat() {
            const container = document.getElementById('chatContainer');
            const header = document.getElementById('chat-header-two');
            isChatOpen = !isChatOpen;
            container.style.display = isChatOpen ? 'flex' : 'none';
            header.addEventListener('mousedown', (e) => {
    isMouseDown = true;
    const x = e.clientX - container.offsetLeft;
    const y = e.clientY - container.offsetTop;

    window.addEventListener('mousemove', (e) => {
        if (isMouseDown) {
            container.style.setProperty('--left', `${e.clientX - x}px`);
            container.style.setProperty('--top', `${e.clientY - y}px`);
        }
    });

    container.addEventListener('mouseup', () => {
        isMouseDown = false;
    });
});
        }
    function addMessageToHistory(text, sender) {
            const history = document.getElementById('chatHistory');
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${sender}-message`;
            messageDiv.textContent = text;
            history.appendChild(messageDiv);
            history.scrollTop = history.scrollHeight;
        }

        function addTypingIndicator() {
            const history = document.getElementById('chatHistory');
            const typingDiv = document.createElement('div');
            typingDiv.className = 'message bot-message';
            typingDiv.textContent = '...';
            typingDiv.id = 'typingIndicator';
            history.appendChild(typingDiv);
            return typingDiv;
        }

        function handleKeyPress(event) {
            if (event.key === 'Enter') {
                sendMessage();
            }
        }
        function handleWhatsAppKeyPress(event) {
        if (event.key === 'Enter') {
            const userInput = document.getElementById('userInput').value;

            // Encode the message and phone number
            const phoneNumber = '+254732252382';
            const message = encodeURIComponent(userInput);

            // Construct the WhatsApp link
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

            // Open the WhatsApp URL in a new tab or window
            window.open(whatsappUrl, '_blank');
        }
    }