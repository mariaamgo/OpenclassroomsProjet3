import { addFigure } from "./works.js";
import { getCategories } from "./categories.js";

export function edition(works){
    if(sessionStorage.getItem("response") != null){
        //appel de la fonction modeEdition
        modeEdition();
        //appel de la fonction de deconnexion
        logOut();
        //appel de la fonction de modal
        modalGallery(works);
        openModal();
        backModal(works);
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

//fonction pour créer le contenue de la fenêtre modale galerie
function modalGallery(works){
    let containerModal = document.querySelector(".container-modal");
    containerModal.innerHTML = `
    <h1 id="title-modal">Galerie photo</h1>
    <div class="modal-content gallery-modal"></div>
    <button class="button-modal">Ajouter une photo</button>`;
    const arrowLeft = document.querySelector(".fa-arrow-left");
    arrowLeft.style.display = "none";
    for (let i = 0; i < works.length; i++) {
        const modalContent = document.querySelector(".gallery-modal");
        const worksElement = document.createElement("figure");

        const imageElement = document.createElement("img");
        const trashIcon = document.createElement("i");

        trashIcon.classList = "fa-solid fa-trash-can";
        trashIcon.id = works[i].id;
        imageElement.src = works[i].imageUrl;
        modalContent.appendChild(worksElement);
        worksElement.appendChild(imageElement);
        worksElement.appendChild(trashIcon);
    }
    //appel de la fonction modalAddPhoto pour ouvrir "Ajout photo"
    modalAddPhoto(works);
    //appel de la fonction deleteWorks pour supprimer les projets cliquée
    deleteWorks(works);
}

//fonction pour créer le contenue de la fenêtre modale formulaire
function modalAddPhoto(works){
    const btnModal = document.querySelector(".button-modal");
    btnModal.addEventListener("click", function(){
        const arrowLeft = document.querySelector(".fa-arrow-left");
        arrowLeft.style.display = "block";
        // Ajouter le contenu à la modal pour ajouter une photo
        btnModal.style = "background-color : #A7A7A7";
        let containerModal = document.querySelector(".container-modal");
        containerModal.innerHTML=`
            <h1 id="title-modal">Ajout photo</h1>
            <div class="modal-content">
                <form action="../index.html" method="post">
                    <div class='file'>
                        <img class='img-file'>
                        <div>
                            <i class='fa-regular fa-image'></i>
                            <label for='file' id='label-file'>+ Ajouter une photo</label>
                            <input type='file' name='file' id='file' accept='.png, .jpg, .jpeg'>
                            <p>jpg, png : 4mo max</p>
                        </div>
                    </div>
                    <label>Titre</label>
                    <input type='text' name='title' id='title'>
                    <label>Catégorie</label>
                    <select name='category' id='category'><option></option></select>
                    <input type="submit" class="button-modal" value="Valider">
                </form>
            </div>`;

            fillOptions();
            //appel de la fonction previewFile() pour avoir l'aperçu de la photo choisie
            document.querySelector("#file").addEventListener("change", previewFile);
            //appel de la fonction changeBgColor 
            changeBgColor();
            addWork(works);
    });
}

//fonction pour remplir les options du select du formulaire
async function fillOptions(){
    //appel des catégories de la fonction getCategories()
    const categories = await getCategories();
    console.log(categories)
    //boucle sur les catégories
    for(let i = 0; i < categories.length; i++){
        const select = document.querySelector("#category");
        const option = document.createElement("option");
        option.innerText = categories[i].name;
        option.value = categories[i].id;
        select.appendChild(option);
    }
}

//affichage de l'image sélectionnée dans file
function previewFile() {
    const divFile = document.querySelector(".file div");
    const imgFile = document.querySelector(".img-file");
    const file = document.querySelector("#file").files[0];
    
    const maxSize = 4 * 1024 * 1024; //convertion de 4mo en octets
    //vérifier que la taille de l'image ne dépasse pas 4mo
    if (file && file.size > maxSize) {
        alert("L'image fait plus de 4mo");
        return;
    }

    const reader = new FileReader();
    reader.addEventListener(
        "load",
        () => {
        // on convertit l'image en une chaîne de caractères
        imgFile.src = reader.result;
        },
        false,
    );
    //si file = true alors on fait apparaitre l'image, et disparaitre la balise div
    if (file) {
        imgFile.style.display= "inline";
        divFile.style.display= "none";
        reader.readAsDataURL(file);
    }
}

//fonction pour changer la couleur du background de l'input valider quand tous les champs sont remplis
function changeBgColor(){
    const buttonModal = document.querySelector("input.button-modal");
    document.addEventListener("change", function(event){
        const file = document.querySelector("[name=file]");
        const title = document.querySelector("[name=title]").value;
        const category = document.querySelector("[name=category]").value;

        //si tous les champs sont remplis changement de la couleur du bg-color de l'input submit
        if(file.files[0] && title && category){
            buttonModal.style = "background-color : #1D6154; cursor : pointer";
        } else {
            //réinitialiser la couleur à sa valeur par défaut si les champs ne sont pas remplis
            buttonModal.style = "background-color : #A7A7A7; cursor : default";
        }
    });
}

//fonction pour ajouter de nouveaux travaux à la galerie
function addWork(works){
    const formModal = document.querySelector(".modal-content form");
    formModal.addEventListener("submit", function(event){
        event.preventDefault();
        //récupération du token
        const token = sessionStorage.getItem("response");
        //récupération de la valeur des input
        const file = event.target.querySelector("[name=file]");
        const title = event.target.querySelector("[name=title]").value;
        const category = event.target.querySelector("[name=category]").value;
        //alert si les champs ne sont pas remplis
        if (!file.files[0] || !title || !category) {
            alert("Tous les champs ne sont pas remplis");
            return;
        }

        //création d'un formData pour construire un ensemble de paires clé/valeur
        let formData = new FormData();

        formData.append("image", file.files[0]);
        formData.append("title", title);
        formData.append("category", category);

        //stockage des valeurs dans l'api swagger
        fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: { 
                "Authorization" : `Bearer ${token}`,
                "accept": "application/json"
            },
            body: formData
        })
        .then(response => {
            if(!response.ok){
                throw new Error("Erreur lors de l'ajout de la photo");
            }
            return response.json();
        })
        .then(data => {
            //ajout des données de data à la fin du tableau works
            works.push(data);
            //récupération du dernier index
            let indexLastElement = works.length - 1;
            
            //appel de la fonction add figure pour ajouter la nouvelle image dans la galerie
            addFigure(works, indexLastElement);
            
            //vider le formulaire 
            emptyForm();
            
            alert("Ajout de l'image réussi");
        })
        .catch(error => {
            console.error("Une erreur s'est produite lors de l'ajout :", error);
            // Gérer l'erreur
        });     

    });
}

