function redirectOtherUserPage(friendId){
    if(friendId == model.data.users[model.app.loggedInUser].userId){
        redirectProfilePage()
    }else{
        model.app.selectedOtherUser = friendId
        let selectedfriend = model.data.users[model.app.selectedOtherUser].userName;
        window.location.hash = `#friend-${selectedfriend}`;
        navigateToOtherUser();
    }
    clearFiltersAndDropdowns()
}
function navigateToOtherUser() {
    model.app.currentPage = model.app.pages[3];
    changeView();
}