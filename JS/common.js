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
    if (page.startsWith("group-")) {
        page.replace("group-", "");
        navigateToGroup();
    } else if (page === "groups") {
        navigateTogroupsMain();
    } else if (page === "home") {
        navigateToHome();
    } else if (page === "login") {
        navigateToLogin();
    } else if (page === "message") {
        navigateToMessage();
    } else if (page === "profile") {
        navigateToProfile();
    } else if (page.startsWith("friend-")) {
        page.replace("friend-", "");
        navigateToOtherUser();
    } else {
        navigateToHome();
    }
}