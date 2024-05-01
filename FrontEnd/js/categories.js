import { fetchResponseError, catchError } from "./error.js";

export async function getCategories(){
    try {
        const response = await fetch("http://localhost:5678/api/categories");
        //fonction qui vient de la page error.js pour créer une nouvelle erreur
        fetchResponseError(response, "Une erreur s'est produite lors de la récupération des catégories");
        
        let categories = await response.json();
        categories = [...new Set(categories)]; // Traiter les catégories pour éliminer les doublons
        return categories;
    } catch (error) {
        //fonction qui vient de la page error.js pour afficher l'erreur en console et en alert
        catchError(error);
    }
}