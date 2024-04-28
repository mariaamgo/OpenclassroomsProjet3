import { fetchResponseError, catchError } from "./error.js";

//fonction pour supprimer les travaux
export function deleteWorks(works) {
    const logoDelete = document.querySelectorAll(".fa-trash-can");
    logoDelete.forEach(element => {
        element.addEventListener("click", (event) => fecthDelete(event, works));
    });
}

function fecthDelete(event, works){
    const id = event.target.id;
    //appel de la balise figure dans la galerie principale
    const figure = document.getElementById(`figure${id}`);
    const token = sessionStorage.getItem("token");
    
    fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization" : `Bearer ${token}`,
            "accept": "*/*"
        }
    })
    .then(response => (fetchResponseError(response, "Une erreur s'est produite lors de la suppression."), response))
    .then(data => {
        //trouver l'index de l'élément cliqué
        const index = works.findIndex((indexElement) => indexElement.id === parseInt(id));
        //suppression dans le tableau works de l'élément cliqué
        works.splice(index, 1);

        //suppression de l'élément parent de l'icône de suppression 
        event.target.parentElement.remove();
        //suppression de l'élément figure 
        figure.remove();
    
        alert("La suppression a été réalisée avec succès");  
    })
    .catch(error => catchError(error));
}