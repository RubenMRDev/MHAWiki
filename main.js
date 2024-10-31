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

fetchCharactersJson().then(char=>{
    const characterSection= document.getElementById("characterSection");

    for(let i=0;i<char.characters.length;i++){
        
        let name= char.characters[i].name;
        let url= char.characters[i].url;
        let heroname= char.characters[i].heroname;
        let quirk= char.characters[i].quirk;
        let age= char.characters[i].age;
        let height= char.characters[i].height;
        let rank= char.characters[i].rank;

        characterSection.innerHTML+=`
        <div class="card mx-auto mb-4 bg-warning bg-gradient ${rank}"  style="width: 18rem;">
            <img src="${url}" class="card-img-top outline-img mt-3" alt="..." style="width:17rem; height: 25rem; object-fit: contain;">
            <div class="card-body">
            <h5 class="card-title">${name}</h5>
                    <p class="card-text mb-0">${heroname}</p>
                    <p class="card-text mb-0"><small class="text-body-secondary">Quirk: ${quirk}</small></p>
                    <p class="card-text mb-0"><small class="text-body-secondary">Age: ${age}</small></p>
                    <p class="card-text mb-0"><small class="text-body-secondary">Height: ${height}</small></p>
            </div>
        </div>
        `;

    }
})

const students = document.getElementsByClassName("Student");
const heroes = document.getElementsByClassName("Hero");
const villans = document.getElementsByClassName("Villan");

let studentActive=false;
let villanActive=false;
let heroActive=false;

const studentButton= document.getElementById("studentButton");
const heroButton= document.getElementById("heroButton");
const villanButton= document.getElementById("villanButton");

function changeImageButton(button,url){
    const img= button.querySelector("img");
    img.src= url;
}

function hideAll(){
    for(let student of students){
        student.style.display="none";
    }
    for(let hero of heroes){
        hero.style.display="none";
    }
    for(let villan of villans){
        villan.style.display="none";
    }
}

function showAll(){
    for(let student of students){
        student.style.display="block";
    }
    for(let hero of heroes){
        hero.style.display="block";
    }
    for(let villan of villans){
        villan.style.display="block";
    }
}

function showStudents(){
    if(!studentActive){
        hideAll()
        for(let student of students){
            student.style.display="block";
        }
        studentActive=true;
        heroActive=false;
        villanActive=false;
        changeImageButton(studentButton,"images/UI/nav_chara_group01_on.png");
        changeImageButton(villanButton,"images/UI/nav_chara_group06_off.png");
        changeImageButton(heroButton,"images/UI/nav_chara_group04_off.png");


    }else{
        showAll()
        studentActive=false;
        changeImageButton(studentButton,"images/UI/nav_chara_group01_off.png");
        changeImageButton(villanButton,"images/UI/nav_chara_group06_off.png");
        changeImageButton(heroButton,"images/UI/nav_chara_group04_off.png");
    }
}  

function showHeroes(){
    if(!heroActive){
        hideAll()
        for(let hero of heroes){
            hero.style.display="block";
        }
        heroActive=true;
        studentActive=false;
        villanActive=false;
        
        changeImageButton(studentButton,"images/UI/nav_chara_group01_off.png");
        changeImageButton(villanButton,"images/UI/nav_chara_group06_off.png");
        changeImageButton(heroButton,"images/UI/nav_chara_group04_on.png");

    }else{
        showAll()
        heroActive=false;
        
        changeImageButton(studentButton,"images/UI/nav_chara_group01_off.png");
        changeImageButton(villanButton,"images/UI/nav_chara_group06_off.png");
        changeImageButton(heroButton,"images/UI/nav_chara_group04_off.png");

    }
}

function showVillans(){
    if(!villanActive){
        hideAll()
        for(let villan of villans){
            villan.style.display="block";
        }
        villanActive=true;
        studentActive=false;
        heroActive=false;
        
        changeImageButton(studentButton,"images/UI/nav_chara_group01_off.png");
        changeImageButton(villanButton,"images/UI/nav_chara_group06_on.png");
        changeImageButton(heroButton,"images/UI/nav_chara_group04_off.png");
    }else{
        showAll()
        villanActive=false;
        
        changeImageButton(studentButton,"images/UI/nav_chara_group01_off.png");
        changeImageButton(villanButton,"images/UI/nav_chara_group06_off.png");
        changeImageButton(heroButton,"images/UI/nav_chara_group04_off.png");
        
    }
}   
