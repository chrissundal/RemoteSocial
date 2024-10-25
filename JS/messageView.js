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
        <button style="height: 50px" onclick="dummyMessage()">Dummy message</button>
    `;
    restoreScrollPosition();
    
}

function createShowFriends() {
    let chatHtml = '';
    let loggedInUser = model.data.users[model.app.loggedInUser];
    let friends = loggedInUser.friends.map(friendUserName => model.data.users.find(user => user.userName === friendUserName));
    friends = friends.filter(friend => checkMostMessages(friend.userName) > 0);

    friends.sort((a, b) => checkUnreadMessages(b.userName) - checkUnreadMessages(a.userName) || checkMostMessages(b.userName) - checkMostMessages(a.userName));
    
    for (let friend of friends) {
        let borderColor = model.input.messages.selectedBorder == friend.userId ? 'style="border: 3px solid dodgerblue"' : checkUnreadMessages(friend.userName) ? 'style="border: 3px solid red"' : 'style="border: 3px solid gray"';
        
        chatHtml += `
        <div class="friendIconInner">
            <div class="friendIcons" ${borderColor} onclick="createChatBox('${friend.userId}')">
                <img src="${friend.userImage}" />
                </div>
                </div>
        `;
    }
    return chatHtml;
}
function createFriendsList(){
    let friendHtml = '';
    for(index = 0; index < model.data.users[model.app.loggedInUser].friends.length; index++) {
        let user = model.data.users.find(user => user.userName === model.data.users[model.app.loggedInUser].friends[index]);
        let choices = (model.input.messages.selectedUserInfo == user.userId) 
        ? `${user.firstName} ${user.lastName}<br> <button onclick="redirectOtherUserPage(${user.userId})">Profil</button> <button onclick="createChatBox('${user.userId}')">Chat</button>`
        : `<div class="friendListBoxInnerText">${user.firstName} ${user.lastName}</div>`;
        friendHtml += `
            <div class="friendListBox" onclick="showFriendSelectBox('${user.userId}')">
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
                <div onclick="">${model.data.users[friendUserId].firstName} ${model.data.users[friendUserId].lastName}</div>
                <img src="IMG/Icons/x.png" height = 40px onclick="closeChat()"/>
                </div>
                <div class="chatBox">
                    ${showMessages()}
                </div>
                <div class="chatBoxInput">
                    <input type="text" placeholder="Skriv en melding..." oninput="model.input.profile.sendChat=this.value"/>
                    <button onclick="sendChat('${friendUserId}')">Send</button>
                </div>
            </div>
        </div>
    `;
    updateMessageView();
}

function showMessages() {
    let html = '';
    let currentUser = model.data.users[model.app.loggedInUser];
    let selectedFriend = model.data.users[model.app.selectedOtherUser]

    let messages = currentUser.chatMessages.filter(message =>
        (message.sender === currentUser.userName && message.recipient === selectedFriend.userName) ||
        (message.sender === selectedFriend.userName && message.recipient === currentUser.userName)
    );

    for (let message of messages) {
        if (message.sender === currentUser.userName) {
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