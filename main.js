const requestURL = "../json/chars.json";


window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');

    setTimeout(() => {
        loadingScreen.style.transition = 'opacity 1s ease';
        loadingScreen.style.opacity = '0';

        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 1000);
    }, 2500);
});

async function fetchCharactersJson() {
    const response = await fetch(requestURL);
    const char = await response.json();
    return char;
}

fetchCharactersJson().then(char => {
    const characterSection = document.getElementById("characterSection");

    function renderCharacters(characters) {
        characterSection.innerHTML = '';
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

    renderCharacters(char.characters);

    const filterButtons = document.querySelectorAll('.btn');

    let activeButton = null;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterRank = button.dataset.filter;
            if (button === activeButton) {
                renderCharacters(char.characters);
                toggleButton(null);
                activeButton = null;
            } else {
                const filteredCharacters = char.characters.filter(character => character.rank === filterRank);
                renderCharacters(filteredCharacters);
                toggleButton(button);
                activeButton = button;
            }
        });
    });
});

function toggleButton(selectedButton) {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        const img = button.querySelector('img');
        if (button === selectedButton) {
            img.src = img.dataset.on;
        } else {
            img.src = img.dataset.off;
        }
    });
}
