import { login } from "./login.js";
import { edition } from "./edition.js";
import { getCategories } from "./categories.js";

async function fetchDataAndGenerateWorks() {
    try {

        const response = await fetch("http://localhost:5678/api/works");
        
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données');
        }
        
        let works = await response.json(); //transformation du JSON en tableau
        works = [...new Set(works)]; //transformation d'un ensemble (SET) + retransformation d'un ensemble en tableau pour le dédoublonner

        // Récupération des catégories à partir de la fonction getCategories
        const categories = await getCategories();

        // Appel de la fonction genererWorks avec les données récupérées
        genererWorks(works); 
        
        addButtonEventListeners(works, categories);

        edition(works);
        
    } catch (error) {
        console.error('Erreur :', error.message);
    }
}

// Appel de la fonction fetchDataAndGenerateWorks
fetchDataAndGenerateWorks();

//fonction pour afficher tous les projets
function genererWorks(works) {
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

function addButtonEventListeners(works, categories) {
    const btnAll = document.querySelector(".btn-all");

    //bouton pour afficher tous les projets
    btnAll.addEventListener("click", function () {
        btnBackground();
        btnAll.classList = "active"
        document.querySelector(".gallery").innerHTML = "";
        genererWorks(works);
    });

    //récupération des catégories et création de boutton à l'aide d'une boucle
    for(let i = 0; i < categories.length; i++){
        const filter = document.querySelector(".filter");
        const button = document.createElement("button");
        button.innerText = categories[i].name;
        button.classList = `button-${categories[i].id}`;
        filter.appendChild(button); 
        
        //filtre des projets en fonction de la catégorie cliquée
        button.addEventListener("click", function () {
            btnBackground();
            button.classList = "active"
            const worksFiltrees = works.filter(function (works) {
                //vérifier si la catégorie de l'oeuvre correspond à l'id de la catégorie du bouton
                return works.category.id === categories[i].id;
            });
            document.querySelector(".gallery").innerHTML = "";
            genererWorks(worksFiltrees);
        });
    }
}
