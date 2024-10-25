function registerNewUser(){
    document.getElementById('app').innerHTML = `
    <div class="loginContainer">
        <div class="mainloginBox">
            <div class="loginBox">
                <input type="text" placeholder="Nytt brukernavn" value="${model.input.register.userName ?? ''}" oninput="model.input.register.userName=this.value" required>
                <input type="password" placeholder="Nytt Passord" value="${model.input.register.password ?? ''}" oninput="model.input.register.password=this.value" required>
                <input type="password" placeholder="Gjenta Passord" value="${model.input.register.secondpassword ?? ''}" oninput="model.input.register.secondpassword=this.value" required>
                <input type="text" placeholder="Fornavn" value="${model.input.register.firstName ?? ''}" oninput="model.input.register.firstName=this.value" required>
                <input type="text" placeholder="Etternavn" value="${model.input.register.lastName ?? ''}" oninput="model.input.register.lastName=this.value" required>
                <div class="registerBorn">
                    Født: <input type="date" placeholder="Født" value="${model.input.register.birthday ?? ''}" oninput="model.input.register.birthday=this.value" required>
                </div>
                <input type="text" placeholder="By" value="${model.input.register.city ?? ''}" oninput="model.input.register.city=this.value" required>
                <input type="email" placeholder="Epost" value="${model.input.register.email ?? ''}" oninput="model.input.register.email=this.value" required>
                <input type="file" class="file-input" value="${model.input.register.userImage ?? ''}" onchange="readFileLogin(this)">
                <input type="text" placeholder="Om meg" value="${model.input.register.aboutme ?? ''}" oninput="model.input.register.aboutme=this.value" required>
                ${model.input.login.showLogin}
                <button onclick="submitNewUser()">Registrer</button>
                <button onclick="cancelNewUser()">Avbryt</button>
            </div>
        </div>
    </div>
    `;
}