
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
    }
]