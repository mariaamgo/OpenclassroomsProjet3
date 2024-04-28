//fonction de deconnexion
export function logout(){
    liLogin.addEventListener("click", function(){
        //retirer le token du sessionStorage
        sessionStorage.removeItem("token");
        console.log(sessionStorage.getItem("token"));
        //redirection vers la page de connexion
        window.location.href='../html/login.html';
    })
}