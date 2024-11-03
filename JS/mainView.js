function updateMainView() {
    let adminTools = model.data.users[model.app.loggedInUser].isAdmin 
? `<button onclick="openAdminTools()">admin medlemmer</button>`: '';
    document.getElementById('app').innerHTML = /*HTML*/`
    <div class="mainHeader">
    ${createMainHeader()}
    <div class="mainMenu" onclick="redirectMessagePage()"><img src="IMG/Icons/message.png"/></div>
    </div>
    <div class="container">
    ${createDropdownMenu()}
    </div>
    <div class="adminTools">
    ${adminTools}
    ${createAdminTools() ?? ''}
    </div>
    <div class="MainFeedGrid">${getAllPostMyGroups()}</div>
    `;
    checkIfBannedFromSite();
}
function createAdminTools() {
    if (model.input.frontPage.adminMenu) {
        searchMembersAdmin();
        let membersHtml = listAllMembers();
        return `
        <div class="adminToolsPopup">
            <div class="adminToolsText"> 
                <button class="adminToolsResetBtn" onclick="resetAdminSearch()">Reset</button>
                <input placeholder="Søk etter medlem" oninput="model.input.frontPage.adminSearch=this.value"/>
                <button class="adminToolsSearchBtn" onclick="triggerAdminSearch()">Søk</button>
                </div>
            <img src="IMG/Icons/x.png" class="closeAdmin" height="40px" onclick="closeAdminTools()"/>
            ${membersHtml}
        </div>
        `;
    }
}

function listAllMembers() {
    let html = '';
    for (let member of model.input.frontPage.members) {
        if (member.userId !== model.app.loggedInUser) {
            let adminButton = member.isAdmin 
                ? `<button onclick="removeMainAdmin(${member.userId})">Fjern admin</button>` 
                : `<button onclick="setMainAdmin(${member.userId})">Sett admin</button>`;
            let banButton = member.isBanned 
                ? `<button class="unbanButtonAdmin" onclick="unbanMainUser(${member.userId})">Unban</button>` 
                : `<button class="banButtonAdmin" onclick="banMainUser(${member.userId})">Ban</button>`;
            html += `
            <div class="innerAdminToolsMembers">
                <div class="innerAdminToolsImage"><img src="${member.userImage}" height="50px"/></div>
                <div class="innerAdminToolsName" onclick="redirectOtherUserPage(${member.userId})">${member.userName}</div>
                ${adminButton}
                ${banButton}
            </div>
            `;
        }
    }
    return html;
}

function createDropdownMenu() {
    if (model.app.isOpenDropdown == false) return '';
    return `
    <div class="dropDownMenu">
        <div class="mainInnerDrop">
            <div class="userNameHeader">${model.data.users[model.app.loggedInUser].userName}</div>
            <div class="innerDrop" onclick="redirectProfilePage()">Min profil</div>
            <div class="innerDrop" onclick="redirectgroupsMainPage()">Grupper</div>
            <div class="innerDrop" onclick="redirectLoginPage()">Logg ut</div>
            <div class="innerDropClose" onclick="closeDropdownMenu()">Lukk</div>
        </div>
    </div>
    `;
}
function createMainHeader(){
    let html = '';
    if(model.data.users[model.app.loggedInUser].isAdmin){
        html = `
        <div class="mainMenu" onclick="openDropdownMenu()"><img src="IMG/Icons/menu.png"/></div>
        <div style="MainHeaderLogo">
            <h1 onclick="redirectHomePage()">RemoteSocial</h1>
            <h3>ADMIN</h3>
        </div>
        `;
        }else{
        html = `
        <div class="mainMenu" onclick="openDropdownMenu()"><img src="IMG/Icons/menu.png"/></div>
        <h1 onclick="redirectHomePage()">RemoteSocial</h1>
        `;
        }
        return html;
}

function createFeedPosts() {
    let html = '';
    if(model.input.frontPage.feed.length === 0){
    html = `
    <div class="welcomeMessage">
    <div>Velkommen ${model.data.users[model.app.loggedInUser].firstName}<br>Her vil det komme feeder fra grupper du blir medlem av så fort du blir medlem.<br> Prøv da vel! </div>
    <button onclick="redirectProfilePage()">Profil</button>
    <button onclick="redirectMessagePage()">Meldinger</button>
    <button onclick="redirectgroupsMainPage()">Grupper</button>
    </div>
    `;
    }
    for (let post of model.input.frontPage.feed) {
        let user = model.data.users[post.userId];
        let groupName = model.data.groups[post.groupId].groupname;
        let isNewMember = post.newMember ? 'er nytt medlem' : `<div style="font-size: 12px">${post.userComment}</div>`;
        
            html += `
            <div class="MainFeedPost">
            <div class="mainFeedInnerTop">
            <strong><div onclick="redirectOtherUserPage(${post.userId})">${user.firstName} ${user.lastName}</div></strong>
            i gruppen <strong><div onclick="redirectGroupPage(${post.groupId})">${groupName}</div></strong>
            </div>
            ${isNewMember}
            <div><img src="${post.uploadImage ?? ''}" height="100px"/></div>
            <div style="font-size: 10px">${post.timeOfUpload}</div>
            </div>
            `;
            
    }
    return html;
}