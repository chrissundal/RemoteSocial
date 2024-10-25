function updateGroupView() {
    let user = model.data.users[model.app.loggedInUser];
    let group = model.data.groups[model.app.selectedGroup];
    let isMember = group.groupMembers.includes(user.userId);

    let groupContent = isMember 
        ? `<div class="groupFeed">${createGroupFeed()}</div>`
        : `Bli medlem for å få tilgang til denne gruppen!
           <button onclick="joinGroup(${model.app.selectedGroup})">Join Group</button>
           <button onclick="redirectgroupsMainPage()">Back</button>`;

    document.getElementById('app').innerHTML = `
        <div class="mainHeader">
            <div class="mainMenu" onclick="openDropdownMenu()"><img src="IMG/icons/menu.png"/></div>
            <h1 onclick="redirectHomePage()">RemoteSocial</h1>
            <div class="mainMenu" onclick="redirectMessagePage()"><img src="IMG/Icons/message.png"/></div>
        </div>
        <div class="container">
            ${createDropdownMenu()}
        </div>
        <div class="groupfeedGrid">
            <h3>${group.groupname}</h3>
            ${groupContent}
        </div>
    `;
}    
function createGroupFeed(){
    let html = '';
    
    for(let groupPost of model.data.groups[model.app.selectedGroup].groupPosts){
        let isNewMember = groupPost.newMember 
        ? `<div onclick="redirectOtherUserPage(${groupPost.userId})"><strong>${model.data.users[groupPost.userId].firstName} ${model.data.users[groupPost.userId].lastName} er nytt medlem</strong></div>` 
        : `<div onclick="redirectOtherUserPage(${groupPost.userId})"><strong>${model.data.users[groupPost.userId].firstName} ${model.data.users[groupPost.userId].lastName}</strong></div>`
        html +=`
            <div class="groupPost">
                ${isNewMember}
                <div>${groupPost.userComment}</div>
                <div><img src="${groupPost.uploadImage ?? ''}" height = "100px"/></div>
                <div style="font-Size: 10px">${groupPost.timeOfUpload}</div>
            </div>
        `;
    }
    return html;
}