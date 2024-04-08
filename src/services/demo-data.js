
export const boardsDemoData = [
    {
        _id: "b101",
        title: "Demo Data",
        isStarred: true,
        archivedAt: 1589983468418,
        createdById: "_u101",
        style: {
            backgroundImage: "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/1280x1920/1454636af11dff5041c580f6ca325ace/photo-1711522676532-d6dce8a42335.jpg"
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
                        "title": "User Management",
                        "description": "description",
                        "style": {
                            "backgroundImage": "https://trello.com/1/cards/660d25caed4263dcfcc3dbf0/attachments/660e3f679cb08cb6edb7fec3/download/user.jpg"
                        },
                        "labelIds": ["l101", "l102"],
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
                        "labelIds": [],
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
                        "dueDate": 16156215211,
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