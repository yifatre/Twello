
export const boardsDemoData = [
    {
        _id: "b101",
        title: "Demo Data",
        isStarred: true,
        archivedAt: 1589983468418,
        createdById: "_u101",
        style: {
            backgroundImage: "https://images.unsplash.com/photo-1568607689150-17e625c1586e?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        labels: [
            {
                "id": "l101",
                "title": "Done",
                "color": "purple"
            },
            {
                "id": "l102",
                "title": "Progress",
                "color": "orange"
            }
        ],
        members: [
            {
                "_id": "u101",
                "fullName": "Tal Tarablus",
                "imgUrl": "https://trello-members.s3.amazonaws.com/660bf13c426a52eda7897e39/7dc2b02dcda3f5364deedb6736608c8b/170.png"
            },
            {
                "_id": "u102",
                "fullName": "John Doe",
                "imgUrl": "https://randomuser.me/api/portraits/men/1.jpg"
            },
            {
                "_id": "u103",
                "fullName": "Alice Smith",
                "imgUrl": "https://randomuser.me/api/portraits/women/2.jpg"
            },
            {
                "_id": "u104",
                "fullName": "Michael Johnson",
                "imgUrl": ""
            },
            {
                "_id": "u105",
                "fullName": "Emily Brown",
                "imgUrl": "https://randomuser.me/api/portraits/women/4.jpg"
            },
            {
                "_id": "u106",
                "fullName": "David Lee",
                "imgUrl": "https://randomuser.me/api/portraits/men/5.jpg"
            },
            {
                "_id": "u107",
                "fullName": "Guest",
                "username": "guest@example.com"
            }
        ],
        groups: [
            {
                "id": "g101",
                "title": "backlog",
                "archivedAt": 1589983468418,
                "isExtended": "true",
                "tasks": [
                    {
                        "id": "c101",
                        "title": "Backlog",
                        "description": "On this board we have a list of things we think we want to do, maybe not quite ready for work, but high likelihood of being worked on \n This is the staging area where specs should get fleshed out. \n No limit on the list size, but we should reconsider if it gets long.",
                        "style": {
                            "backgroundImage": "https://trello-stickers.s3.amazonaws.com/SharedSticker/80x80/a36f4ad3663043c140a08100148a64aa/100w.gif",
                            "backgroundColor": "gray"
                        },
                        "labelIds": [],
                        "checklists": [
                            {
                                "id": "YesdmF",
                                "title": "Checklist",
                                "todos": [
                                    {
                                        "id": "2dsX",
                                        "title": "To Do 1",
                                        "isDone": true
                                    }
                                ]
                            }
                        ],
                        "memberIds": ["u101"]
                    },
                    {
                        "id": "c102",
                        "title": "Users Management",
                        "description": "description",
                        "style": {
                            "backgroundImage": "https://trello.com/1/cards/660d25caed4263dcfcc3dbf0/attachments/660e3f679cb08cb6edb7fec3/download/user.jpg"
                        },
                        "checklists": [
                            {
                                "id": "YEhhmF",
                                "title": "Checklist",
                                "todos": [
                                    {
                                        "id": "21asd2jX",
                                        "title": "To Do 1",
                                        "isDone": true
                                    },
                                    {
                                        "id": "21sdafss2432jX",
                                        "title": "To Do 2",
                                        "isDone": true
                                    }
                                ]
                            },
                            {
                                "id": "sldhgfk",
                                "title": "Checklist",
                                "todos": [
                                    {
                                        "id": "21af2jX",
                                        "title": "To Do 11",
                                        "isDone": true
                                    },
                                    {
                                        "id": "21aslla2432jX",
                                        "title": "To Do 22",
                                        "isDone": true
                                    }
                                ]
                            }
                        ],
                        "labelIds": ["l101", "l102"],
                        "memberIds": []
                    },
                    {
                        "id": "c104",
                        "title": "Add Samples",
                        "description": "description",
                        "style": {},
                        "checklists": [
                            {
                                "id": "YEhhmF",
                                "title": "Checklist",
                                "todos": [
                                    {
                                        "id": "21a2jX",
                                        "title": "To Do 1",
                                        "isDone": true
                                    },
                                    {
                                        "id": "2124jX",
                                        "title": "To Do 1",
                                        "isDone": true
                                    }
                                ]
                            }
                        ],
                        "labelIds": [],
                        "memberIds": []
                    },
                    {
                        "id": "c103",
                        "title": "Add Samples",
                        "description": "description",
                        "style": {},
                        "checklists": [
                            {
                                "id": "YEhhmF",
                                "title": "Checklist",
                                "todos": [
                                    {
                                        "id": "21a2jX",
                                        "title": "To Do 1",
                                        "isDone": true
                                    },
                                    {
                                        "id": "2124jX",
                                        "title": "To Do 1",
                                        "isDone": true
                                    }
                                ]
                            }
                        ],
                        "memberIds": ["u101", "u106"],
                        "labelIds": []
                    }
                ],
                "style": {
                    "themeColor": "teal"
                }
            },
            {
                "id": "g102",
                "title": "To Do - Frontend",
                "isExtended": "true",
                "tasks": [
                    {
                        "id": "c107",
                        "title": "Do that",
                        "description": "description",
                        "archivedAt": 1589983468418,
                        "style": {},
                        "labelIds": [],
                        "memberIds": []
                    },
                    {
                        "id": "c108",
                        "title": "CRUDs",
                        "description": "description",
                        "archivedAt": 1589983468418,
                        "style": {
                            "backgroundImage": "https://trello.com/1/cards/660d2f8f6d1588b03560bfcb/attachments/660e51a38812400a61b9ac76/download/CRUD.jpeg",
                        },
                        "labelIds": [],
                        "memberIds": []
                    },
                    {
                        "id": "c109",
                        "title": "Do that",
                        "description": "description",
                        "archivedAt": 1589983468418,
                        "style": {},
                        "labelIds": [],
                        "memberIds": []
                    },
                    {
                        "id": "c1055",
                        "title": "Do that",
                        "description": "description",
                        "archivedAt": 1589983468418,
                        "style": {},
                        "labelIds": ["l101", "l102"],
                        "memberIds": []
                    },
                    {
                        "id": "c1089",
                        "title": "Help me",
                        "description": "description",
                        "comments": [
                            {
                                "id": "ZdPnm",
                                "txt": "also @yaronb please CR this",
                                "createdAt": 1590999817436,
                                "byMemberId": ["u101"]
                            }
                        ],
                        "checklists": [
                            {
                                "id": "YEhmF",
                                "title": "Checklist",
                                "todos": [
                                    {
                                        "id": "212jX",
                                        "title": "To Do 1",
                                        "isDone": false
                                    }
                                ]
                            }
                        ],
                        "memberIds": ["u101"],
                        "labelIds": ["l101", "l102"],
                        "dueDate": 1712703775417,
                        "style": {}
                    }
                ],
                "style": {}
            }
        ],
        activities: [
            {
                "id": "a101",
                "txt": "Changed Color",
                "createdAt": 154514,
                "byMemberId": "u101",
                "group": {
                    "id": "g101",
                    "title": "Urgent Stuff"
                },
                "task": {
                    "id": "c101",
                    "title": "Replace Logo"
                }
            }
        ],
    },

]

