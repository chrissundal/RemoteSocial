function updateProfileView() {
    document.getElementById('app').innerHTML = /*HTML*/`
    <div class="mainHeader">
    <div class="mainMenu" onclick="openDropdownMenu()"><img src="IMG/icons/menu.png"/></div>
    <h1 onclick="redirectHomePage()">RemoteSocial</h1>
    <div class="mainMenu" onclick="redirectMessagePage()"><img src="IMG/Icons/message.png"/></div>
    </div>
    <div class="container">${createDropdownMenu()}</div>
    
    <div class="mainProfileGrid">

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
        <div class="secondProfileLine">
            <div class="profileBulletPoints">
                <li>Brukernavn: ${model.data.users[model.app.loggedInUser].userName}</li>
                <li>Bursdag: ${model.data.users[model.app.loggedInUser].birthday}</li>
                <li>Fra: ${model.data.users[model.app.loggedInUser].city}</li>
                <li>Epost: ${model.data.users[model.app.loggedInUser].email}</li>
                <li>Liker: ${createInterestsList()}</li>
            </div>
        </div>
        <div class="profileGroups">
            ${createGroupList()}
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