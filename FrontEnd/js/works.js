import { edition } from "./edition.js";
import { getCategories } from "./categories.js";
import { fetchResponseError, catchError } from "./error.js";

async function getWorks() {
    try {

        const response = await fetch("http://localhost:5678/api/works");
        
        fetchResponseError(response, "Erreur lors de la récupération des données");
        
        let works = await response.json(); //récupération des données JSON de la réponse
        works = [...new Set(works)]; //suppression des doublons en utilisant un objet Set, retransformation en tableau à partir des éléments uniques

        // Récupération des catégories à partir de la fonction getCategories
        const categories = await getCategories();

        // Appel des fonctions generateWorks, getContainerFilter, buttonFilter et edition avec les données récupérées
        generateWorks(works);
        getContainerFilter(works);
        buttonFilter(works, categories);
        edition(works);
        
    } catch (error) {
        catchError(error);
    }
}

// Appel de la fonction getWorks
getWorks();

//fonction pour afficher tous les projets
function generateWorks(works) {
    for (let i = 0; i < works.length; i++) {
        addFigure(works, i);
    }
}

export function addFigure(works, index){
    const gallery = document.querySelector(".gallery");

    const worksElement = document.createElement("figure");
    worksElement.id = `figure${works[index].id}`;

    const imageElement = document.createElement("img");
    imageElement.src = works[index].imageUrl;

    const titleElement = document.createElement("figcaption");
    titleElement.innerText = works[index].title;

    gallery.appendChild(worksElement);
    worksElement.appendChild(imageElement);
    worksElement.appendChild(titleElement);
}

// Fonction pour réinitialiser l'apparence des boutons de filtre
function btnBackground(){
    const btnFilter = document.querySelectorAll(".filter button");
    for(let i=0; i< btnFilter.length; i++){
        btnFilter[i].classList.remove("active");
    }
}

function getContainerFilter(works){
    const gallery = document.querySelector(".gallery");
    //création d'une div filter 
    const filter = document.createElement("div");
    filter.classList.add("filter");

    const btnAll = document.createElement("button");
    btnAll.innerText = "Tous";
    btnAll.classList.add("active");

    //ajout du bouton all à la div filter
    filter.appendChild(btnAll);
    gallery.insertAdjacentElement('beforebegin', filter);

    //bouton pour afficher tous les projets
    btnAll.addEventListener("click", () => allWorks(works, btnAll));
}

function allWorks(works, btnAll){
    btnBackground();
    btnAll.classList.add("active");
    document.querySelector(".gallery").innerHTML = "";
    generateWorks(works);
}

function buttonFilter(works, categories) {
    //récupération des catégories et création de boutton à l'aide d'une boucle
    for(let i = 0; i < categories.length; i++){
        const filter = document.querySelector(".filter");
        const button = document.createElement("button");
        button.innerText = categories[i].name;
        button.classList.add(`button-${categories[i].id}`);
        filter.appendChild(button); 
        
        //filtre des projets en fonction de la catégorie cliquée
        button.addEventListener("click", () => filterWorks(works, categories, i, button));
    }
}

function filterWorks(works, categories, index, button){
    //réinitialisation de l'apparence des boutons de filtre
    btnBackground();
    //ajout de la class active pour changer l'apparence du bouton cliqué
    button.classList.add("active");
    const worksFiltered = works.filter(function (works) {
        //vérifier si la catégorie de l'oeuvre correspond à l'id de la catégorie du bouton
        return works.category.id === categories[index].id;
    });
    document.querySelector(".gallery").innerHTML = "";
    generateWorks(worksFiltered);
}