export const userDemoData = [
    {
        "_id": "u101",
        "fullName": "Yifat re",
        "username": "abi@ababmi.com",
        "password": "aBambi123",
        "imgUrl": "https://trello-members.s3.amazonaws.com/660bf13c426a52eda7897e39/7dc2b02dcda3f5364deedb6736608c8b/170.png",
        "mentions": [{ //optional
            "id": "m101",
            "boardId": "m101",
            "taskId": "t101"
        }]
    },
    {
        "_id": "u102",
        "fullName": "John Doe",
        "username": "john.doe@example.com",
        "password": "JDoe123",
        "imgUrl": "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
        "_id": "u103",
        "fullName": "Alice Smith",
        "username": "alice.smith@example.com",
        "password": "ASmith456",
        "imgUrl": "https://randomuser.me/api/portraits/women/2.jpg"
    },
    {
        "_id": "u104",
        "fullName": "Michael Johnson",
        "username": "mike.johnson@example.com",
        "password": "MJohnson789",
        "imgUrl": "https://randomuser.me/api/portraits/men/2.jpg"
    },
    {
        "_id": "u105",
        "fullName": "Emily Brown",
        "username": "emily.brown@example.com",
        "password": "EBrown101",
        "imgUrl": "https://randomuser.me/api/portraits/women/4.jpg"
    },
    {
        "_id": "u106",
        "fullName": "David Lee",
        "username": "david.lee@example.com",
        "password": "DLee2022",
        "imgUrl": "https://randomuser.me/api/portraits/men/5.jpg"
    },
    {
        "_id": "u107",
        "fullName": "Guest",
        "username": "guest@example.com"
    }
]

