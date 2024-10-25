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

