import { login } from "./login.js";
import { edition } from "./edition.js";
//import { addWork } from "./addWorks.js";

async function fetchDataAndGenerateWorks() {
    try {

        const response = await fetch("http://localhost:5678/api/works");
        
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données');
        }
        
        let works = await response.json(); //transformation du JSON en tableau
        works = [...new Set(works)]; //transformation d'un ensemble (SET) + retransformation d'un ensemble en tableau pour le dédoublonner

        // Appel de la fonction genererWorks avec les données récupérées
        genererWorks(works); 
        // Ajout d'écouteurs d'événements avec les données
        addButtonEventListeners(works);
        edition(works);
        addWork();
        

    } catch (error) {
        console.error('Erreur :', error.message);
    }
}

// Appel de la fonction fetchDataAndGenerateWorks
fetchDataAndGenerateWorks();

//fonction pour afficher tous les projets
function genererWorks(works) {
    for (let i = 0; i < works.length; i++) {
        const gallery = document.querySelector(".gallery");
        const worksElement = document.createElement("figure");
        const imageElement = document.createElement("img");
        imageElement.src = works[i].imageUrl;

        const titleElement = document.createElement("figcaption");
        titleElement.innerText = works[i].title;
    
        gallery.appendChild(worksElement);
        worksElement.appendChild(imageElement);
        worksElement.appendChild(titleElement);
    }
}

function addButtonEventListeners(works) {
    const btnAll = document.querySelector(".btn-all");
    const btnObjects = document.querySelector(".btn-objects");
    const btnAppartements = document.querySelector(".btn-appartements");
    const btnHotels = document.querySelector(".btn-hotels");

    // Fonction pour réinitialiser l'apparence des boutons de filtre
    function btnBackground(){
        const btnFilter = document.querySelectorAll(".filter button");
        for(let i=0; i< btnFilter.length; i++){
            btnFilter[i].classList.remove("active");
        }
    }

    btnAll.addEventListener("click", function () {
        btnBackground();
        btnAll.classList = "active"
        document.querySelector(".gallery").innerHTML = "";
        genererWorks(works);
    });

    btnObjects.addEventListener("click", function () {
        btnBackground();
        btnObjects.classList = "active"
        const worksFiltrees = works.filter(function (works) {
            return works.category.id === 1;
        });
        document.querySelector(".gallery").innerHTML = "";
        genererWorks(worksFiltrees);
    });

    btnAppartements.addEventListener("click", function () {
        btnBackground();
        btnAppartements.classList = "active"
        const worksFiltrees = works.filter(function (works) {
            return works.category.id === 2;
        });
        document.querySelector(".gallery").innerHTML = "";
        genererWorks(worksFiltrees);
    });

    btnHotels.addEventListener("click", function () {
        btnBackground();
        btnHotels.classList = "active"
        const worksFiltrees = works.filter(function (works) {
            return works.category.id === 3;
        });
        document.querySelector(".gallery").innerHTML = "";
        genererWorks(worksFiltrees);
    });
}
