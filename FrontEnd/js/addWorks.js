import { addFigure } from "./works.js";
import { emptyForm } from "./modal.js";
import { fetchResponseError, catchError } from "./error.js";

//fonction pour ajouter de nouveaux travaux à la galerie
export function addWork(works){
    const formModal = document.querySelector(".modal-content form");
    formModal.addEventListener("submit", (event) => postWorks(event, works));
}

function postWorks(event, works){
    //empêcher le rechargement de la page
    event.preventDefault();
    //récupération du token
    const token = sessionStorage.getItem("token");
    //récupération de la valeur des input
    const file = event.target.querySelector("[name=file]");
    const title = event.target.querySelector("[name=title]").value;
    const category = event.target.querySelector("[name=category]").value;
    //alert si les champs ne sont pas remplis
    if (!file.files[0] || !title || !category) {
        alert("Veuillez remplir tous les champs");
        return;
    }

    //création d'un formData pour construire un ensemble de paires clé/valeur
    let formData = new FormData();

    formData.append("image", file.files[0]);
    formData.append("title", title);
    formData.append("category", category);

    fetchPostWorks(formData, works, token);
}

function fetchPostWorks(formData, works, token){
    //stockage des valeurs dans l'api swagger
    fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: { 
            "Authorization" : `Bearer ${token}`,
            "accept": "application/json"
        },
        body: formData
    })
    //fetchResponseError : fonction qui vient de la page error.js
    .then(response => (fetchResponseError(response, "Une erreur s'est produite lors de l'ajout"), response.json()))
    .then(data => {
        //ajout des données de data à la fin du tableau works
        works.push(data);
        //récupération du dernier index
        let indexLastElement = works.length - 1;
        
        //appel de la fonction add figure pour ajouter la nouvelle image dans la galerie
        addFigure(works, indexLastElement);
        
        //vider le formulaire 
        emptyForm();
        
        alert("Ajout de l'image réussi");
    })
    .catch(error => catchError(error));//catchError : fonction qui vient de la page error.js
}