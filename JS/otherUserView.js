function updateOtherUserView() {
    document.getElementById('app').innerHTML = /*HTML*/`
    <div class="mainHeader">
        ${createMainHeader()}
        <div class="mainMenu" onclick="redirectMessagePage()"><img src="IMG/Icons/message.png"/></div>
    </div>
    <div class="container">${createDropdownMenu()}</div>
    <div class="mainProfileGrid">
        ${friendCheck()}
    </div>
    `;
    checkIfBannedFromSite();
}
function friendCheck(){
    let selectedfriend = model.data.users[model.app.selectedOtherUser]
    let isFriend = model.data.users[model.app.loggedInUser].friends.includes(model.app.selectedOtherUser)
    let user = model.data.users[model.app.loggedInUser]
    if(!selectedfriend.isBanned){
        if(!isFriend){
            html = `
            <div class="friendCheckImage">
            <h3>${selectedfriend.firstName} ${selectedfriend.lastName}</h3>
            <img height= 100px src="${selectedfriend.userImage}"/>
            </div>
            `;
            let friendRequestSent = selectedfriend.friendRequest.find(request => request.userId === user.userId);
            if(!friendRequestSent){
                html += `
                <div class="friendCheckButton">
                <button onclick="addFriendRequest()">Legg til venn</button>
                </div>
                `;
            }else{
                html += `
                <div class="friendCheckButton">
                <p>Venneforespørsel sendt</p>
                </div>
                `;
            }
        }else{
            html = `
            ${createFriendFirst()}
            ${createFriendSecond()}
            ${createFriendGroup()}
            `;
        }
    }else{
        html = `
                <div class="friendCheckButton">
                <img src="IMG/Icons/stop.png" height=150px/>
                <p>Brukeren er bannet</p>
                </div>
                `;
    }
    return html;
}

function addFriendRequest(){
    let selectedfriend = model.data.users[model.app.selectedOtherUser]
    let user = model.data.users[model.app.loggedInUser]
    user.friendRequest.push(
        {
            userId: model.app.selectedOtherUser,
            hasAccepted: true,
        }
    )
    selectedfriend.friendRequest.push(
        {
            userId: model.app.loggedInUser,
            hasAccepted: false,
        }
    )
    changeView();
}
function createFriendGroup(){
    return`
        <div class="profileGroups">
            ${createGroupFriendList()}
        </div>
        <div class="profileGroupPost">
            ${createGroupFriendPost()}
        </div>
    `;
    }
    function createFriendSecond(){
        let selectedfriend = model.data.users[model.app.selectedOtherUser]
        let formattedBirthday = new Date(selectedfriend.birthday).toLocaleDateString();
        return`
            <div class="secondProfileLine">
                <div class="profileBulletPoints">
                    <li>Brukernavn: ${selectedfriend.userName}</li>
                    <li>Bursdag: ${formattedBirthday}</li>
                    <li>Fra: ${selectedfriend.city}</li>
                    <li>Epost: ${selectedfriend.email}</li>
                    <li>Liker: ${createFriendInterestsList()}</li>
                </div>
            </div>
            `;
    } 
    function createFriendFirst(){
        let selectedfriend = model.data.users[model.app.selectedOtherUser]
    return `
        <div class="firstProfileLine">
            <div class="mainProfileName">
                <h3>${selectedfriend.firstName} ${selectedfriend.lastName}</h3>
                <div class="profileTopImage">    
                    <img src="${selectedfriend.userImage}"/>
                </div>
            </div>
            <div class="profileAbout">
                    ${selectedfriend.aboutme}
            </div>
        </div>
    `;
    } 
    function createFriendInterestsList(){
        let html = '';
        for(let interest of model.data.users[model.app.selectedOtherUser].interests) {
            html+= `
            ${interest}, 
            `;
        }
        return html;
    }
    function createGroupFriendList(){
        let html = '';
        for(let groupId of model.data.users[model.app.selectedOtherUser].myGroup) {
            html+= `
            <div onclick="redirectGroupPage(${groupId})" class="innerProfileGroup">${model.data.groups[groupId].groupname}</div>
            `;
        }
        return html;
    }
    function createGroupFriendPost(){
        let html = '';
        for(let groupPost of model.data.users[model.app.selectedOtherUser].myGroupPosts) {
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