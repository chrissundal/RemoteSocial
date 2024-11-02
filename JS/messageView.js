function updateMessageView() {
    let loggedInUser = model.data.users[model.app.loggedInUser];
    let friendRequest = loggedInUser.friendRequest.length > 0 ? `<button style="height: 50px; width: 170px" onclick="openFriendRequest()">Vis venneforespørsler</button>` : ''
    document.getElementById('app').innerHTML = `
    <div class="mainHeader">
        ${createMainHeader()}
        <div class="mainMenu"><img src="IMG/Icons/search.png" onclick="openSearch()"/></div>
    </div>
    <div class="container">${createDropdownMenu()}</div>
    <div class="friendSelectorChat" onscroll="saveScrollPosition()">
        ${createShowFriends() ?? ''}
    </div>
    ${model.input.messages.showChatBox}
    <div class="FriendsContainer">
        ${createFriendsList() ?? ''}
    </div>
    <div class="FriendRequestGrid">
        ${createFriendRequest() ?? ''}
        ${friendRequest}
    </div>
    <button style="height: 50px" onclick="dummyMessage()">Dummy message</button>
    `;
    restoreScrollPosition();
    checkIfBannedFromSite();
}

function pendingFriendRequests(){
    let html = '';
    let loggedInUser = model.data.users[model.app.loggedInUser];
    for(let request of loggedInUser.friendRequest){
        if(!request.hasAccepted){
            html +=`
            <div class="messageFriendRequest">
                <div class="friendRequestTop">
                    <div class="FriendRequestImage">
                        <img src="${model.data.users[request.userId].userImage}" height= 40px/>
                    </div>
                    ${model.data.users[request.userId].firstName} ${model.data.users[request.userId].lastName}
                </div>
            <div style="flex-direction: row">
                <button onclick="acceptFriendRequest(${request.userId})">Godta</button>
                <button onclick="rejectFriendRequest(${request.userId})">Avvis</button>
            </div>
            </div>
            `;
            }
    }
    return html;
}
function createFriendRequest(){
    if(model.input.messages.friendRequest){
        return`
            <div class="friendRequestContainer">
                <div class="innerfriendRequest">
                    <div>Venneforespørsler</div>
                    <img class="messageExitIcon" src="IMG/Icons/x.png" height=50px onclick="closeFriendRequest()"/>
                </div>
                ${pendingFriendRequests()}
            </div>
        `;
    }
}
function createShowFriends() {
    let chatHtml = '';
    let loggedInUser = model.data.users[model.app.loggedInUser];
    let friends = loggedInUser.friends.map(friendId => model.data.users.find(user => user.userId === friendId));
    friends = friends.filter(friend => checkMostMessages(friend.userId) > 0);
    friends.sort((a, b) => checkUnreadMessages(b.userId) - checkUnreadMessages(a.userId) || checkMostMessages(b.userId) - checkMostMessages(a.userId));

    for (let friend of friends) {
        let borderColor = model.input.messages.selectedBorder == friend.userId ? 'style="border: 3px solid dodgerblue"' : checkUnreadMessages(friend.userId) ? 'style="border: 3px solid red"' : 'style="border: 3px solid gray"';
        chatHtml += `
        <div class="friendIconInner">
            <div class="friendIcons" ${borderColor} onclick="createChatBox(${friend.userId})">
                <img src="${friend.userImage}" />
            </div>
        </div>
        `;
    }
    return chatHtml;
}

function createFriendsList() {
    let friendHtml = '';
    for (let friendId of model.data.users[model.app.loggedInUser].friends) {
        let user = model.data.users.find(user => user.userId === friendId);
        let choices = (model.input.messages.selectedUserInfo == user.userId)
            ? `${user.firstName} ${user.lastName}<br> <button onclick="redirectOtherUserPage(${user.userId})">Profil</button> <button onclick="createChatBox(${user.userId})">Chat</button>`
            : `<div class="friendListBoxInnerText">${user.firstName} ${user.lastName}</div>`;
        friendHtml += `
        <div class="friendListBox" onclick="showFriendSelectBox(${user.userId})">
            ${choices}
        </div>
        `;
    }
    return friendHtml;
}

function createChatBox(friendUserId) {
    model.app.selectedOtherUser = friendUserId;
    model.input.messages.selectedBorder = model.app.selectedOtherUser;
    model.input.messages.showChatBox = `
        <div class="showChatBox">
            <div class="mainInnerChat">
                <div class="InnerChatTop">
                    <div>${model.data.users[friendUserId].firstName} ${model.data.users[friendUserId].lastName}</div>
                    <img src="IMG/Icons/x.png" height="40px" onclick="closeChat()"/>
                </div>
                <div class="chatBox">
                    ${showMessages()}
                </div>
                <div class="chatBoxInput">
                    <input type="text" placeholder="Skriv en melding..." oninput="model.input.profile.sendChat=this.value"/>
                    <button onclick="sendChat(${friendUserId})">Send</button>
                </div>
            </div>
        </div>
    `;
    changeView();
}

function showMessages() {
    let html = '';
    let currentUser = model.data.users[model.app.loggedInUser];
    let selectedFriend = model.data.users[model.app.selectedOtherUser];
    let messages = currentUser.chatMessages.filter(message =>
        (message.sender === currentUser.userId && message.recipient === selectedFriend.userId) ||
        (message.sender === selectedFriend.userId && message.recipient === currentUser.userId)
    );

    for (let message of messages) {
        if (message.sender === currentUser.userId) {
            html += `
            <div class="chatInnerMessageYou">
                <div>${message.message}</div>
                <div class="chatInnerMessageDate">${message.time}</div>
            </div>
            `;
        } else {
            message.read = true;
            html += `
            <div class="chatInnerMessage">
                <div>${message.message}</div>
                <div class="chatInnerMessageDate">${message.time}</div>
            </div>
            `;
        }
    }
    return html;
}
function createSearchUsers() {
    let searchHtml = '';
    for (let index = 0; index < model.input.messages.resultNumber.length; index++) {
        let user = model.input.messages.resultNumber[index];
        let isFriendPending = model.data.users[model.app.loggedInUser].friendRequest.find(request => request.userId === user.userId);
        let button = isFriend(user.userId)
            ? `<button class="addFriendBtn" onclick="createChatBox(${user.userId})">Chat</button>`
            : isFriendPending
                ? `<button class="addFriendBtn" disabled>Request Sent</button>`
                : `<button class="addFriendBtn" onclick="addFriend(${user.userId})">Add Friend</button>`;
        
        searchHtml += `
        <div class="searchResultBox">
            <div class="outerSearchImage"><img src="${user.userImage}"/></div>
            <div class="searchPageText">${user.firstName} ${user.lastName}</div>
            ${button}
        </div>
        `;
    }
    return searchHtml;
}
function openSearch(){
    model.input.messages.showChatBox = `
    <div class="showChatBox">
            <div class="mainInnerSearch">
                <div class="InnerSearchTop">
                    <input type="text" placeholder="Søk etter venn" oninput="model.input.messages.search=this.value"/>
                    <button onclick="showMessageSearchResult()">Søk</button>
                </div>
                    <img src="IMG/Icons/x.png" class="closeSearch" height = 40px onclick="closeChat()"/>
                    <div class="chatBoxSearch">
                        ${model.input.messages.showResult}
                    </div>
            </div>
        </div>
`;
changeView();
}