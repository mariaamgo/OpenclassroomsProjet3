export function fetchResponseError(response, errorMessage) {
    if(!response.ok){
        throw new Error("Erreur : " + errorMessage);
    }
}
 
export function catchError(error) {
    console.error(error);
    alert(error.message);
}