function handleRegistration(registerUser) {
    if (validateRegistrationFields(registerUser)) {
        if (!isExistingUser(registerUser.userName)) {
            if (registerUser.password === registerUser.secondpassword) {
                createNewUser(registerUser);
                blankRegisterFields();
                model.input.login.showLogin = `Registrering fullført`;
                updateLoginView();
            } else {
                model.input.login.showLogin = `Passord ikke likt`;
                registerNewUser();
            }
        } else {
            model.input.login.showLogin = `Brukernavn allerede tatt`;
            registerNewUser();
        }
    } else {
        model.input.login.showLogin = `Alle felter må fylles ut`;
        registerNewUser();
    }
}
function submitNewUser() {
    let registerUser = model.input.register;
    handleRegistration(registerUser);
}

function validateRegistrationFields(registerUser) {
    return registerUser.userName 
        && registerUser.password 
        && registerUser.firstName 
        && registerUser.lastName 
        && registerUser.birthday 
        && registerUser.city
        && registerUser.email
        && registerUser.userImage 
        && registerUser.aboutme 
        && registerUser.secondpassword;
}
function isExistingUser(userName) {
    return model.data.users.find(user => user.userName === userName);
}
function createNewUser(registerUser) {
    let newUserId = model.data.users.length;
    model.data.users.push({
        userId: newUserId,
        userName: registerUser.userName,
        password: registerUser.password,
        firstName: registerUser.firstName,
        lastName: registerUser.lastName,
        birthday: registerUser.birthday,
        city: registerUser.city,
        email: registerUser.email,
        userImage: registerUser.userImage,
        aboutme: registerUser.aboutme,
        interests: [],
        comments: [],
        isAdmin: false,
        friends: [],
        favorites: [],
        chatMessages: [],
        isBanned: false,
        myGroupPosts: [],
        myGroup: [],
        friendRequest: []
    });
}

function blankRegisterFields(){
    model.input.register.userName = '';
    model.input.register.password = '';
    model.input.register.secondpassword = '';
    model.input.register.userImage = '';
    model.input.register.aboutme = '';
    model.input.register.firstName = '';
    model.input.register.lastName = '';
    model.input.register.birthday = '';
    model.input.register.city = '';
    model.input.register.emai = '';
}
function cancelNewUser() {
    model.input.login.showLogin = '';
    updateLoginView()
}
function readFileLogin(input) {
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            model.input.register.userImage = event.target.result;
        }
        reader.readAsDataURL(file);
    }
}