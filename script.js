// Get the icon container and window container elements
const iconContainer = document.querySelector('.icon-container');
const windowContainer = document.querySelector('#window-container');

// Add an event listener to the icon container
iconContainer.addEventListener('click', () => {
  // Toggle the window container display
  windowContainer.style.display = windowContainer.style.display === 'block'? 'none' : 'block';
});

function openPage() {
  window.open('C:\Users\palpo\Desktop\technoverse\chatbot2\templates\index.html', '_blank');
}

document.addEventListener('DOMContentLoaded', function () {
  const chatButton = document.getElementById('chatButton');

  // Check if the button exists
  if (chatButton) {
      chatButton.addEventListener('click', function () {
          window.location.href = 'chatbot2/templates/index.html';
      });
  } else {
      console.error('Button with ID "chatButton" not found.');
  }
});
