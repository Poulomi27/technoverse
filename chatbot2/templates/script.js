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
                // Send the input to the Flask API with an empty dict
                sendToFlaskAPI(inputValue, {});
            }
        }
    }

    function sendToFlaskAPI(inputValue, dict) {
        fetch('http://127.0.0.1:5000/extract', { // Adjust URL if needed
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userInput: inputValue, ...dict })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(result => {
            const { modular_response, updated_dict, is_complete } = result;

            addMessage(modular_response, false);

            if (!is_complete) {
                // Get additional input from user and re-call the function
                userInput.addEventListener('keypress', function handleReSubmit(e) {
                    if (e.key === 'Enter') {
                        const updatedInputValue = userInput.value.trim().toLowerCase();
                        if (updatedInputValue) {
                            addMessage(updatedInputValue, true); // User message
                            userInput.value = ''; // Clear the input field
                            sendToFlaskAPI(updatedInputValue, updated_dict);
                            userInput.removeEventListener('keypress', handleReSubmit);
                        }
                    }
                });
            } else {
                fetchDummyJSON();
            }
        })
        .catch(error => {
            fetchDummyJSON();
            console.error('There was a problem with the fetch operation:', error);
            //addMessage("Error: " + error.message, false);
        });
    }

    function fetchDummyJSON() {
        fetch('dummy.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                const productCard = document.createElement('div');
                productCard.classList.add('product-card');
                productCard.innerHTML = `
                    <img src="${item.img}" alt="${item.name}">
                    <div class="product-name">${item.name}</div>
                `;
                chatWindow.appendChild(productCard);
            });
        })
        .catch(error => console.error('Error fetching dummy.json:', error));
    }
    

    // Add a product card to the chat window
    function addProductCard(product) {
        const card = document.createElement('div');
        card.classList.add('product-card');

        const img = document.createElement('img');
        img.src = product.img; // Assuming the JSON has an 'image' key
        img.alt = product.name; // Assuming the JSON has a 'name' key
        card.appendChild(img);

        const name = document.createElement('div');
        name.classList.add('product-name');
        name.textContent = product.name; // Assuming the JSON has a 'name' key
        card.appendChild(name);

        chatWindow.appendChild(card);
        chatWindow.scrollTop = chatWindow.scrollHeight;
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
