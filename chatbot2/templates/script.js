document.addEventListener('DOMContentLoaded', function () {
    const userInput = document.getElementById('userInput');
    const submitButton = document.getElementById('submitButton');
    const chatText = document.getElementById('typing-text');
    const chatWindow = document.getElementById('chatWindow');
    const pandaImage = document.querySelector('.panda-image');

    // Initial chat text
    chatText.textContent = 'Chat with our Panda Bot';

    function handleSubmit() {
        const inputValue = userInput.value.trim().toLowerCase();

        if (inputValue) {
            addMessage(inputValue, true); // User message
            userInput.value = ''; // Clear the input field

            let botResponse = '';
            if (inputValue === 'hello') {
                botResponse = 'Hi!';
            } else if (inputValue === 'show all products') {
                botResponse = 'Here are all the products.';
            } else if (inputValue === 'show all shoes') {
                botResponse = 'Here are all the shoes.';
            }else if (inputValue === 'show') {
                botResponse = 'What product do you want to see?';
            }else {
                botResponse = 'Unknown command';
            }

            setTimeout(() => {
                addMessage(botResponse, false); // Bot response
            }, 1000);
        }
    }

    function addMessage(content, isUser) {
        const message = document.createElement('div');
        message.classList.add('message');
        if (isUser) {
            message.classList.add('user');
        } else {
            message.classList.add('bot');
        }
        message.textContent = content;
        chatWindow.appendChild(message);
        chatWindow.scrollTop = chatWindow.scrollHeight;

        pandaImage.style.width = '60px';
        setTimeout(() => {
            pandaImage.style.width = '120px';
        }, 2000);
    }

    submitButton.addEventListener('click', handleSubmit);

    userInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    });

    userInput.addEventListener('focus', function () {
        if (!chatText.classList.contains('typing-started')) {
            chatText.textContent = 'You are now chatting with our Panda Bot';
            chatText.classList.add('typing-started');
            pandaImage.style.width = '100px';
        }
    });
});
