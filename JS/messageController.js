function redirectMessagePage(){
    window.location.hash = "message";
    clearFiltersAndDropdowns()
    navigateToMessage();
}
function navigateToMessage() {
    model.app.currentPage = model.app.pages[5];
    model.app.isOpenDropdown = false;
    changeView();
}
function saveScrollPosition() {
    const friendSelectorChat = document.querySelector('.friendSelectorChat');
    model.input.messages.savedScrollPosition = friendSelectorChat.scrollLeft;
}

function restoreScrollPosition() {
    const friendSelectorChat = document.querySelector('.friendSelectorChat');
    if (friendSelectorChat) {
        friendSelectorChat.scrollLeft = model.input.messages.savedScrollPosition;
    }
}
function checkUnreadMessages(userId) {
    let currentUser = model.data.users[model.app.loggedInUser];
    let unreadMessages = currentUser.chatMessages.filter(message => message.sender === userId && !message.read);
    return unreadMessages.length > 0;
}
function checkMostMessages(userId) {
    let currentUser = model.data.users[model.app.loggedInUser];
    let totalMessages = currentUser.chatMessages.filter(message => (message.sender === userId || message.recipient === userId)).length;
    return totalMessages;
}

function showFriendSelectBox(friendUserId) {
    model.input.messages.selectedUserInfo = friendUserId;
    changeView();
}
function closeChat() {
    model.input.messages.showChatBox = '';
    model.input.messages.selectedBorder = '';
    changeView();
}
function sendChat(recipientUserId) {
    const timeHere = new Date().toLocaleString();
    let chatMessage = {
        sender: model.data.users[model.app.loggedInUser].userId,
        recipient: recipientUserId,
        message: model.input.profile.sendChat,
        read: false,
        time: timeHere
    };
    model.data.users[model.app.loggedInUser].chatMessages.push(chatMessage);
    model.data.users[recipientUserId].chatMessages.push(chatMessage);
    createChatBox(recipientUserId);
    updateMessageView();
}
function dummyMessage() {
    const timeHere = new Date().toLocaleString();
    let chatMessage = {
        sender: 6,
        recipient: 0,
        message: "Dette er en dummy melding",
        read: false,
        time: timeHere
    };
    model.data.users[0].chatMessages.push(chatMessage);
    model.data.users[6].chatMessages.push(chatMessage);
    updateMessageView();
}

function searchMessageFriends(InputMessageSearch) {
    let allUsers = model.data.users.filter(user => user.userId !== model.data.users[model.app.loggedInUser].userId);
    return allUsers.filter(user => 
            user.userName.toLowerCase().includes(InputMessageSearch.toLowerCase()) ||
            user.firstName.toLowerCase().includes(InputMessageSearch.toLowerCase()) ||
            user.lastName.toLowerCase().includes(InputMessageSearch.toLowerCase())
    );
}
function showMessageSearchResult() {
    let InputMessageSearch = model.input.messages.search;
    model.input.messages.resultNumber = searchMessageFriends(InputMessageSearch);
    if (model.input.messages.resultNumber.length === 0) {
        model.input.messages.showResult = `<div class="searchResultText">Ingen funnet</div>`;
    } else {
        model.input.messages.showResult = createSearchUsers();
    }
    openSearch();
    updateMessageView();
}
function isFriend(userId) {
    return model.data.users[model.app.loggedInUser].friends.includes(userId);
}
function addFriend(userId) {
    let selectedfriend = model.data.users[userId]
    let user = model.data.users[model.app.loggedInUser]
    user.friendRequest.push(
        {
            userId: userId,
            hasAccepted: true,
        }
    )
    selectedfriend.friendRequest.push(
        {
            userId: model.app.loggedInUser,
            hasAccepted: false,
        }
    )
        showMessageSearchResult();
        changeView();
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
    updateMessageView();
}