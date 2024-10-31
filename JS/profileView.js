function updateProfileView() {
    document.getElementById('app').innerHTML = /*HTML*/`
    <div class="mainHeader">
    <div class="mainMenu" onclick="openDropdownMenu()"><img src="IMG/Icons/menu.png"/></div>
    <h1 onclick="redirectHomePage()">RemoteSocial</h1>
    <div class="mainMenu" onclick="redirectMessagePage()"><img src="IMG/Icons/message.png"/></div>
    </div>
    <div class="container">${createDropdownMenu()}</div>
    
    <div class="mainProfileGrid">
        ${createProfileFirst()}
        ${createProfileSecond()}
        ${createProfileGroup()}
    </div>
    `;
}
function createProfileGroup(){
return`
    <div class="profileGroups">
        ${createGroupList()}
    </div>
    <div class="profileGroupPost">
        ${createGroupPost()}
    </div>
`;
}
function createProfileSecond(){
return`
    <div class="secondProfileLine">
        <div class="profileBulletPoints">
            <li>Brukernavn: ${model.data.users[model.app.loggedInUser].userName}</li>
            <li>Bursdag: ${model.data.users[model.app.loggedInUser].birthday}</li>
            <li>Fra: ${model.data.users[model.app.loggedInUser].city}</li>
            <li>Epost: ${model.data.users[model.app.loggedInUser].email}</li>
            <li>Liker: ${createInterestsList()}</li>
        </div>
    </div>
    `;
}
function createProfileFirst(){
return `
    <div class="firstProfileLine">
        <div class="mainProfileName">
            <h3>${model.data.users[model.app.loggedInUser].firstName} ${model.data.users[model.app.loggedInUser].lastName}</h3>
            <div class="profileTopImage">    
                <img src="${model.data.users[model.app.loggedInUser].userImage}"/>
            </div>
        </div>
        <div class="profileAbout">
                ${model.data.users[model.app.loggedInUser].aboutme}
        </div>
    </div>
`;
}
function createInterestsList(){
    let html = '';
    for(let interest of model.data.users[model.app.loggedInUser].interests) {
        html+= `
        ${interest}, 
        `;
    }
    return html;
}
function createGroupList(){
    let html = '';
    for(let groupId of model.data.users[model.app.loggedInUser].myGroup) {
        html+= `
        <div onclick="redirectGroupPage(${groupId})" class="innerProfileGroup">${model.data.groups[groupId].groupname}</div>
        `;
    }
    return html;
}
function createGroupPost(){
    let html = '';
    for(let groupPost of model.data.users[model.app.loggedInUser].myGroupPosts) {
        html+= `
        <div class="innerProfileGroupPost">
        <div>${model.data.groups[groupPost.groupId].groupname}</div>
        <div style="font-size: 12px">${groupPost.userComment}</div>
        <img src="${groupPost.uploadImage}" height= 80px/>
        <div style="font-size: 10px">${groupPost.timeOfUpload}</div>
        </div>
        `;
    }
    return html;
}