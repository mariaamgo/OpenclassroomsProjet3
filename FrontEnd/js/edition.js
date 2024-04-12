import { logout } from "./logout.js";
import { openModal } from "./modal.js";

export function edition(works){
    if(sessionStorage.getItem("response") != null){
        //appel de la fonction modeEdition
        modeEdition();
        //appel de la fonction de deconnexion
        logout();
        //appel de la fonction de modal
        openModal(works);
    }
}

//fonction pour changer l'apparence de index.html en mode edition
function modeEdition(){
    const liLogin = document.querySelector("#liLogin");
    liLogin.innerText = "logout";
    const cardEdition = document.querySelector(".card-edition");
        cardEdition.style = "display: block";
        const edition = document.querySelectorAll(".edition");
        for(let i=0; i< edition.length; i++){
            edition[i].style = "display : flex";
        }

        const filter = document.querySelector(".filter");
        filter.style = "display : none";

        const portfolioTitle = document.querySelector(".portfolio-title");
        portfolioTitle.style = "margin-bottom: 100px";
}

