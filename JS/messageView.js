function updateMessageView() {
    document.getElementById('app').innerHTML = `
        <div class="mainHeader">
            <div class="mainMenu" onclick="openDropdownMenu()"><img src="IMG/Icons/menu.png"/></div>
            <h1 onclick="redirectHomePage()">RemoteSocial</h1>
            <div class="mainMenu"><img src="IMG/Icons/search.png" onclick="openSearch()"/></div>
            </div>
            ${createDropdownMenu()}
        <div class="friendSelectorChat" onscroll="saveScrollPosition()">
            ${createShowFriends()}
        </div>
            ${model.input.messages.showChatBox}
        <div class="FriendsContainer">
            ${createFriendsList()}
        </div>
        ${pendingFriendRequests()}
        <button style="height: 50px" onclick="dummyMessage()">Dummy message</button>
    `;
    restoreScrollPosition();
    
}
function pendingFriendRequests(){
    let html = '';
    let loggedInUser = model.data.users[model.app.loggedInUser];
    for(let request of loggedInUser.friendRequest){
        html +=`
        <div class="messageFriendRequest">
            <div>Godta ${model.data.users[request.userId].firstName} ${model.data.users[request.userId].lastName}</div>
        </div>
        `;
    }
    return html;
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
    updateMessageView();
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
