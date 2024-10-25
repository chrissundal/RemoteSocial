function redirectGroupPage(groupId){ 
    model.app.selectedGroup = groupId 
    let groupName = model.data.groups[model.app.selectedGroup].groupname;
    window.location.hash = `#group-${groupName}`;
    clearFiltersAndDropdowns()
    navigateToGroup();
}
function navigateToGroup() {
    model.app.currentPage = model.app.pages[4];
    changeView();
}