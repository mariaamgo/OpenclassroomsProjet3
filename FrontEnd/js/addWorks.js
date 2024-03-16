export function addWork(){
    const formModal = document.querySelector(".container-modal form");
    formModal.addEventListener("submit", function(event){
        event.preventDefault();
        const newWork = {
            file: event.target.querySelector("[name=file]").value,
            title: event.target.querySelector("[name=title]").value,
            category: event.target.querySelector("[name=category]").value
        };
        console.log(newWork)
            // fetch("http://localhost:5678/api/users/login", {
            //     method: "POST",
            //     headers: {
                //     Authorization : `Bearer ${token}`,
                //     accept: "*/*"
            // },
            //     body: JSON.stringify(log)
            // })
            // .then(response => {
            //     return response.json();
            // })
            // .then(data => {
            //     if(data.token === undefined){
            //         const error = document.querySelector("#error");
            //         error.innerText = "Erreur dans l’identifiant ou le mot de passe";
            //     }else{
            //         const token = data.token;
            //         sessionStorage.setItem("response", token);
            //         //console.log(localStorage.getItem("response"));
            //         window.location.href='../index.html';
            //     }
            // })
        

    });
}