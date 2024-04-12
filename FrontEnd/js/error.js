export function fetchResponseError(response, errorMessage) {
    if(!response.ok){
        throw new Error("Erreur : " + errorMessage);
    }
}
 
export function catchError(error, errorMessage) {
    console.error("Erreur : " + errorMessage, error);
    alert("Erreur : " + errorMessage);
}