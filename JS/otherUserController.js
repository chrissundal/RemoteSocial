function redirectOtherUserPage(friendId){
    model.app.selectedOtherUser = friendId
    window.location.hash = "friend";
    clearFiltersAndDropdowns()
    navigateToOtherUser();
}
function navigateToOtherUser() {
    model.app.currentPage = model.app.pages[3];
    changeView();
}