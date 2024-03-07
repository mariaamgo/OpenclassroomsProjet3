export function login(){
    const formLogin = document.querySelector("form");
    formLogin.addEventListener("submit", function(event){
        event.preventDefault();
        const log = {
            email: event.target.querySelector("[name=email]").value,
            password: event.target.querySelector("[name=password]").value
        };
        console.log(log)
            fetch("http://localhost:5678/api/users/login", {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(log)
            })
            .then(response => {
                return response.json();
            })
            .then(data => {
                if(data.token === undefined){
                    const error = document.querySelector("#error");
                    error.innerText = "Erreur dans l’identifiant ou le mot de passe";
                }else{
                    const token = data.token;
                    localStorage.setItem("response", token);
                    //console.log(localStorage.getItem("response"));
                    window.location.href='../index.html';
                }
            })
        

    });
}
login();

