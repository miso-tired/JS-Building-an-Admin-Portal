let response = await fetch('http://localhost:3001/updateBook', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'id': 3,
            'title': 'The Legends of Arathrae'
        }),
    })
    let updatedBook = await response.json();
    console.log(updatedBook)
// Your Code Here
async function main() {
    let response = await fetch('http://localhost:3001/listBooks');
    let books = await response.json();
    let root = document.getElementById('root');
    
    books.forEach(book => {
        let bookContainer = document.createElement('div');
        bookContainer.classList.add('card', 'mb-3');
        
        let cardBody = document.createElement('div');
        cardBody.classList.add('card-body', 'd-flex', 'align-items-center');
        
        let titleElement = document.createElement('h5');
        titleElement.classList.add('card-title', 'mb-0', 'me-auto');
        titleElement.textContent = book.title;
        
        let quantityInput = document.createElement('input');
        quantityInput.classList.add('form-control', 'me-2');
        quantityInput.setAttribute('type', 'number');
        quantityInput.setAttribute('value', book.quantity);
        quantityInput.setAttribute('data-id', book.id);
        
        let submitButton = document.createElement('button');
        submitButton.textContent = 'Save';
        submitButton.classList.add('btn', 'btn-primary');
        submitButton.addEventListener('click', async () => {
            let newQuantity = quantityInput.value;
            
            let response = await fetch('http://localhost:3001/updateBook', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: book.id,
                    quantity: newQuantity
                })
            });

            let updatedBook = await response.json();
            console.log(updatedBook);
        });
        cardBody.appendChild(titleElement);
        cardBody.appendChild(quantityInput);
        cardBody.appendChild(submitButton);
        
        bookContainer.appendChild(cardBody);
        
        root.appendChild(bookContainer);
    });
}

main();
