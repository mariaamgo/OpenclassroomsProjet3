import { getCategories } from "./categories.js";
import { addWork } from "./addWorks.js";
import { deleteWorks } from "./deleteWorks.js";

let modal = null;
//fonction pour ouvrir la fenêtre modale
export function openModal(works){
    document.querySelector(".js-modal").addEventListener("click", function(e){
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute("href"));
        target.style.display = null;
        target.removeAttribute('aria-hidden');
        target.setAttribute("aria-modal", "true");
        modal = target;

        //appel de la fonction modalGallery pour afficher le contenue de la fenêtre modale
        modalGallery(works);
        
        //appel de la fonction closeModal pour fermer la fenêtre modale
        modal.addEventListener("click", closeModal);
        modal.querySelector(".close-modal").addEventListener("click", closeModal);
        modal.querySelector(".modal-stop-propagation").addEventListener("click", stopPropagation);

        //appel de la fonction backModal pour retourner à l'autre page de la fenêtre modale
        backModal(works);
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
    btnModal.addEventListener("click", () => styleModalAddPhoto(works, btnModal));
}

function styleModalAddPhoto(works, btnModal){
    const arrowLeft = document.querySelector(".fa-arrow-left");
    arrowLeft.style.display = "block";
    // Ajouter le contenu à la modal pour ajouter une photo
    btnModal.style = "background-color : #A7A7A7";
    //ajout du contenu de la fenêtre modale
    containerModalAddPhoto()
    //appel de la fonction fillOptions pour avoir les options du select
    fillOptions();
    //appel de la fonction previewFile() pour avoir l'aperçu de la photo choisie
    document.querySelector("#file").addEventListener("change", previewFile);
    //appel de la fonction changeBgColor 
    changeBgColor();
    //appel de la fonction addWork pour ajouter une nouvelle image (nouveau projet)
    addWork(works);
}

function containerModalAddPhoto(){
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

//fonction pour vider le formulaire 
export function emptyForm(){
    const imgFile = document.querySelector(".img-file");
    if(imgFile.src){
        imgFile.src = "";
    }
    imgFile.style.display = "none";
    document.querySelector(".file div").style.display= "flex";
    document.querySelector(".modal-content form").reset();
}