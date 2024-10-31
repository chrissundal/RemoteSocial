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
function openAdminGroup() {
    model.input.group.adminOpen = true;
    changeView();
}
function closeAdminGroup() {
    model.input.group.adminOpen = false;
    changeView();
}
function openMemberGroup() {
    model.input.group.memberOpen = true;
    changeView();
}
function closeMemberGroup() {
    model.input.group.memberOpen = false;
    changeView();
}
function openPostGroup() {
    model.input.group.postOpen = true;
    changeView();
}
function closePostGroup() {
    model.input.group.postOpen = false;
    changeView();
}
function kickMember(userId){
    let group = model.data.groups[model.app.selectedGroup];
    let index = group.groupMembers.indexOf(userId);
    group.groupMembers.splice(index, 1);
    changeView();
}
function makeAdmin(userId){
    model.data.groups[model.app.selectedGroup].groupAdmins.push(userId)
    changeView();
}
function readFilePostGroup(input) {
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            model.input.group.groupImage = event.target.result;
        }
        reader.readAsDataURL(file);
    }
}
function postMessage(){
    let timeHere = new Date().toLocaleString();
    model.data.groups[model.app.selectedGroup].groupPosts.push(
        {
            userId: model.app.loggedInUser,
            uploadImage: model.input.group.groupImage,
            userComment: model.input.group.groupPost,
            timeOfUpload: timeHere,
            newMember: false,
        }
    )
    model.data.users[model.app.loggedInUser].myGroupPosts.push(
        {
            groupId: model.app.selectedGroup,
            uploadImage: model.input.group.groupImage,
            userComment: model.input.group.groupPost,
            timeOfUpload: timeHere,
            newMember: false,
        }
    )
    model.input.group.postOpen = false;
    changeView();
}