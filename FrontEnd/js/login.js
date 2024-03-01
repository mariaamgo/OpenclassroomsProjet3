//function login(){
    const formLogin = document.querySelector("#login form")
    const email = "sophie.bluel@test.tld"
    const password = "S0phie"
    formLogin.addEventListener("submit", function(event){
        event.preventDefault()
        const log = {
            email: event.target.querySelector("[name=email]").value,
            password: event.target.querySelector("[name=password]").value
        };

        if(log.email === email && log.password === password){
            console.log("ok")
        }else{
            console.log("raté")
        }
        // Appel de la fonction fetch avec toutes les informations nécessaires
        fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(log)
        })
    })
//}