export const boardsDemoData2 = [{
    _id: "b101",
    title: "Demo Data",
    isStarred: true,
    archivedAt: 1589983468418,
    createdById: "_u101",
    style: {
        images: [],
        backgroundImage: "https://images.unsplash.com/photo-1532153259564-a5f24f261f51?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    labels: [
        {
            "id": "l101",
            "title": "Wating for feedback ⏺",
            "color": "yellow-subtle"
        },
        {
            "id": "l102",
            "title": "Has to be discussed 📳",
            "color": "purple-subtle"
        },
        {
            "id": "lett6Qb",
            "title": "Done",
            "color": "green-subtle"
        },
        {
            "id": "lZFhMje",
            "title": "Not clear ⏸",
            "color": "orange-subtle"
        },
        {
            "id": "lqckopf",
            "title": "Blocked 🔙",
            "color": "red-subtle"
        },
        {
            "id": "lE1nmBj",
            "title": "testing",
            "color": "orange-subtle"
        },
        {
            "id": "lFLDwXi",
            "title": "some fun",
            "color": "teal"
        },
        {
            "id": "lmB5akC",
            "title": "On Staging Server 🔜",
            "color": "orange-subtle"
        },
        {
            "id": "lkLulUM",
            "title": "Flagged 🔴",
            "color": "red-subtle"
        },
        {
            "id": "lvoSl03",
            "title": "On Production Server 🔛",
            "color": "blue-subtle"
        },
        {
            "id": "lRMVGuH",
            "title": "Committed to Repo ⏫",
            "color": "magenta-subtle"
        },
        {
            "id": "lu3rXf6",
            "title": "Passed",
            "color": "green-subtle"
        },
        {
            "id": "le3yGiO",
            "title": "Food",
            "color": "yellow-bolder"
        },
        {
            "id": "lN0EYkV",
            "title": "break",
            "color": "lime-subtle"
        }
    ],
    members: [
        {
            "_id": "u101",
            "fullName": "Tal Tarablus",
            "imgUrl": "https://trello-members.s3.amazonaws.com/660bf13c426a52eda7897e39/7dc2b02dcda3f5364deedb6736608c8b/170.png"
        },
        {
            "_id": "u102",
            "fullName": "John Doe",
            "imgUrl": "https://randomuser.me/api/portraits/men/1.jpg"
        },
        {
            "_id": "u103",
            "fullName": "Alice Smith",
            "imgUrl": "https://randomuser.me/api/portraits/women/2.jpg"
        },
        {
            "_id": "u104",
            "fullName": "Michael Johnson",
            "imgUrl": ""
        },
        {
            "_id": "u105",
            "fullName": "Emily Brown",
            "imgUrl": "https://randomuser.me/api/portraits/women/4.jpg"
        },
        {
            "_id": "u106",
            "fullName": "David Lee",
            "imgUrl": "https://randomuser.me/api/portraits/men/5.jpg"
        },
        {
            "_id": "u107",
            "fullName": "Guest",
            "imgUrl": "https://res.cloudinary.com/dobrmrt0g/image/upload/v1713014057/png-clipart-orb-os-x-icon-man-s-profile-icon-inside-white-circle-thumbnail_simwdv.png"

        }
    ],
    groups: [
        {
            "id": "g101",
            "title": "backlog",
            "archivedAt": 1589983468418,
            "isExtended": "true",
            "tasks": [
                {
                    "id": "c101",
                    "title": "Backlog",
                    "description": "On this board we have a list of things we think we want to do, maybe not quite ready for work, but high likelihood of being worked on \n This is the staging area where specs should get fleshed out. \n No limit on the list size, but we should reconsider if it gets long.",
                    "style": {
                        "backgroundImage": "https://trello-stickers.s3.amazonaws.com/SharedSticker/80x80/a36f4ad3663043c140a08100148a64aa/100w.gif",
                        "backgroundColor": "gray"
                    },
                    "labelIds": [],
                    "checklists": [
                        {
                            "id": "YesdmF",
                            "title": "Checklist",
                            "todos": [
                                {
                                    "id": "2dsX",
                                    "title": "To Do 1",
                                    "isDone": true
                                }
                            ]
                        }
                    ],
                    "memberIds": [
                        "u101"
                    ],
                    "date": {
                        "startDate": 1712610000000,
                        "dueDate": 1714078800000,
                        "time": "5:46 PM",
                        "isDone": false
                    }
                },
                {
                    "id": "c102",
                    "title": "Users Management",
                    "description": "description",
                    "style": {
                        "backgroundImage": "https://trello.com/1/cards/660d25caed4263dcfcc3dbf0/attachments/660e3f679cb08cb6edb7fec3/download/user.jpg"
                    },
                    "checklists": [
                        {
                            "id": "YEhhmF",
                            "title": "Checklist",
                            "todos": [
                                {
                                    "id": "21a2jX",
                                    "title": "To Do 1",
                                    "isDone": true
                                },
                                {
                                    "id": "2124jX",
                                    "title": "To Do 1",
                                    "isDone": true
                                }
                            ]
                        }
                    ],
                    "labelIds": [],
                    "memberIds": [],
                    "date": {
                        "dueDate": 1713301200000,
                        "time": "5:46 PM",
                        "isDone": false
                    }
                },
                {
                    "id": "c1089",
                    "title": "Help me",
                    "description": "description",
                    "comments": [
                        {
                            "id": "ZdPnm",
                            "txt": "also @yaronb please CR this",
                            "createdAt": 1590999817436,
                            "byMemberId": [
                                "u101"
                            ]
                        }
                    ],
                    "checklists": [
                        {
                            "id": "YEhmF",
                            "title": "Checklist",
                            "todos": [
                                {
                                    "id": "212jX",
                                    "title": "To Do 1",
                                    "isDone": false
                                }
                            ]
                        }
                    ],
                    "memberIds": [
                        "u101"
                    ],
                    "labelIds": [
                        "l101",
                        "l102"
                    ],
                    "dueDate": 1712703775417,
                    "style": {
                        "backgroundImage": "https://res.cloudinary.com/dobrmrt0g/image/upload/v1712739980/pvncdj8kpf1r4n6hjgll.png"
                    },
                    "date": {
                        "dueDate": 1712178000000,
                        "time": "1:22 Am",
                        "isDone": false
                    },
                    "attach": [
                        "https://res.cloudinary.com/dobrmrt0g/image/upload/v1712739980/pvncdj8kpf1r4n6hjgll.png"
                    ]
                },
                {
                    "id": "c104",
                    "title": "Help me",
                    "description": "description",
                    "style": {},
                    "checklists": [
                        {
                            "id": "YEhhmF",
                            "title": "Checklist",
                            "todos": [
                                {
                                    "id": "21a2jX",
                                    "title": "To Do 1",
                                    "isDone": true
                                },
                                {
                                    "id": "2124jX",
                                    "title": "To Do 1",
                                    "isDone": true
                                }
                            ]
                        }
                    ],
                    "labelIds": [
                        "lett6Qb"
                    ],
                    "memberIds": []
                }
            ],
            "style": {
                "themeColor": "teal"
            }
        },
        {
            "id": "g102",
            "title": "To Do - Frontend",
            "isExtended": "true",
            "tasks": [
                {
                    "id": "c107",
                    "title": "Likes system",
                    "description": "description",
                    "archivedAt": 1589983468418,
                    "style": {},
                    "labelIds": [
                        "lZFhMje",
                        "l102"
                    ],
                    "memberIds": [
                        "u101",
                        "u103",
                        "u104",
                        "u105",
                        "u106",
                        "u102"
                    ],
                    "date": {
                        "dueDate": 1712782800000,
                        "time": "8:20 AM",
                        "isDone": true
                    }
                },
                {
                    "id": "c109",
                    "title": "Comments System",
                    "description": "description",
                    "archivedAt": 1589983468418,
                    "style": {},
                    "labelIds": [
                        "l101"
                    ],
                    "memberIds": [],
                    "date": {
                        "dueDate": 1712782800000,
                        "time": "5:46 PM",
                        "isDone": false
                    }
                },
                {
                    "id": "c103",
                    "title": "To Do",
                    "description": "description",
                    "style": {},
                    "checklists": [
                        {
                            "id": "YEhhmF",
                            "title": "Checklist",
                            "todos": [
                                {
                                    "id": "21a2jX",
                                    "title": "To Do 1",
                                    "isDone": true
                                },
                                {
                                    "id": "2124jX",
                                    "title": "To Do 1",
                                    "isDone": true
                                }
                            ]
                        }
                    ],
                    "memberIds": [],
                    "labelIds": [],
                    "date": {
                        "dueDate": 1712178000000,
                        "time": "2:51 PM",
                        "isDone": false
                    }
                },
                {
                    "id": "c1055",
                    "title": "Responsiveness",
                    "description": "description",
                    "archivedAt": 1589983468418,
                    "style": {
                        "backgroundImage": "https://res.cloudinary.com/dobrmrt0g/image/upload/v1712740808/z98j1jpk3jsidd7l7lhf.jpg"
                    },
                    "labelIds": [
                        "l102"
                    ],
                    "memberIds": [
                        "u101",
                        "u104"
                    ],
                    "attach": [
                        "https://res.cloudinary.com/dobrmrt0g/image/upload/v1712740808/z98j1jpk3jsidd7l7lhf.jpg"
                    ]
                },
                {
                    "title": "Tag system",
                    "description": "",
                    "style": {
                        "backgroundImage": "https://res.cloudinary.com/dobrmrt0g/image/upload/v1712740860/mqvqmjyjexrxvhwplqgf.png"
                    },
                    "labelIds": [],
                    "memberIds": [],
                    "checklists": [],
                    "id": "tIs113C",
                    "attach": [
                        "https://res.cloudinary.com/dobrmrt0g/image/upload/v1712740860/mqvqmjyjexrxvhwplqgf.png"
                    ]
                }
            ],
            "style": {
                "themeColor": "blue"
            }
        },
        {
            "title": "To Do - Backend",
            "isExtended": true,
            "style": {
                "backgroundColor": "gray"
            },
            "tasks": [
                {
                    "title": "To Do",
                    "description": "",
                    "style": {},
                    "labelIds": [],
                    "memberIds": [],
                    "checklists": [],
                    "id": "tdAbxQa",
                    "date": {
                        "dueDate": 1712178000000,
                        "time": "2:51 PM",
                        "isDone": false
                    }
                },
                {
                    "title": "Bulid server",
                    "description": "",
                    "style": {
                        "backgroundImage": "https://res.cloudinary.com/dobrmrt0g/image/upload/v1712741043/z4e4irohaznqx0vcjc0p.png"
                    },
                    "labelIds": [],
                    "memberIds": [
                        "u101"
                    ],
                    "checklists": [],
                    "id": "tOWJI8P",
                    "date": {
                        "dueDate": 1712782800000,
                        "isDone": true
                    },
                    "attach": [
                        "https://res.cloudinary.com/dobrmrt0g/image/upload/v1712741043/z4e4irohaznqx0vcjc0p.png"
                    ]
                },
                {
                    "title": "creat rotes",
                    "description": "",
                    "style": {},
                    "labelIds": [],
                    "memberIds": [],
                    "checklists": [],
                    "id": "tpru4eU"
                },
                {
                    "title": "Build a database",
                    "description": "",
                    "style": {
                        "backgroundImage": "https://res.cloudinary.com/dobrmrt0g/image/upload/v1712741079/ud6rdy5lmdnhxgjm74jg.png"
                    },
                    "labelIds": [
                        "l102"
                    ],
                    "memberIds": [],
                    "checklists": [],
                    "id": "tx85WKB",
                    "attach": [
                        "https://res.cloudinary.com/dobrmrt0g/image/upload/v1712741079/ud6rdy5lmdnhxgjm74jg.png"
                    ]
                },
                {
                    "title": "Implement middelwares",
                    "description": "",
                    "style": {},
                    "labelIds": [
                        "lZFhMje"
                    ],
                    "memberIds": [],
                    "checklists": [],
                    "id": "tKRDv8R"
                },
                {
                    "title": "Add sockets",
                    "description": "",
                    "style": {
                        "backgroundImage": "https://res.cloudinary.com/dobrmrt0g/image/upload/v1712741118/qrxx05jwmhvaufjzylqs.png"
                    },
                    "labelIds": [],
                    "memberIds": [],
                    "checklists": [],
                    "id": "tAu4Mva",
                    "attach": [
                        "https://res.cloudinary.com/dobrmrt0g/image/upload/v1712741118/qrxx05jwmhvaufjzylqs.png"
                    ]
                }
            ],
            "id": "gMIlri1"
        },
        {
            "title": "Working On",
            "isExtended": true,
            "style": {
                "backgroundColor": "gray",
                "themeColor": "blue"
            },
            "tasks": [
                {
                    "title": "Working On",
                    "description": "",
                    "style": {},
                    "labelIds": [],
                    "memberIds": [
                        "u101"
                    ],
                    "checklists": [],
                    "id": "tJyAis3",
                    "date": {
                        "dueDate": 1712178000000,
                        "time": "2:42 PM",
                        "isDone": false
                    }
                },
                {
                    "title": "Tweet System",
                    "description": "",
                    "style": {},
                    "labelIds": [],
                    "memberIds": [
                        "u104"
                    ],
                    "checklists": [],
                    "id": "tqPyG23",
                    "date": {
                        "dueDate": 1722373200000,
                        "time": "5:05 PM",
                        "isDone": false
                    }
                },
                {
                    "title": "Image Upload",
                    "description": "",
                    "style": {},
                    "labelIds": [
                        "lqckopf"
                    ],
                    "memberIds": [
                        "u101",
                        "u102"
                    ],
                    "checklists": [],
                    "id": "tOi8WfA"
                },
                {
                    "id": "c108",
                    "title": "CRUDs",
                    "description": "description",
                    "archivedAt": 1589983468418,
                    "style": {
                        "backgroundImage": "https://trello.com/1/cards/660d2f8f6d1588b03560bfcb/attachments/660e51a38812400a61b9ac76/download/CRUD.jpeg"
                    },
                    "labelIds": [],
                    "memberIds": [
                        "u101"
                    ],
                    "date": {
                        "dueDate": 1713992400000,
                        "time": "5:46 PM",
                        "isDone": false
                    }
                },
                {
                    "title": "CRUDs",
                    "description": "",
                    "style": {},
                    "labelIds": [],
                    "memberIds": [],
                    "checklists": [],
                    "id": "trYeltA"
                },
                {
                    "title": "Backend",
                    "description": "",
                    "style": {},
                    "labelIds": [],
                    "memberIds": [],
                    "checklists": [],
                    "id": "tC9AMIQ",
                    "date": {
                        "dueDate": 1714683600000,
                        "time": "1:22 PM",
                        "isDone": false
                    }
                }
            ],
            "id": "gnQemhi"
        },
        {
            "title": "QA",
            "isExtended": true,
            "style": {
                "backgroundColor": "gray",
                "themeColor": "blue"
            },
            "tasks": [
                {
                    "title": "🧑🏾‍💻 QA",
                    "description": "",
                    "style": {},
                    "labelIds": [],
                    "memberIds": [],
                    "checklists": [],
                    "id": "txs9hdq"
                },
                {
                    "title": "Testing",
                    "description": "",
                    "style": {},
                    "labelIds": [
                        "l101",
                        "lE1nmBj",
                        "l102"
                    ],
                    "memberIds": [
                        "u103"
                    ],
                    "checklists": [],
                    "id": "t2LxfhL",
                    "date": {
                        "dueDate": 1713733200000,
                        "time": "1:19 PM",
                        "isDone": false
                    }
                },
                {
                    "title": "Description",
                    "description": "",
                    "style": {},
                    "labelIds": [],
                    "memberIds": [
                        "u102",
                        "u101"
                    ],
                    "checklists": [],
                    "id": "tUfPL8L"
                },
                {
                    "title": "Comments",
                    "description": "",
                    "style": {
                        "backgroundImage": "https://res.cloudinary.com/dobrmrt0g/image/upload/v1712741824/hplkyewu9xauah8tb0j9.jpg"
                    },
                    "labelIds": [
                        "l101",
                        "lFLDwXi"
                    ],
                    "memberIds": [
                        "u101",
                        "u102"
                    ],
                    "checklists": [],
                    "id": "t9GfUKO",
                    "attach": [
                        "https://res.cloudinary.com/dobrmrt0g/image/upload/v1712741824/hplkyewu9xauah8tb0j9.jpg"
                    ]
                }
            ],
            "id": "gwTkBA7"
        },
        {
            "title": "🐞 Bugs",
            "isExtended": true,
            "style": {
                "backgroundColor": "gray",
                "themeColor": "red"
            },
            "tasks": [
                {
                    "title": "🐞 Bugs",
                    "description": "",
                    "style": {},
                    "labelIds": [],
                    "memberIds": [],
                    "checklists": [],
                    "id": "tv8JUEG"
                },
                {
                    "title": "File Mangment ",
                    "description": "",
                    "style": {},
                    "labelIds": [
                        "lkLulUM",
                        "lvoSl03",
                        "lRMVGuH"
                    ],
                    "memberIds": [
                        "u101",
                        "u104"
                    ],
                    "checklists": [],
                    "id": "tOHj5N7"
                },
                {
                    "title": "Render Bugs",
                    "description": "",
                    "style": {
                        "backgroundImage": "https://res.cloudinary.com/dobrmrt0g/image/upload/v1712742051/jdb2icpokubzlbfwmmxa.png"
                    },
                    "labelIds": [
                        "lmB5akC"
                    ],
                    "memberIds": [],
                    "checklists": [],
                    "id": "tsqBo1K",
                    "attach": [
                        "https://res.cloudinary.com/dobrmrt0g/image/upload/v1712742051/jdb2icpokubzlbfwmmxa.png"
                    ]
                },
                {
                    "title": "https://d2k1ftgv7pobq7.cloudfront.net/images/stickers/huh.png",
                    "description": "",
                    "style": {},
                    "labelIds": [],
                    "memberIds": [],
                    "checklists": [],
                    "id": "tmeqPgQ"
                },
                {
                    "title": "Summit ",
                    "description": "",
                    "style": {
                        "backgroundImage": "https://res.cloudinary.com/dobrmrt0g/image/upload/v1712741970/pmzuy7bpuknnp7s8k5uz.jpg"
                    },
                    "labelIds": [],
                    "memberIds": [
                        "u104",
                        "u101",
                        "u102"
                    ],
                    "checklists": [],
                    "id": "tRjpLuy",
                    "attach": [
                        "https://res.cloudinary.com/dobrmrt0g/image/upload/v1712741970/pmzuy7bpuknnp7s8k5uz.jpg"
                    ]
                }
            ],
            "id": "g2i33om"
        },
        {
            "title": "🗄 Done [Version: 1.1.0]",
            "isExtended": true,
            "style": {
                "backgroundColor": "gray",
                "themeColor": "green"
            },
            "tasks": [
                {
                    "title": "Done",
                    "description": "",
                    "style": {},
                    "labelIds": [],
                    "memberIds": [],
                    "checklists": [],
                    "id": "tK3mevK"
                },
                {
                    "title": "Sign-in functionality completed and tested",
                    "description": "",
                    "style": {},
                    "labelIds": [
                        "lett6Qb"
                    ],
                    "memberIds": [
                        "u104"
                    ],
                    "checklists": [],
                    "id": "t2Y7fhd"
                },
                {
                    "title": "Dark mode implemented and deployed",
                    "description": "",
                    "style": {},
                    "labelIds": [
                        "lett6Qb"
                    ],
                    "memberIds": [
                        "u101",
                        "u103"
                    ],
                    "checklists": [],
                    "id": "tonPf5P"
                },
                {
                    "title": "User profile picture display issue fixed and tested",
                    "description": "",
                    "style": {},
                    "labelIds": [],
                    "memberIds": [],
                    "checklists": [],
                    "id": "tFk9wLL"
                }
            ],
            "id": "g5tuotD"
        },
        {
            "title": "📆 Done [Version: 1.2.0]",
            "isExtended": true,
            "style": {
                "backgroundColor": "gray"
            },
            "tasks": [
                {
                    "title": "Done",
                    "description": "",
                    "style": {},
                    "labelIds": [],
                    "memberIds": [],
                    "checklists": [],
                    "id": "tdHBMhA"
                },
                {
                    "title": "Root",
                    "description": "",
                    "style": {
                        "backgroundImage": "https://res.cloudinary.com/dobrmrt0g/image/upload/v1712743245/wkwxfbkjzvpp6zqpezy6.png"
                    },
                    "labelIds": [
                        "lett6Qb",
                        "lu3rXf6"
                    ],
                    "memberIds": [
                        "u101"
                    ],
                    "checklists": [],
                    "id": "te2TMIj",
                    "attach": [
                        "https://res.cloudinary.com/dobrmrt0g/image/upload/v1712743245/wkwxfbkjzvpp6zqpezy6.png"
                    ]
                },
                {
                    "title": "Done",
                    "description": "",
                    "style": {
                        "backgroundImage": "https://res.cloudinary.com/dobrmrt0g/image/upload/v1712743271/yotbvkwxlnhjx2xbl3lb.gif"
                    },
                    "labelIds": [],
                    "memberIds": [],
                    "checklists": [],
                    "id": "tbIi7Kv",
                    "attach": [
                        "https://res.cloudinary.com/dobrmrt0g/image/upload/v1712743271/yotbvkwxlnhjx2xbl3lb.gif"
                    ]
                },
                {
                    "title": "Plan UX",
                    "description": "",
                    "style": {
                        "backgroundImage": "https://res.cloudinary.com/dobrmrt0g/image/upload/v1712743294/kxprjtodzoujfr65ttwk.jpg"
                    },
                    "labelIds": [],
                    "memberIds": [],
                    "checklists": [],
                    "id": "tKB0fZ7",
                    "attach": [
                        "https://res.cloudinary.com/dobrmrt0g/image/upload/v1712743294/kxprjtodzoujfr65ttwk.jpg"
                    ]
                }
            ],
            "id": "gkBJGA1"
        },
        {
            "title": "Happy hour",
            "isExtended": true,
            "style": {
                "backgroundColor": "gray"
            },
            "tasks": [
                {
                    "title": "What we have to lunch?",
                    "description": "",
                    "style": {
                        "backgroundImage": "https://res.cloudinary.com/dobrmrt0g/image/upload/v1712743433/sdzfwussuisy1q552dhj.jpg"
                    },
                    "labelIds": [
                        "le3yGiO",
                        "lN0EYkV"
                    ],
                    "memberIds": [],
                    "checklists": [],
                    "id": "tikD1kp",
                    "attach": [
                        "https://res.cloudinary.com/dobrmrt0g/image/upload/v1712743433/sdzfwussuisy1q552dhj.jpg"
                    ]
                }
            ],
            "id": "gDx2jqB"
        }
    ],
    activities: [
        {
            "id": "a101",
            "txt": "Changed Color",
            "createdAt": 154514,
            "byMemberId": "u101",
            "group": {
                "id": "g101",
                "title": "Urgent Stuff"
            },
            "task": {
                "id": "c101",
                "title": "Replace Logo"
            }
        }
    ]
}]