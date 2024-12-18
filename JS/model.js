const model = {
    app: {
        loggedInUser: 0,
        selectedOtherUser: 1,
        selectedGroup: 1,
        pages: [
            'startPage',
            'loginPage',
            'profilePage',
            'otherUserPage',
            'groupPage',
            'messagePage',
            'groupsMainPage',
        ],
        currentPage: 'startPage',
        isOpenDropdown: false,
        isOpenSecondDropdown: false,
        isOpenChat: false
    },
    
    input: {
        frontPage: {
            adminMenu: false,
            adminSearch: '',
            adminSearchResult: '',
            members: '',
            feed: [],
        },
        register: {
                userName: '',
                password: '',
                firstName: '',
                lastName: '',
                birthday: '',
                city: '',
                email: '',
                userImage: '',
                aboutme: '',
                interests: [],
        },
        messages: {
            showChatBox: '',
            selectedBorder: '',
            savedScrollPosition: 0,
            selectedUserInfo: '',
            search: '',
            showResult: '',
            resultNumber: '',
            friendRequest: false,
        },
        profile: {
            profileBox: null,
            showMessage: false,
            sendChat: '',
        },
        group: {
            search: '',
            searchResults: '',
            showInfo: '',
            groupname: '',
            showResult: '',
            groupCategory: '',
            groupPost: '',
            groupImage: '',
            adminMessage: '',
            adminOpen: false,
            memberOpen: false,
            postOpen: false,
        },
        login: {
            userId: null,
            userName: '',
            password: '',
            showLogin: ''
        },  
        search: {
            inputSearch: '',
            showSearch: [],
            searchResults: '',
        },
    },

    data: {
        users: [
            {
                userId: 0,
                userName: "chris",
                password: "chris",
                firstName: "Christoffer",
                lastName: "Jacobsen",
                birthday: "1996-05-12",
                city: "Larvik",
                email: "christoffersj@hotmail.com",
                userImage: "IMG/Users/chris.jpg",
                aboutme: "Hei, jeg heter Christoffer og er 37 år fra Larvik",
                interests: ["FPV Quads", "FPV Wings", "Cars"],
                comments: [],
                likes: [],
                isAdmin: true,
                friends: [1, 5, 6, 7],
                favorites: [],
                chatMessages:[
                    {
                        sender: 1,
                        recipient: 0,
                        message: "Hei hvordan går det?",
                        read: false,
                        time: "17.10.2024 21:50:10"
                    },
                    {
                        sender: 5,
                        recipient: 0,
                        message: "Hei hvordan står det til påsan?",
                        read: false,
                        time: "17.10.2024 21:50:10"
                    }
                ],
                isBanned: false,
                myGroupPosts: [
                    {
                        groupId: 0,
                        uploadImage: "IMG/GroupIMG/FPV-race-wing-miniracewing14.jpg",
                        userComment: "Rimelig raft byggesett",
                        timeOfUpload: "17.10.2024 21:50:10",
                        newMember: false,
                        realTime: new Date("2024-10-17T21:50:10")
                    },
                    {
                        groupId: 2,
                        uploadImage: "IMG/GroupIMG/FPV-race-wing-miniracewing14.jpg",
                        userComment: "Rimelig raft byggesett",
                        timeOfUpload: "25.10.2024 21:50:10",
                        newMember: false,
                        realTime: new Date("2024-10-25T21:50:10")
                    }
                ],
                myGroup: [1,2,3,4,5,6],
                friendRequest: [{
                    userId: 2,
                    hasAccepted: false,
                }],
            },
            {
                userId: 1,
                userName: "bjarne",
                password: "bjarne",
                firstName: "Bjarne",
                lastName: "Bamse",
                birthday: "1996-05-12",
                city: "Oslo",
                email: "bjarne@getacademy.com",
                userImage: "IMG/Users/filmfan16.jpg",
                aboutme: "hei, jeg heter Bjarne og er rimelig vill etter fly",
                interests: ["Fly"],
                comments: [],
                likes: [],
                isAdmin: false,
                friends: [0],
                favorites: [],
                chatMessages:[],
                isBanned: false,
                myGroupPosts: [],
                myGroup: [2],
                friendRequest: [],
            },
            {
                userId: 2,
                userName: "nils",
                password: "nils",
                firstName: "Nils",
                lastName: "Bamse",
                birthday: "1996-05-12",
                city: "Oslo",
                email: "bjarne@getacademy.com",
                userImage: "IMG/Users/user1.png",
                aboutme: "hei, jeg heter Nils og liker droner",
                interests: ["Droner"],
                comments: [],
                likes: [],
                isAdmin: false,
                friends: [],
                favorites: [],
                chatMessages:[],
                isBanned: false,
                myGroupPosts: [],
                myGroup: [],
                friendRequest: [{
                    userId: 0,
                    hasAccepted: true,
                }],
            },
            {
                userId: 3,
                userName: "svein",
                password: "svein",
                firstName: "Svein",
                lastName: "Bamse",
                birthday: "1996-05-12",
                city: "Oslo",
                email: "bjarne@getacademy.com",
                userImage: "IMG/Users/user3.jpg",
                aboutme: "hei, jeg heter Nils og liker droner",
                interests: ["Droner"],
                comments: [],
                likes: [],
                isAdmin: false,
                friends: [],
                favorites: [],
                chatMessages:[],
                isBanned: false,
                myGroupPosts: [],
                myGroup: [],
                friendRequest: [],
            },
            {
                userId: 4,
                userName: "kaare",
                password: "kåre",
                firstName: "Kåre",
                lastName: "Bamse",
                birthday: "1996-05-12",
                city: "Oslo",
                email: "bjarne@getacademy.com",
                userImage: "IMG/Users/user4.jpg",
                aboutme: "hei, jeg heter Nils og liker droner",
                interests: ["Droner"],
                comments: [],
                likes: [],
                isAdmin: false,
                friends: ["chris"],
                favorites: [],
                chatMessages:[],
                isBanned: false,
                myGroupPosts: [],
                myGroup: [],
                friendRequest: [],
            },
            {
                userId: 5,
                userName: "tore",
                password: "tore",
                firstName: "Tore",
                lastName: "Bamse",
                birthday: "1996-05-12",
                city: "Oslo",
                email: "bjarne@getacademy.com",
                userImage: "IMG/Users/user5.jpg",
                aboutme: "hei, jeg heter Nils og liker droner",
                interests: ["Droner"],
                comments: [],
                likes: [],
                isAdmin: false,
                friends: [0],
                favorites: [],
                chatMessages:[],
                isBanned: false,
                myGroupPosts: [],
                myGroup: [],
                friendRequest: [],
            },
            {
                userId: 6,
                userName: "petter",
                password: "123",
                firstName: "Petter",
                lastName: "Bamse",
                birthday: "1996-05-12",
                city: "Oslo",
                email: "bjarne@getacademy.com",
                userImage: "IMG/Users/badminton.jpg",
                aboutme: "hei, jeg heter Petter og liker biler",
                interests: ["Biler"],
                comments: [],
                likes: [],
                isAdmin: false,
                friends: [0],
                favorites: [],
                chatMessages:[],
                isBanned: false,
                myGroupPosts: [],
                myGroup: [3],
                friendRequest: [],
            },
            {
                userId: 7,
                userName: "jonas",
                password: "jonas",
                firstName: "Jonas",
                lastName: "Bamse",
                birthday: "1996-05-12",
                city: "Oslo",
                email: "bjarne@getacademy.com",
                userImage: "IMG/Users/droneentusiast.jpg",
                aboutme: "hei, jeg heter Nils og liker droner",
                interests: ["Droner"],
                comments: [],
                likes: [],
                isAdmin: false,
                friends: [0],
                favorites: [],
                chatMessages:[],
                isBanned: false,
                myGroupPosts: [],
                myGroup: [],
                friendRequest: [],
            },
        ],
        groupCategory: ["FPV","Airplane","Scale","Fast","Cars","Slow","Boat","Rotor","Crawler"],
        groups: [
            {
                groupId: 0,
                groupname: "FPV Quads",
                groupCategory: ["FPV","Rotor"],
                groupImage: "IMG/Groups/quad.jpg",
                groupAdmins: [0],
                groupMembers: [7,5,2],
                groupPosts: [
                    {
                        userId: 7,
                        uploadImage: "",
                        userComment: "",
                        timeOfUpload: "21.10.2024 18:54:10",
                        newMember: true,
                        realTime: new Date("2024-10-21T18:54:10")
                    },
                    {
                        userId: 7,
                        uploadImage: "IMG/GroupIMG/quad.jpg",
                        userComment: "Fått bygd sammen denne lekre saken i dag, gleder meg til å prøve den i morgen",
                        timeOfUpload: "21.10.2024 18:54:10",
                        newMember: false,
                        realTime: new Date("2024-10-21T18:54:10")
                    },
                    {
                        userId: 0,
                        uploadImage: "IMG/GroupIMG/FPV-race-wing-miniracewing14.jpg",
                        userComment: "Rimelig raft byggesett",
                        timeOfUpload: "17.10.2024 21:50:10",
                        newMember: false,
                        realTime: new Date("2024-10-17T21:50:10")
                    }
                ],
                groupBanned: [],
            },
            
            {
                groupId: 1,
                groupname: "FPV Wings",
                groupCategory: ["FPV", "Airplane"],
                groupImage: "IMG/Groups/wing.jpg",
                groupAdmins: [],
                groupMembers: [5],
                groupPosts: [],
                groupBanned: [0],
            },
            {
                groupId: 2,
                groupname: "Airplane",
                groupCategory: ["Scale", "Airplane"],
                groupImage: "IMG/Groups/plane.jpg",
                groupAdmins: [3],
                groupMembers: [0,3],
                groupPosts: [{
                    userId: 0,
                    uploadImage: "IMG/GroupIMG/FPV-race-wing-miniracewing14.jpg",
                    userComment: "Rimelig raft byggesett",
                    timeOfUpload: "25.10.2024 21:50:10",
                    newMember: false,
                    realTime: new Date("2024-10-25T21:50:10")
                }],
                groupBanned: [],
            },
            {
                groupId: 3,
                groupname: "Cars",
                groupCategory: ["Fast","Cars"],
                groupImage: "IMG/Groups/car.jpg",
                groupAdmins: [0],
                groupMembers: [0,2],
                groupPosts: [],
                groupBanned: [],
            },
            {
                groupId: 4,
                groupname: "Boat",
                groupCategory: ["Fast","Boat"],
                groupImage: "IMG/Groups/boat.jpg",
                groupAdmins: [0],
                groupMembers: [0,1],
                groupPosts: [],
                groupBanned: [],
            },
            {
                groupId: 5,
                groupname: "Helicopter",
                groupCategory: ["Fast","Rotor"],
                groupImage: "IMG/Groups/heli.jpg",
                groupAdmins: [0],
                groupMembers: [0,1],
                groupPosts: [],
                groupBanned: [],
            },
            {
                groupId: 6,
                groupname: "Crawler",
                groupCategory: ["Slow","Cars","Crawler"],
                groupImage: "IMG/Groups/crawler.jpg",
                groupAdmins: [0],
                groupMembers: [0,1],
                groupPosts: [],
                groupBanned: [],
            },
            {
                groupId: 7,
                groupname: "Drone",
                groupCategory: ["Slow","Rotor"],
                groupImage: "IMG/Groups/drone.jpg",
                groupAdmins: [0],
                groupMembers: [0,1],
                groupPosts: [],
                groupBanned: [],
            },
        ]
    }
}