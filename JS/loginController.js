function redirectLoginPage(){
    window.location.hash = "login";
    navigateToLogin();
}
function navigateToLogin() {
    model.app.currentPage = model.app.pages[1];
    changeView();
}
function getUserNamePassword(){
    let user = model.data.users.find(user => user.userName === model.input.login.userName && user.password === model.input.login.password)
    if(user){
        model.app.loggedInUser = user.userId
        model.input.login.showLogin = 'Sender deg videre...'
        updateLoginView()
        delayLogin()
    }else{
        model.input.login.showLogin = 'Feil passord eller brukernavn'
        updateLoginView()
    }
    
}
function delayLogin(){
    setTimeout(redirectHomePage, 2000)
    model.input.login.showLogin = ''
}