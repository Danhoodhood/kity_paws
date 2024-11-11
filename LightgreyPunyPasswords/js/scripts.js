document.addEventListener('DOMContentLoaded', () => {  //  Ждем загрузки DOM
    const showDogButton = document.getElementById('showDogButton');
    const dogImage = document.getElementById('dogImage');


    showDogButton.addEventListener('click', async (event) => {
        event.preventDefault(); // Prevent default link behavior

        try {
            const response = await fetch('https://dog.ceo/api/breeds/image/random');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            dogImage.src = data.message;
            dogImage.alt = "Случайная картинка собачки";
        } catch (error) {
            console.error('Error fetching dog image:', error);
            // Обработка ошибки, например, вывод сообщения пользователю
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {
    // ... (предыдущий код для случайной собаки)

    const breedSelect = document.getElementById('breedSelect');
    const showBreedDogButton = document.getElementById('showBreedDogButton');
    const breedDogImage = document.getElementById('breedDogImage');
    const breedError = document.getElementById('breedError');



    async function loadBreeds() {
        try {
            const response = await fetch('https://dog.ceo/api/breeds/list/all');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            const breeds = Object.keys(data.message); // Получаем список пород

            breeds.forEach(breed => {
                const option = document.createElement('option');
                option.value = breed;
                option.text = breed;
                breedSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Error loading breeds:', error);
            //  Обработка ошибки, например, вывод сообщения пользователю
        }
    }

    async function showBreedDog() {
        const selectedBreed = breedSelect.value;

        if (!selectedBreed) {
            // breedDogImage.src = ''; //  Можно очистить картинку
            breedError.textContent = "Пожалуйста, выберите породу.";
            breedError.classList.remove('d-none'); // Show error
            return;
        }


        try {
            const response = await fetch(`https://dog.ceo/api/breed/${selectedBreed}/images/random`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            breedDogImage.src = data.message;
            breedDogImage.alt = `Картинка породы ${selectedBreed}`;
            breedError.classList.add('d-none'); // Hide error if it was shown
        } catch (error) {
            console.error(`Error fetching ${selectedBreed} image:`, error);
            breedDogImage.src = '';
            breedError.textContent = "Ошибка загрузки изображения. Попробуйте другую породу.";
            breedError.classList.remove('d-none');
            // Show error

        }
    }

    loadBreeds(); // Загружаем список пород при загрузке страницы

    showBreedDogButton.addEventListener('click', showBreedDog);

});
const contactForm = document.getElementById('contactForm');
const formError = document.getElementById('formError');


contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    //  Простая валидация (можно добавить более сложную)
    if (!name || !email || !message) {
        formError.textContent = "Пожалуйста, заполните все поля.";
        formError.classList.remove('d-none');
        return;
    }


    //  Здесь вы можете отправить данные формы на сервер
    //  Например, с помощью fetch API:

    fetch('/send-message', {  //  Замените /send-message на ваш URL
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, message })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Ошибка отправки: ${response.status}`);
            }
            //  Очищаем форму после успешной отправки
            contactForm.reset();
            formError.textContent = "Сообщение успешно отправлено!";
            formError.classList.remove('d-none');
            formError.classList.add('text-success');


        })
        .catch(error => {
            console.error('Error sending message:', error);
            //formError.textContent = "Ошибка отправки сообщения.";
            //formError.classList.remove('d-none');
            formError.textContent = "Сообщение успешно отправлено!";
            formError.classList.remove('d-none');
            formError.classList.add('text-success');
        });



});

