const requestURL = "../json/chars.json";

// Wait until the page is fully loaded
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');

    // Force fade-out after 3 seconds
    setTimeout(() => {
        loadingScreen.style.transition = 'opacity 1s ease';
        loadingScreen.style.opacity = '0';

        // Remove the loading screen from the DOM after the fade-out
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 1000); // Wait for 1 second to let the opacity transition finish
    }, 3000); // 3 seconds for the logo scale animation
});

async function fetchCharactersJson() {
    const response = await fetch(requestURL);
    const char = await response.json();
    return char;
}

fetchCharactersJson().then(char => {
    const characterSection = document.getElementById("characterSection");

    // Función para renderizar los personajes
    function renderCharacters(characters) {
        characterSection.innerHTML = ''; // Limpiar sección de personajes
        characters.forEach(character => {
            const { name, url, heroname, quirk, age, height } = character;

            characterSection.innerHTML += `
            <div class="card mx-auto mb-4 bg-warning bg-gradient" style="width: 18rem;">
                <img src="${url}" class="card-img-top outline-img mt-3" alt="..." style="width:17rem; height: 25rem; object-fit: contain; filter: drop-shadow(-10px -10px 0 #90731d);">
                <div class="card-body">
                    <h5 class="card-title">${name}</h5>
                    <p class="card-text mb-0">${heroname}</p>
                    <p class="card-text mb-0"><small class="text-body-secondary">Quirk: ${quirk}</small></p>
                    <p class="card-text mb-0"><small class="text-body-secondary">Age: ${age}</small></p>
                    <p class="card-text mb-0"><small class="text-body-secondary">Height: ${height}</small></p>
                </div>
            </div>
            `;
        });
    }

    // Inicializar renderizado con todos los personajes
    renderCharacters(char.characters);

    // Manejar clics en los botones de filtrado
    const filterButtons = document.querySelectorAll('.btn');

    // Variable para almacenar el botón activo
    let activeButton = null;

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterRank = button.dataset.filter; // Obtener tipo de filtro

            // Verificar si se ha pulsado el mismo botón
            if (button === activeButton) {
                // Si el botón ya está activo, mostrar todos los personajes
                renderCharacters(char.characters);
                toggleButton(null); // Apagar todos los botones
                activeButton = null; // Reiniciar el botón activo
            } else {
                // Si es un nuevo botón, renderizar personajes filtrados
                const filteredCharacters = char.characters.filter(character => character.rank === filterRank); // Filtrar personajes
                renderCharacters(filteredCharacters); // Renderizar personajes filtrados
                toggleButton(button); // Cambiar el estado de los botones
                activeButton = button; // Establecer el nuevo botón activo
            }
        });
    });
});

function toggleButton(selectedButton) {
    // Obtener todos los botones
    const buttons = document.querySelectorAll('.btn');

    // Iterar sobre cada botón
    buttons.forEach(button => {
        const img = button.querySelector('img');
        if (button === selectedButton) {
            // Si es el botón seleccionado, cambiar a la imagen "on"
            img.src = img.dataset.on;
        } else {
            // Si no es el botón seleccionado, cambiar a la imagen "off"
            img.src = img.dataset.off;
        }
    });
}
