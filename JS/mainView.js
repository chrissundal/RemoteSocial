function updateMainView() {
    document.getElementById('app').innerHTML = /*HTML*/`
    <div class="mainHeader">
    ${createMainHeader()}
    <div class="mainMenu" onclick="redirectMessagePage()"><img src="IMG/Icons/message.png"/></div>
    </div>
    <div class="container">
    ${createDropdownMenu()}
    </div>
    <h3>Forside</h3>
    <h3>bruker: ${model.app.loggedInUser} brukernavn: ${model.data.users[model.app.loggedInUser].userName}</h3>
    `;
    checkIfBannedFromSite();
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