export function edition(works){
    if(sessionStorage.getItem("response") != null){
        //appel de la fonction modeEdition
        modeEdition();
        liLogin.addEventListener("click", function(){
            sessionStorage.removeItem("response");
            console.log(sessionStorage.getItem("response"));
            window.location.href='../index.html';
        })

        modalGallery(works);
        openModal();
        //deleteWorks();
        backModal(works);
    }
}

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

function modalGallery(works){
    let containerModal = document.querySelector(".container-modal");
    containerModal.innerHTML = `
    <h1 id="title-modal">Galerie photo</h1>
    <div class="contained-modal gallery-modal"></div>
    <button class="button-modal">Ajouter une photo</button>`;
    const arrowLeft = document.querySelector(".fa-arrow-left");
    arrowLeft.style.display = "none";
    for (let i = 0; i < works.length; i++) {
        const containedModal = document.querySelector(".contained-modal");
        const worksElement = document.createElement("figure");
        const imageElement = document.createElement("img");
        const trashIcon = document.createElement("i");

        trashIcon.classList = "fa-solid fa-trash-can";
        trashIcon.id = works[i].id;
        imageElement.src = works[i].imageUrl;
        containedModal.appendChild(worksElement);
        worksElement.appendChild(imageElement);
        worksElement.appendChild(trashIcon);
    }
    modalAddPhoto();
}

function modalAddPhoto(){
    const btnModal = document.querySelector(".button-modal");
    btnModal.addEventListener("click", function(){
        const arrowLeft = document.querySelector(".fa-arrow-left");
        arrowLeft.style.display = "block";
        // Ajouter le contenu à la modal pour ajouter une photo
        btnModal.style = "background-color : #A7A7A7";
        let containerModal = document.querySelector(".container-modal");
        containerModal.innerHTML=`
            <h1 id="title-modal">Ajout photo</h1>
			<div class="contained-modal">
                <form action='login.html' method='post'>
                    <div class='file'>
                        <i class='fa-regular fa-image'></i>
                        <label for='file'>+ Ajouter une photo</label>
                        <input type='file' name='file' id='file'>
                        <p>jpg, png : 4mo max</p>
                    </div>
                    <label>Titre</label>
                    <input type='text' name='title' id='title'>
                    <label>Catégorie</label>
                    <select name='category' id='category'><option></option></select>
                </form>
            </div>
			<button class="button-modal">Valider</button>`;
    })
}

let modal = null;

function openModal(){
    document.querySelector(".js-modal").addEventListener("click", function(e){
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute("href"));
        target.style.display = null;
        target.removeAttribute('aria-hidden');
        target.setAttribute("aria-modal", "true");
        modal = target;
        console.log(modal);
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
}

function stopPropagation(e){
    e.stopPropagation();
}

function backModal(works){
    document.querySelector(".fa-arrow-left").addEventListener("click", function(){
        modalGallery(works);
    });
}