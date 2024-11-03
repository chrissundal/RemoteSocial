function redirectHomePage(){
        window.location.hash = "home";
        clearFiltersAndDropdowns()
        navigateToHome();
}
function navigateToHome() {
    model.app.currentPage = model.app.pages[0];
    changeView();
}

function getAllPostMyGroups() {
    gatherAllGroupPosts();
    model.input.frontPage.feed.sort((a, b) => b.realTime - a.realTime);
    return createFeedPosts();
}
function collectGroupPosts(group) {
    let posts = group.groupPosts;
    if (posts && posts.length > 0) {
        for (let post of posts) {
            model.input.frontPage.feed.push({
                post: post.index,
                groupId: group.groupId,
                userId: post.userId,
                uploadImage: post.uploadImage,
                userComment: post.userComment,
                timeOfUpload: post.timeOfUpload,
                realTime: post.realTime,
                newMember: post.newMember
            });
        }
    }
}
function gatherAllGroupPosts() {
    let loggedInUser = model.data.users[model.app.loggedInUser];
    let myGroup = loggedInUser.myGroup;
    model.input.frontPage.feed = [];
    let groups = model.data.groups.filter(group => myGroup.includes(group.groupId));
    for (let group of groups) {
        collectGroupPosts(group);
    }
}
function banMainUser(userId){
    model.data.users[userId].isBanned = true;
    changeView();
}
function unbanMainUser(userId){
    model.data.users[userId].isBanned = false;
    changeView();
}
function setMainAdmin(userId){
    model.data.users[userId].isAdmin = true;
    changeView();
}
function removeMainAdmin(userId){
    model.data.users[userId].isAdmin = false;
    changeView();
}
function openAdminTools(){
    model.input.frontPage.adminMenu = true;
    changeView();
}
function closeAdminTools(){
    model.input.frontPage.adminMenu = false;
    changeView();
}
function triggerAdminSearch() {
    searchMembersAdmin();
    changeView();
}
function resetAdminSearch() {
    model.input.frontPage.adminSearch = '';
    searchMembersAdmin();
    changeView();
}
function searchMembersAdmin() {
    model.input.frontPage.members = model.data.users
        .filter(member => 
            member.userName.toLowerCase().includes(model.input.frontPage.adminSearch.toLowerCase())
        ).sort((a, b) => {
            if (a.isBanned && !b.isBanned) return -1;
            if (!a.isBanned && b.isBanned) return 1;
            return a.userName.localeCompare(b.userName);
        });
}
