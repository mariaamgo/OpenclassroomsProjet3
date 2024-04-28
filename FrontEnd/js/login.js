import { catchError } from "./error.js";

function login(){
    const formLogin = document.querySelector("form");
    formLogin.addEventListener("submit", (event) => fetchLogin(event));
}

function fetchLogin(event){
    event.preventDefault();
        const log = {
            email: event.target.querySelector("[name=email]").value,
            password: event.target.querySelector("[name=password]").value
        };
        
        fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(log)
        })
        .then(response => {
            if(response.status === 404 || response.status === 401){
                throw new Error("Erreur dans l’identifiant ou le mot de passe.");
            }
            return response.json();
        })
        .then(data => {
            //récupération du token et stockage du token
            const token = data.token;
            sessionStorage.setItem("token", token);
            //console.log(localStorage.getItem("response"));
            window.location.href="../index.html";
        })
        .catch(error => catchError(error));
}
login();

