function clearFiltersAndDropdowns(){
    model.input.group.showInfo = '';
    model.input.group.showResult = '';
    model.app.isOpenDropdown = false;
    model.input.messages.showChatBox = '';
    model.input.messages.showResult = '';
}
function openDropdownMenu() {
    model.app.isOpenDropdown = true;
    changeView();
}
function closeDropdownMenu() {
    model.app.isOpenDropdown = false;
    changeView();
}
window.onpopstate = function () {
    const page = location.hash.substr(1);
    if (page.startsWith("movie-")) {
        const movieName = page.replace("movie-", "");
        navigateToMovie(movieName);
    } else if (page === "home") {
        navigateToHome();
    } else if (page === "home") {
        navigateToHome();
    } else if (page === "category") {
        navigateToCategory();
    } else if (page === "search") {
        navigateToSearch();
    } else if (page === "profil") {
        navigateToProfile();
    } else if (page.startsWith("friend-")) {
        const friendId = page.replace("friend-", "");
        navigateToOtherUser(friendId);
        
    } else {
        navigateToHome();
    }
}