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
