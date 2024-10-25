function updategroupsMainView() {
    document.getElementById('app').innerHTML = /*HTML*/`
    <div class="mainHeader">
    <div class="mainMenu" onclick="openDropdownMenu()"><img src="IMG/icons/menu.png"/></div>
    <h1 onclick="redirectHomePage()">RemoteSocial</h1>
    <div class="mainMenu" onclick="openGroupSearch()"><img src="IMG/Icons/search.png"/></div>
    </div>
    <div class="container">
        ${createDropdownMenu()}
        </div>
        ${model.input.group.showInfo}
        <div class="groupsGrid">
        ${createMainGroups()}
        </div>
    `;
}
function createMainGroups(){
    let html='';
    
    for(let index = 0; index < model.data.groupCategory.length; index++) {
        let CategoryName = model.data.groupCategory[index]
        html += `
            <div class="GroupCategory">
                <div class="innerCategory" onclick="openCategory(${index},'${CategoryName}')">
                    ${model.data.groupCategory[index]}
                </div>
            </div>
        `;
    }
    return html;
}
function openCategory(index, name){
    model.input.group.groupCategory = model.data.groups.filter(group => group.groupCategory.includes(name))
    let showGroups = ''
    if(model.input.group.groupCategory){
        showGroups = showInnerGroups()
    }
    model.input.group.showInfo = `
    <div class="showGroupBox">
    <div class="mainInnerGroups">
    ${model.data.groupCategory[index]}
    <img src="IMG/Icons/x.png" class="closeSearch" height = 40px onclick="closeGroupSearch()"/>
    <div style="margin-top: 20px">${showGroups ?? ''}</div>        
    </div>
    </div>
    `;
    changeView();
}

function showInnerGroups(){
    let html = '';
    for (let index = 0; index < model.input.group.groupCategory.length; index++) {
        let group = model.input.group.groupCategory[index];
        html += `
            <div class="searchResultBox" onclick="redirectGroupPage(${group.groupId})">
                <div class="outerSearchImage"><img src="${group.groupImage}" /></div>
                <div class="searchPageText">${group.groupname}</div>
            </div>
        `;
    }
    return html;
}
function openGroupSearch(){
    model.input.group.showInfo = `
    <div class="showChatBox">
            <div class="mainInnerSearch">
                <div class="InnerSearchTop">
                    <input type="text" placeholder="Søk etter gruppe" oninput="model.input.group.search=this.value"/>
                    <button onclick="showGroupSearchResult()">Søk</button>
                </div>
                    <img src="IMG/Icons/x.png" class="closeSearch" height = 40px onclick="closeGroupSearch()"/>
                    <div class="chatBoxSearch">
                        ${model.input.group.showResult}
                    </div>
            </div>
        </div>
`;
    changeView();
}
function closeGroupSearch(){
    model.input.group.showInfo = '';
    model.input.group.showResult = '';
    changeView();
}

function createSearchGroups() {
    let searchHtml = '';
    for (let index = 0; index < model.input.group.searchResults.length; index++) {
        let group = model.input.group.searchResults[index];
        let user = model.data.users[model.app.loggedInUser];
        let button = !isMember(group, user.userId) ? `<button class="addFriendBtn" onclick="joinGroup(${group.groupId})">Join Group</button>` : `<button class="addFriendBtn" onclick="redirectGroupPage(${group.groupId})">Go to group</button>`;
        searchHtml += `
            <div class="searchResultBox">
                <div class="outerSearchImage"><img src="${group.groupImage}" /></div>
                <div class="searchPageText">${group.groupname}</div>
                ${button}
            </div>
        `;
    }
    return searchHtml;
}