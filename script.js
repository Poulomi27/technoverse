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