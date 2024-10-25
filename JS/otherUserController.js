function redirectOtherUserPage(friendId){
    model.app.selectedOtherUser = friendId
    let selectedfriend = model.data.users[model.app.selectedOtherUser].userName;
    console.log(selectedfriend)
    window.location.hash = `#friend-${selectedfriend}`;
    clearFiltersAndDropdowns()
    navigateToOtherUser();
}
function navigateToOtherUser() {
    model.app.currentPage = model.app.pages[3];
    changeView();
}