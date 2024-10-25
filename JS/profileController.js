function redirectProfilePage(){
    window.location.hash = "profile";
    clearFiltersAndDropdowns();
    navigateToProfile();
}
function navigateToProfile() {
    model.app.currentPage = model.app.pages[2];
    changeView();
}