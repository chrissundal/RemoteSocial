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
function kickMember(userId) {
    let group = model.data.groups[model.app.selectedGroup];
    let member = model.data.users[userId];
    let memberIndex = member.myGroup.indexOf(model.app.selectedGroup);
    let index = group.groupMembers.indexOf(userId);
    if (memberIndex > -1) member.myGroup.splice(memberIndex, 1);
    if (index > -1) group.groupMembers.splice(index, 1);
    group.groupBanned.push(userId);
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
function deleteGroupPost(postIndex) {
    let group = model.data.groups[model.app.selectedGroup];
    group.groupPosts.splice(postIndex, 1);
    changeView();
}
function leaveGroup(){
    let user = model.data.users[model.app.loggedInUser];
    let group = model.data.groups[model.app.selectedGroup];
    let index = user.myGroup.indexOf(model.app.selectedGroup)
    let groupIndex = group.groupMembers.indexOf(model.app.loggedInUser)
    if (index > -1) user.myGroup.splice(index, 1);
    if (groupIndex > -1) group.groupMembers.splice(groupIndex, 1);
    changeView();
}