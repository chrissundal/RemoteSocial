function updateOtherUserView() {
    document.getElementById('app').innerHTML = /*HTML*/`
    <div class="mainHeader">
    <div class="mainMenu" onclick="openDropdownMenu()"><img src="IMG/icons/menu.png"/></div>
    <h1 onclick="redirectHomePage()">RemoteSocial</h1>
    <div class="mainMenu" onclick="redirectMessagePage()"><img src="IMG/Icons/message.png"/></div>
    </div>
    <div class="container">
        ${createDropdownMenu()}
        </div>
        <h3>friend</h3>
        <h3>bruker: ${model.app.selectedOtherUser} brukernavn: ${model.data.users[model.app.selectedOtherUser].userName}</h3>
    `;
}