function updateGroupView() {
    let group = model.data.groups[model.app.selectedGroup];
    let user = model.data.users[model.app.loggedInUser];
    let isMember = group.groupMembers.includes(user.userId)
    let showMember = isMember ? `<img src="IMG/Icons/plus.png" onclick="openPostGroup()"/>` : ''
    document.getElementById('app').innerHTML = `
    <div class="mainHeader">
    ${createMainHeader()}
    <div class="mainMenu">${showMember}</div>
    </div>
    <div class="container">${createDropdownMenu()}</div>
    <div class="groupfeedGrid">
    <h3>${group.groupname}</h3>
    ${checkMemberAndAdmin()}
    </div>
    `;
    checkIfBannedFromSite();
}    
function checkMemberAndAdmin(){
    let html = '';
    let user = model.data.users[model.app.loggedInUser];
    let group = model.data.groups[model.app.selectedGroup];
    if(group.groupMembers.includes(user.userId)){
        if(group.groupAdmins.includes(user.userId)){
            html=`
            <div class="groupAdminTools">
                <button onclick="openMemberGroup()">Fjern medlem</button>
                <button onclick="openAdminGroup()">Legg til admin</button>
            </div>
            ${addAdminGroup() ?? ''}
            ${addMemberGroup() ?? ''}
            `;
        }
        html+=`
        <div class="groupFeed">
            ${addPostGroup() ?? ''}
            ${createGroupFeed()}
            <button onclick="leaveGroup()">Forlat gruppen</button>
        </div>
        `;
    }else if(group.groupBanned.includes(user.userId)){
        html = `
        <img src="IMG/Icons/stop.png" height=150px/>
        Du er ikke ønsket i denne gruppen!
        `;
    }else{
        html=`Bli medlem for å få tilgang til denne gruppen!
           <button onclick="joinGroup(${model.app.selectedGroup})">Join Group</button>
           <button onclick="redirectgroupsMainPage()">Back</button>`;
    }
    return html;
}

function addAdminGroup() {
    if (model.input.group.adminOpen) {
        return `
        <div class="adminGroupContainer">
            <div class="groupTopPost">
                <div>Gjør ett medlem admin</div>
                <img class="groupExitIcon" src="IMG/Icons/x.png" height=50px onclick="closeAdminGroup()"/>
            </div>
            ${createAdminChoices()}
        </div>
        `;
    }
    return '';
}    
function addPostGroup() {
    if (model.input.group.postOpen) {
        return `
        <div class="adminGroupPostContainer">
            <div class="groupTopPost">
                <div>Skriv ett nytt innlegg</div>
                <img class="groupExitIcon" src="IMG/Icons/x.png" height=50px onclick="closePostGroup()"/>
            </div>
            <div class="groupPostInput">
                <input type="text" placeholder="Skriv innlegg" oninput="model.input.group.groupPost=this.value"/>
                <button onclick="postMessage()">Send</button>
            </div>
            <input class="groupPostFile" type="file" onchange="readFilePostGroup(this)"/>
        </div>
        `;
    }
    return '';
}   
function addMemberGroup() {
    if (model.input.group.memberOpen) {
        return `
        <div class="adminGroupContainer">
            <div class="groupTopPost">
                <div>Fjern medlem av gruppen</div>
                <img class="groupExitIcon" src="IMG/Icons/x.png" height=50px onclick="closeMemberGroup()"/>
            </div>
            ${createAdminMemberChoices()}
        </div>
        `;
    }
    return '';
}  
function createAdminChoices(){
    let adminMessage = ''
    let user = model.data.users;
    let group = model.data.groups[model.app.selectedGroup];
    let noResult = true;
        for (let member of group.groupMembers) {
            if (!group.groupAdmins.includes(member)) {
                adminMessage += `
                <div class="innerGroupAdmin">
                    <div class="innerAdminGroupName">${user[member].userName}</div>
                    <button onclick="makeAdmin(${member})">Gjør admin</button>
                </div>
                `;
                noResult = false;
            }
        }
        if (noResult) {
            adminMessage += 'Ingen resultat';
        }
        return adminMessage;
}
function createAdminMemberChoices(){
    let adminMessage = ''
    let user = model.data.users;
    let group = model.data.groups[model.app.selectedGroup];
    let noResult = true;
        for (let member of group.groupMembers) {
            if(member !== model.app.loggedInUser){
                adminMessage += `
                <div class="innerGroupAdmin">
                    <div class="innerAdminGroupName">${user[member].userName}</div>
                    <button onclick="kickMember(${member})">fjern</button>
                </div>
                `;
                noResult = false;
            }
        }
        if (noResult) {
            adminMessage += 'Ingen resultat';
        }
        return adminMessage;
}

function createGroupFeed(){
    let html = '';
    let user = model.data.users[model.app.loggedInUser]
    let group = model.data.groups[model.app.selectedGroup];
    let checkAdmin = model.data.groups[model.app.selectedGroup].groupAdmins.includes(user.userId)
    for(let i = group.groupPosts.length -1 ; i >= 0; i--){
        let groupPost = group.groupPosts[i];
        let isAdmin = checkAdmin ? `<img class="groupDeletePostIcon" src="IMG/Icons/x.png" height=30px onclick="deleteGroupPost(${i})"/>` : ''
        let isNewMember = groupPost.newMember 
        ? `<div onclick="redirectOtherUserPage(${groupPost.userId})"><strong>${model.data.users[groupPost.userId].firstName} ${model.data.users[groupPost.userId].lastName} er nytt medlem</strong></div>` 
        : `<div onclick="redirectOtherUserPage(${groupPost.userId})"><strong>${model.data.users[groupPost.userId].firstName} ${model.data.users[groupPost.userId].lastName}</strong></div>`
        html +=`
            <div class="groupPost">
                ${isNewMember}
                <div>${groupPost.userComment}</div>
                <div><img src="${groupPost.uploadImage ?? ''}" height = "100px"/></div>
                <div style="font-Size: 10px">${groupPost.timeOfUpload}</div>
                ${isAdmin}
            </div>
        `;
    }
    return html;
}