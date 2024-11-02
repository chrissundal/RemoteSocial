function updateLoginView(){
    document.getElementById('app').innerHTML = /*HTML*/`
    <div class="loginContainer">
        <div class="mainloginBox">
            <div class="loginBox">
                <input type="text" placeholder="Skriv brukernavn" oninput="model.input.login.userName=this.value" required>
                <input type="password" placeholder="Skriv Passord" oninput="model.input.login.password=this.value" required>
                ${model.input.login.showLogin}
                <button onclick="getUserNamePassword()">Logg inn</button>
                <button onclick="registerNewUser()">Registrer</button>
            </div>
        </div>
    </div>
    `;   
}
function checkIfBannedFromSite(){
    let loggedInUser = model.data.users[model.app.loggedInUser];
    if(loggedInUser.isBanned){
    document.getElementById('app').innerHTML = `
        <div class="stopMessage">
        <img src="IMG/Icons/stop.png" height=150px/>
        Wow!<br> Du må virkelig ha gjort noen forbannet!
        <br>Du er ikke ønsket her...
        </div>
        `;
    }
}