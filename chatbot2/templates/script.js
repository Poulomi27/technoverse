document.getElementById('submitButton').addEventListener('click', function() {
    const userInput = document.getElementById('userInput').value.toLowerCase();
    const output = document.getElementById('output');
    const productList = document.getElementById('productList');
    const shoesList = document.getElementById('shoesList');
    const images = document.querySelectorAll('.product-image');
    const simages = document.querySelectorAll('.shoes-image');

    if (userInput === 'hello') {
        output.textContent = 'hi';
        productList.style.display = 'none';
        images.forEach(image => image.style.display = 'none');
    } else if (userInput === 'show all products') {
        output.textContent = '';
        productList.style.display = 'flex';
        shoesList.style.display = 'none';
        images.forEach((image, index) => {
            setTimeout(() => {
                image.style.display = 'block';
            }, index * 1000); // 1 second delay for each image
        });
    } else if (userInput === 'show all shoes') {
        output.textContent = '';
        productList.style.display = 'none';
        shoesList.style.display = 'flex';
        simages.forEach((image, index) => {
            setTimeout(() => {
                image.style.display = 'block';
            }, index * 1000); // 1 second delay for each image
        });
    } else {
        output.textContent = 'Unknown command';
        productList.style.display = 'none';
        images.forEach(image => image.style.display = 'none');
    }
});
