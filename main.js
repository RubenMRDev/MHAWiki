const requestCharactersURL = "../json/chars.json";
const requesPosterURL = "../json/posters.json";

const charactersDiv= document.getElementById("characterMenuContainer");
const postersDiv= document.getElementById("posterMenuContainer");
        

//0 -> Characters
//1 -> Gallery
let menuIndex=0;

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
    const response = await fetch(requestCharactersURL);
    const char = await response.json();
    return char;
}

async function fetchPostersJson() {
    const response = await fetch(requesPosterURL);
    const poster = await response.json();
    return poster;
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
        let color = char.characters[i].color;

        characterSection.innerHTML += `
    <div class="card mx-auto mb-4 ${rank}" style="position: relative; width: 18rem;">
        <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-image: url(images/UI/test.png); background-size: 100px; z-index: 1;"></div>
        <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(${color}); z-index: 2;"></div>
        <img src="${url}" class="card-img-top outline-img mt-3" alt="..." style=" width: 17rem; height: 25rem; object-fit: contain;  filter: drop-shadow(-10px -10px 0 rgba(26, 26, 26, 0.27));  position: relative; z-index: 3;">
        <div class="card-body" style="position: relative; z-index: 3;">
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

fetchPostersJson().then(poster=>{
    const posterSection= document.getElementById("posterSection");

    for(let i=0;i<poster.posters.length;i++){
        
        let id = poster.posters[i].id;
        let url = poster.posters[i].url;

        posterSection.innerHTML+=`
            <img class="img mx-auto mb-5 " src="${url}" alt="Card image cap" style="width: 18rem; object-fit: contain;">
        `;
    }
})

function characterMenu(){
    if(menuIndex==1){
        charactersDiv.style.display="block";
        postersDiv.style.display="none";
        document.getElementById("characterButton").setAttribute("src","images/UI/navhead_chara_on.png")
        document.getElementById("galleryButton").setAttribute("src","images/UI/navhead_gallery.png")
        document.getElementById("h2indicator").setAttribute("src", "images/UI/character_h2.webp")


        menuIndex=0;
    }else{
        console.log("Estas en el mismo");
    }
}

function galleryMenu(){
    if(menuIndex==0){
        charactersDiv.style.display="none";
        postersDiv.style.display="block";
        document.getElementById("characterButton").setAttribute("src","images/UI/navhead_chara.png")
        document.getElementById("galleryButton").setAttribute("src","images/UI/navhead_gallery_on.png")
        document.getElementById("h2indicator").setAttribute("src", "images/UI/gallery_h2.png")
        menuIndex=1;
    }else{
        console.log("Estas en el mismo");
    }
}

const students = document.getElementsByClassName("Student");
const heroes = document.getElementsByClassName("Hero");
const villains = document.getElementsByClassName("Villain");
const profesors = document.getElementsByClassName("Profesor");

let studentActive=false;
let villainActive=false;
let heroActive=false;
let profesorActive=false;

const studentButton= document.getElementById("studentButton");
const heroButton= document.getElementById("heroButton");
const villainButton= document.getElementById("villainButton");
const profesorButton= document.getElementById("profesorButton");

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
    for(let villain of villains){
        villain.style.display="none";
    }
    for(let profesor of profesors){
        profesor.style.display="none";
    }
}

function showAll(){
    for(let student of students){
        student.style.display="block";
    }
    for(let hero of heroes){
        hero.style.display="block";
    }
    for(let villain of villains){
        villain.style.display="block";
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
        profesor=false;
        villainActive=false;
        changeImageButton(studentButton,"images/UI/nav_chara_group01_on.png");
        changeImageButton(villainButton,"images/UI/nav_chara_group06_off.png");
        changeImageButton(heroButton,"images/UI/nav_chara_group05_off.png");
        changeImageButton(profesorButton,"images/UI/nav_chara_group04_off.png");


    }else{
        showAll()
        studentActive=false;
        changeImageButton(studentButton,"images/UI/nav_chara_group01_off.png");
        changeImageButton(villainButton,"images/UI/nav_chara_group06_off.png");
        changeImageButton(heroButton,"images/UI/nav_chara_group05_off.png");
        changeImageButton(profesorButton,"images/UI/nav_chara_group04_off.png");
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
        villainActive=false;
        profesor=false;
        
        changeImageButton(studentButton,"images/UI/nav_chara_group01_off.png");
        changeImageButton(villainButton,"images/UI/nav_chara_group06_off.png");
        changeImageButton(heroButton,"images/UI/nav_chara_group05_on.png");
        changeImageButton(profesorButton,"images/UI/nav_chara_group04_off.png");

    }else{
        showAll()
        heroActive=false;
        
        changeImageButton(studentButton,"images/UI/nav_chara_group01_off.png");
        changeImageButton(villainButton,"images/UI/nav_chara_group06_off.png");
        changeImageButton(heroButton,"images/UI/nav_chara_group05_off.png");
        changeImageButton(profesorButton,"images/UI/nav_chara_group04_off.png");

    }
}
function showProfesors(){
    if(!profesorActive){
        hideAll()
        for(let profesor of profesors){
            profesor.style.display="block";
        }
        heroActive=false;
        profesorActive=true;
        studentActive=false;
        villainActive=false;
        
        changeImageButton(studentButton,"images/UI/nav_chara_group01_off.png");
        changeImageButton(villainButton,"images/UI/nav_chara_group06_off.png");
        changeImageButton(profesorButton,"images/UI/nav_chara_group04_on.png");
        changeImageButton(heroButton,"images/UI/nav_chara_group05_off.png");

    }else{
        showAll()
        profesorActive=false;
        
        changeImageButton(studentButton,"images/UI/nav_chara_group01_off.png");
        changeImageButton(villainButton,"images/UI/nav_chara_group06_off.png");
        changeImageButton(profesorButton,"images/UI/nav_chara_group04_off.png");
        changeImageButton(heroButton,"images/UI/nav_chara_group05_off.png");

    }
}

function showVillains(){
    if(!villainActive){
        hideAll()
        for(let villain of villains){
            villain.style.display="block";
        }
        villainActive=true;
        studentActive=false;
        profesorActive=false;
        heroActive=false;
        
        changeImageButton(studentButton,"images/UI/nav_chara_group01_off.png");
        changeImageButton(villainButton,"images/UI/nav_chara_group06_on.png");
        changeImageButton(heroButton,"images/UI/nav_chara_group05_off.png");
        changeImageButton(profesorButton,"images/UI/nav_chara_group04_off.png");
    }else{
        showAll()
        villainActive=false;
        
        changeImageButton(studentButton,"images/UI/nav_chara_group01_off.png");
        changeImageButton(villainButton,"images/UI/nav_chara_group06_off.png");
        changeImageButton(heroButton,"images/UI/nav_chara_group05_off.png");
        changeImageButton(profesorButton,"images/UI/nav_chara_group04_off.png");
        
    }
}   
