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

            if (inputValue === 'hello' || inputValue === 'show all products' || inputValue === 'show all shoes' || inputValue === 'show') {
                let botResponse = '';
                if (inputValue === 'hello') {
                    botResponse = 'Hi!';
                } else if (inputValue === 'show all products') {
                    botResponse = 'Here are all the products.';
                } else if (inputValue === 'show all shoes') {
                    botResponse = 'Here are all the shoes.';
                } else if (inputValue === 'show') {
                    botResponse = 'What product do you want to see?';
                }

                setTimeout(() => {
                    addMessage(botResponse, false); // Bot response
                }, 1000);
            } else {
                // Send the input to the Flask API
                sendToFlaskAPI(inputValue);
            }
        }
    }

    function sendToFlaskAPI(inputValue) {
        fetch('http://127.0.0.1:5000/extract', { // Adjust URL if needed
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userInput: inputValue })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(result => {
            let botResponse = `Extracted Details:\nCategories: ${result.extracted_details.CATEGORIES}\nProduct Name: ${result.extracted_details.PRODUCT_NAME}\nColor: ${result.extracted_details.COLOR}\nSize: ${result.extracted_details.SIZE}`;
            if (result.follow_up_prompt) {
                botResponse += `\n\n${result.follow_up_prompt}`;
            }
            addMessage(botResponse, false);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            addMessage("Error: " + error.message, false);
        });
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

document.addEventListener('DOMContentLoaded', function () {
    const backToHomeButton = document.getElementById('backToHomeButton');

    // Check if the button exists
    if (backToHomeButton) {
        backToHomeButton.addEventListener('click', function () {
            window.location.href = '../../index_main.html'; // Adjust the path accordingly
        });
    } else {
        console.error('Button with ID "backToHomeButton" not found.');
    }
});
