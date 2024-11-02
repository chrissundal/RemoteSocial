function submitNewUser(){
    let registerUser = model.input.register;
    if(registerUser.userName 
        && registerUser.password 
        && registerUser.firstName 
        && registerUser.lastName 
        && registerUser.birthday 
        && registerUser.city
        && registerUser.email
        && registerUser.userImage 
        && registerUser.aboutme 
        && registerUser.secondpassword) {
        let existingUser = model.data.users.find(user => user.userName === registerUser.userName);
        if (!existingUser) {
            if (registerUser.password === registerUser.secondpassword) {
                let newUserId = model.data.users.length;
                model.data.users.push(
                    {
                        userId: newUserId,
                        userName: model.input.register.userName,
                        password: model.input.register.password,
                        firstName: model.input.register.firstName,
                        lastName: model.input.register.lastName,
                        birthday: model.input.register.birthday,
                        city: model.input.register.city,
                        email: model.input.register.email,
                        userImage: model.input.register.userImage,
                        aboutme: model.input.register.aboutme,
                        interests: [],
                        comments: [],
                        isAdmin: false,
                        friends: [],
                        favorites: [],
                        chatMessages:[],
                        isBanned: false,
                        myGroupPosts: [],
                        myGroup: [],
                        friendRequest: [], 
                    }
                );   
                model.input.register.userName = '';
                model.input.register.password = '';
                model.input.register.secondpassword = '';
                model.input.register.userImage = '';
                model.input.register.aboutme = '';
                model.input.login.showLogin = `Registrering fullført`;
                updateLoginView();
            }else{
                model.input.login.showLogin = `Passord ikke likt`;
                registerNewUser();
            }
        }else{
            model.input.login.showLogin = `Brukernavn allerede tatt`;
            registerNewUser();
        }
    }else{
        model.input.login.showLogin = `Alle felter må fylles ut`;
        registerNewUser();
    }
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