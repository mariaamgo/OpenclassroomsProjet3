export async function getCategories(){
    try {
        const response = await fetch("http://localhost:5678/api/categories");
        let categories = await response.json();
        categories = [...new Set(categories)]; // Traiter les catégories pour éliminer les doublons
        return categories;
    } catch (error) {
        throw new Error("Une erreur s'est produite lors de la récupération des catégories :", error);
    }
}