function redirectHomePage(){
        window.location.hash = "home";
        clearFiltersAndDropdowns()
        navigateToHome();
}
function navigateToHome() {
    model.app.currentPage = model.app.pages[0];
    changeView();
}