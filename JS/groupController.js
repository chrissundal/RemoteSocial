function redirectGroupPage(groupId){ 
    model.app.selectedGroup = groupId 
    window.location.hash = "group";
    clearFiltersAndDropdowns()
    navigateToGroup();
}
function navigateToGroup() {
    model.app.currentPage = model.app.pages[4];
    changeView();
}