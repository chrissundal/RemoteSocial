const model = {
    app: {
        loggedInUser: 0,
        selectedOtherUser: 1,
        selectedGroup: 0,
        pages: [
            'startPage',
            'loginPage',
            'profilePage',
            'otherUserPage',
            'groupPage',
            'messagePage',
            'groupsMainPage',
        ],
        currentPage: 'groupPage',
        isOpenDropdown: false,
        isOpenSecondDropdown: false,
        isOpenChat: false
    },
    
    input: {
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
            groupAdmins: [],
            groupMembers: [],
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
                birthday: "07.09.1987",
                city: "Larvik",
                email: "christoffersj@hotmail.com",
                userImage: "IMG/Users/chris.jpg",
                aboutme: "Hei, jeg heter Christoffer og er 37 år fra Larvik",
                interests: ["FPV Quads", "FPV Wings", "Cars"],
                comments: [],
                likes: [],
                isAdmin: true,
                friends: ["bjarne", "tore", "modal", "jonas"],
                favorites: [],
                chatMessages:[
                    {
                        sender: "bjarne",
                        recipient: "chris",
                        message: "Hei hvordan går det?",
                        read: false,
                        time: "17.10.2024 21:50:10"
                    },
                    {
                        sender: "tore",
                        recipient: "chris",
                        message: "Hei hvordan står det til påsan?",
                        read: false,
                        time: "17.10.2024 21:50:10"
                    }
                ],
                adminPages: [],
                myGroupPosts: [],
                myGroup: [1,2,3,4,5,6],
                friendRequest: [],
            },
            {
                userId: 1,
                userName: "bjarne",
                password: "bjarne",
                firstName: "Bjarne",
                lastName: "Bamse",
                birthday: "15.03.1996",
                city: "Oslo",
                email: "bjarne@getacademy.com",
                userImage: "IMG/Users/filmfan16.jpg",
                aboutme: "hei, jeg heter Bjarne og er rimelig vill etter fly",
                interests: ["Fly"],
                comments: [],
                likes: [],
                isAdmin: false,
                friends: ["chris", "nils"],
                favorites: [],
                chatMessages:[],
                adminPages: [],
                myGroupPosts: [],
                myGroup: [],
                friendRequest: [],
            },
            {
                userId: 2,
                userName: "nils",
                password: "nils",
                firstName: "Nils",
                lastName: "Bamse",
                birthday: "15.03.1996",
                city: "Oslo",
                email: "bjarne@getacademy.com",
                userImage: "IMG/Users/user1.png",
                aboutme: "hei, jeg heter Nils og liker droner",
                interests: ["Droner"],
                comments: [],
                likes: [],
                isAdmin: false,
                friends: ["chris", "bjarne"],
                favorites: [],
                chatMessages:[],
                adminPages: [],
                myGroupPosts: [],
                myGroup: [],
                friendRequest: [],
            },
            {
                userId: 3,
                userName: "svein",
                password: "svein",
                firstName: "Svein",
                lastName: "Bamse",
                birthday: "15.03.1996",
                city: "Oslo",
                email: "bjarne@getacademy.com",
                userImage: "IMG/Users/user3.jpg",
                aboutme: "hei, jeg heter Nils og liker droner",
                interests: ["Droner"],
                comments: [],
                likes: [],
                isAdmin: false,
                friends: ["chris"],
                favorites: [],
                chatMessages:[],
                adminPages: [],
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
                birthday: "15.03.1996",
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
                adminPages: [],
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
                birthday: "15.03.1996",
                city: "Oslo",
                email: "bjarne@getacademy.com",
                userImage: "IMG/Users/user5.jpg",
                aboutme: "hei, jeg heter Nils og liker droner",
                interests: ["Droner"],
                comments: [],
                likes: [],
                isAdmin: false,
                friends: ["chris"],
                favorites: [],
                chatMessages:[],
                adminPages: [],
                myGroupPosts: [],
                myGroup: [],
                friendRequest: [],
            },
            {
                userId: 6,
                userName: "modal",
                password: "modal",
                firstName: "Modal",
                lastName: "Bamse",
                birthday: "15.03.1996",
                city: "Oslo",
                email: "bjarne@getacademy.com",
                userImage: "IMG/Users/InternalLocus.jpg",
                aboutme: "hei, jeg heter Nils og liker droner",
                interests: ["Droner"],
                comments: [],
                likes: [],
                isAdmin: false,
                friends: ["chris"],
                favorites: [],
                chatMessages:[],
                adminPages: [],
                myGroupPosts: [],
                myGroup: [],
                friendRequest: [],
            },
            {
                userId: 7,
                userName: "jonas",
                password: "jonas",
                firstName: "Jonas",
                lastName: "Bamse",
                birthday: "15.03.1996",
                city: "Oslo",
                email: "bjarne@getacademy.com",
                userImage: "IMG/Users/droneentusiast.jpg",
                aboutme: "hei, jeg heter Nils og liker droner",
                interests: ["Droner"],
                comments: [],
                likes: [],
                isAdmin: false,
                friends: ["chris"],
                favorites: [],
                chatMessages:[],
                adminPages: [],
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
                groupMembers: [7],
                groupPosts: [
                    {
                        userId: 7,
                        uploadImage: "",
                        userComment: "",
                        timeOfUpload: "21.10.2024 18:54:10",
                        newMember: true,
                    },
                    {
                        userId: 7,
                        uploadImage: "IMG/GroupIMG/quad.jpg",
                        userComment: "Fått bygd sammen denne lekre saken i dag, gleder meg til å prøve den i morgen",
                        timeOfUpload: "21.10.2024 18:54:10",
                        newMember: false,
                    },
                    {
                        userId: 0,
                        uploadImage: "",
                        userComment: "Fått bygd sammen denne lekre saken i dag, gleder meg til å prøve den i morgen",
                        timeOfUpload: "21.10.2024 18:54:10",
                        newMember: false,
                    },
                ],
            },
            {
                groupId: 1,
                groupname: "FPV Wings",
                groupCategory: ["FPV", "Airplane"],
                groupImage: "IMG/Groups/wing.jpg",
                groupAdmins: [0],
                groupMembers: [5],
                groupPosts: [],
            },
            {
                groupId: 2,
                groupname: "Airplane",
                groupCategory: ["Scale", "Airplane"],
                groupImage: "IMG/Groups/plane.jpg",
                groupAdmins: [0],
                groupMembers: [0,3],
                groupPosts: [],
            },
            {
                groupId: 3,
                groupname: "Cars",
                groupCategory: ["Fast","Cars"],
                groupImage: "IMG/Groups/car.jpg",
                groupAdmins: [0],
                groupMembers: [0,2],
                groupPosts: [],
            },
            {
                groupId: 4,
                groupname: "Boat",
                groupCategory: ["Fast","Boat"],
                groupImage: "IMG/Groups/boat.jpg",
                groupAdmins: [0],
                groupMembers: [0,1],
                groupPosts: [],
            },
            {
                groupId: 5,
                groupname: "Helicopter",
                groupCategory: ["Fast","Rotor"],
                groupImage: "IMG/Groups/heli.jpg",
                groupAdmins: [0],
                groupMembers: [0,1],
                groupPosts: [],
            },
            {
                groupId: 6,
                groupname: "Crawler",
                groupCategory: ["Slow","Cars","Crawler"],
                groupImage: "IMG/Groups/crawler.jpg",
                groupAdmins: [0],
                groupMembers: [0,1],
                groupPosts: [],
            },
            {
                groupId: 7,
                groupname: "Drone",
                groupCategory: ["Slow","Rotor"],
                groupImage: "IMG/Groups/drone.jpg",
                groupAdmins: [0],
                groupMembers: [0,1],
                groupPosts: [],
            },
        ]
    }
}