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
    const header = document.querySelector("header");
    //création de la banière mode édition
    const bannerEdition = `<div class="banner-edition">
                            <div class = "edition">
                                <i class="fa-regular fa-pen-to-square"></i>
                                <p>Mode édition</p>
                            </div>
                        </div>`;
    //ajout de bannerEdition avant le header
    header.insertAdjacentHTML('beforebegin', bannerEdition);

    const title_portfolio = document.querySelector("#portfolio h2");
    //création du "bouton" pour modifier
    const edition = `<div class= "edition">
                        <i class="fa-regular fa-pen-to-square"></i>
                        <a href="#modal" class="js-modal">modifier</a>
                    </div>`;
    //ajout de edition après le titre h2 "Mes projets"
    title_portfolio.insertAdjacentHTML('afterend', edition);
    title_portfolio.style = "margin-bottom: 100px";

    const liLogin = document.querySelector("#liLogin");
    //changement de "login" en "logout"
    liLogin.innerText = "logout";

    const filter = document.querySelector(".filter");
    //"suppression" des filtres
    filter.style = "display : none";
}