let modal = null;
//fonction pour ouvrir la fenêtre modale
function openModal(){
    document.querySelector(".js-modal").addEventListener("click", function(e){
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute("href"));
        target.style.display = null;
        target.removeAttribute('aria-hidden');
        target.setAttribute("aria-modal", "true");
        modal = target;
        
        //appel de la fonction closeModal pour fermer la fenêtre modale
        modal.addEventListener("click", closeModal);
        modal.querySelector(".close-modal").addEventListener("click", closeModal);
        modal.querySelector(".modal-stop-propagation").addEventListener("click", stopPropagation);
    })
}

function closeModal(){   
    if(modal === null) return;
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    modal.removeAttribute("aria-modal");
    modal.removeEventListener("click", closeModal);
    modal.querySelector(".close-modal").removeEventListener("click", closeModal);
    modal.querySelector(".modal-stop-propagation").removeEventListener("click", stopPropagation);
    modal = null;
    //vider le formulaire 
    emptyForm();
}

function stopPropagation(e){
    e.stopPropagation();
}

function backModal(works){
    document.querySelector(".fa-arrow-left").addEventListener("click", function(){
        modalGallery(works);
    });
}

//fonction pour supprimer les travaux
function deleteWorks(works) {
    const logoDelete = document.querySelectorAll(".fa-trash-can");
    logoDelete.forEach(element => {
        element.addEventListener("click", function(event) { 
            const id = event.target.id;
            //appel de la balise figure dans la galerie principale
            const figure = document.getElementById(`figure${id}`);
            const token = sessionStorage.getItem("response");
            
            fetch(`http://localhost:5678/api/works/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization" : `Bearer ${token}`,
                    "accept": "*/*"
                }
            })
            .then(response => {
                if(!response.ok){
                    throw new Error("Erreur");
                }
                return response;
            })
            .then(data => {
                //suppression de l'élément parent de l'icône de suppression 
                element.parentElement.remove();
                //suppression de l'élément figure 
                figure.remove();
            
                alert("La suppression a été réalisée avec succès");  
            })
            .catch(error => {
                console.error("Erreur lors de la suppression :", error);
                alert("Une erreur s'est produite lors de la suppression.");
            });
        });
    });
}

//fonction pour vider le formulaire 
function emptyForm(){
    const imgFile = document.querySelector(".img-file");
    if(imgFile.src){
        imgFile.src = "";
    }
    imgFile.style.display = "none";
    document.querySelector(".file div").style.display= "flex";
    document.querySelector(".modal-content form").reset();
}

//fonction de deconnexion
function logOut(){
    liLogin.addEventListener("click", function(){
        //retirer le token du sessionStorage
        sessionStorage.removeItem("response");
        console.log(sessionStorage.getItem("response"));
        //redirection vers la page de connexion
        window.location.href='../html/login.html';
    })
}