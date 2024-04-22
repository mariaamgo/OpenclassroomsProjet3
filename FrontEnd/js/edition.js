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
    const cardEdition = `<div class="card-edition">
                            <div class = "edition">
                                <i class="fa-regular fa-pen-to-square"></i>
                                <p>Mode édition</p>
                            </div>
                        </div>`;
    header.insertAdjacentHTML('beforebegin', cardEdition);

    const title_portfolio = document.querySelector("#portfolio h2");
    const edition = `<div class= "edition">
                        <i class="fa-regular fa-pen-to-square"></i>
                        <a href="#modal" class="js-modal">modifier</a>
                    </div>`;
    title_portfolio.insertAdjacentHTML('afterend', edition);
    title_portfolio.style = "margin-bottom: 100px";

    const liLogin = document.querySelector("#liLogin");
    liLogin.innerText = "logout";

    const filter = document.querySelector(".filter");
    filter.style = "display : none";
}

