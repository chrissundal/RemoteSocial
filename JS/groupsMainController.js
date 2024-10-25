function redirectgroupsMainPage(){ 
    window.location.hash = "groups";
    clearFiltersAndDropdowns()
    navigateTogroupsMain();
}
function navigateTogroupsMain() {
    model.app.currentPage = model.app.pages[6];
    changeView();
}
function showGroupSearchResult() {
    let InputGroupSearch = model.input.group.search;
    model.input.group.searchResults = searchGroups(InputGroupSearch);
    if (model.input.group.searchResults.length === 0) {
        model.input.group.showResult = `<div class="searchResultText">Ingen funnet</div>`;
    } else {
        model.input.group.showResult = createSearchGroups();
    }

    openGroupSearch();
    changeView();
}
function searchGroups(InputGroupSearch) {
    let groupResult = model.data.groups;
    return groupResult.filter(group => 
        group.groupId.toString().includes(InputGroupSearch) || 
        group.groupname.toLowerCase().includes(InputGroupSearch.toLowerCase())
    );
}
function isMember(group, userId) {
    return group.groupMembers.includes(userId);
}
function joinGroup(groupId){
    let thisTime = new Date().toLocaleString()
    let user = model.data.users[model.app.loggedInUser]
    user.myGroup.push(groupId)
    model.data.groups[groupId].groupMembers.push(user.userId)
    model.data.groups[groupId].groupPosts.push(
        {
            userId: user.userId,
            uploadImage: "",
            userComment: "",
            timeOfUpload: thisTime,
            newMember: true,
        }
    )
    showGroupSearchResult()
}