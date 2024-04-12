//fonction de deconnexion
export function logout(){
    liLogin.addEventListener("click", function(){
        //retirer le token du sessionStorage
        sessionStorage.removeItem("response");
        console.log(sessionStorage.getItem("response"));
        //redirection vers la page de connexion
        window.location.href='../html/login.html';
    })
}