
export const boardsDemoData = [
    {
        _id: "b101",
        title: "Robot dev proj",
        isStarred: false,
        archivedAt: 1589983468418,
        createdBy: {
            "_id": "u101",
            "fullname": "Abi Abambi",
            "imgUrl": "http://some-img"
        },
        style: {
            backgroundImage: "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/1280x1920/1454636af11dff5041c580f6ca325ace/photo-1711522676532-d6dce8a42335.jpg"
        },
        labels: [
            {
                "id": "l101",
                "title": "Done",
                "color": "#61bd4f"
            },
            {
                "id": "l102",
                "title": "Progress",
                "color": "#61bd33"
            }
        ],
        members: [
            {
                "_id": "u101",
                "fullname": "Tal Tarablus",
                "imgUrl": "https://www.google.com"
            }
        ],
        groups: [
            {
                "id": "g101",
                "title": "Group 1",
                "archivedAt": 1589983468418,
                "tasks": [
                    {
                        "id": "c101",
                        "title": "Replace logo"
                    },
                    {
                        "id": "c102",
                        "title": "Add Samples"
                    }
                ],
                "style": {}
            },
            {
                "id": "g102",
                "title": "Group 2",
                "tasks": [
                    {
                        "id": "c103",
                        "title": "Do that",
                        "archivedAt": 1589983468418,
                    },
                    {
                        "id": "c104",
                        "title": "Help me",
                        "status": "in-progress", // monday
                        "priority": "high",
                        "description": "description",
                        "comments": [
                            {
                                "id": "ZdPnm",
                                "txt": "also @yaronb please CR this",
                                "createdAt": 1590999817436,
                                "byMember": {
                                    "_id": "u101",
                                    "fullname": "Tal Tarablus",
                                    "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                                }
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
                        "byMember": {
                            "_id": "u101",
                            "username": "Tal",
                            "fullname": "Tal Tarablus",
                            "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                        },
                        "style": {
                            "backgroundColor": "#26de81"
                        }
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
                "byMember": {
                    "_id": "u101",
                    "fullname": "Abi Abambi",
                    "imgUrl": "http://some-img"
                },
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
    {
        "_id": "b104",
        "title": "AI Development Project",
        "isStarred": false,
        "archivedAt": 1623465068418,
        "createdBy": {
            "_id": "u103",
            "fullname": "Alice Johnson",
            "imgUrl": "http://random-img"
        },
        "style": {
            "backgroundImage": "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x320/efcafb84d2e8f00d6d79bc9cf2830b06/photo-1712107063586-a282f12c3973.jpg"
        },
        "labels": [
            {
                "id": "l103",
                "title": "Pending",
                "color": "#ff0000"
            },
            {
                "id": "l104",
                "title": "Review",
                "color": "#0000ff"
            }
        ],
        "members": [
            {
                "_id": "u103",
                "fullname": "Alice Johnson",
                "imgUrl": "https://www.random-example.com"
            }
        ],
        "groups": [
            {
                "id": "g103",
                "title": "Development Team",
                "archivedAt": 1589983468418,
                "tasks": [
                    {
                        "id": "c105",
                        "title": "Implement Neural Networks"
                    },
                    {
                        "id": "c106",
                        "title": "Optimize Algorithms"
                    }
                ],
                "style": {}
            },
            {
                "id": "g104",
                "title": "QA Team",
                "tasks": [
                    {
                        "id": "c107",
                        "title": "Test Model Accuracy",
                        "archivedAt": 1589983468418,
                    },
                    {
                        "id": "c108",
                        "title": "Bug Fixes",
                        "status": "in-progress",
                        "priority": "high",
                        "description": "Perform thorough testing and debugging",
                        "comments": [
                            {
                                "id": "RfOpq",
                                "txt": "Please review ASAP",
                                "createdAt": 1590999817436,
                                "byMember": {
                                    "_id": "u103",
                                    "fullname": "Alice Johnson",
                                    "imgUrl": "http://random-image.jpg"
                                }
                            }
                        ],
                        "checklists": [
                            {
                                "id": "AoBnG",
                                "title": "Bug Checklist",
                                "todos": [
                                    {
                                        "id": "312kY",
                                        "title": "Check for memory leaks",
                                        "isDone": false
                                    }
                                ]
                            }
                        ],
                        "memberIds": ["u103"],
                        "labelIds": ["l103", "l104"],
                        "dueDate": 16156215211,
                        "byMember": {
                            "_id": "u103",
                            "username": "Alice",
                            "fullname": "Alice Johnson",
                            "imgUrl": "http://random-image.jpg"
                        },
                        "style": {
                            "backgroundColor": "#ffa500"
                        }
                    }
                ],
                "style": {}
            }
        ],
        "activities": [
            {
                "id": "a102",
                "txt": "Updated Model Architecture",
                "createdAt": 154514,
                "byMember": {
                    "_id": "u103",
                    "fullname": "Alice Johnson",
                    "imgUrl": "http://random-img"
                },
                "group": {
                    "id": "g103",
                    "title": "Development Team"
                },
                "task": {
                    "id": "c105",
                    "title": "Implement Neural Networks"
                }
            }
        ]
    },
    {
        "_id": "b105",
        "title": "Machine Learning Project",
        "isStarred": true,
        "archivedAt": 1607341068418,
        "createdBy": {
            "_id": "u104",
            "fullname": "Bob Smith",
            "imgUrl": "http://some-random-image"
        },
        "style": {
            "backgroundImage": "url('http://random-background')"
        },
        "labels": [
            {
                "id": "l105",
                "title": "Backlog",
                "color": "#ff6600"
            },
            {
                "id": "l106",
                "title": "Review",
                "color": "#9900cc"
            }
        ],
        "members": [
            {
                "_id": "u104",
                "fullname": "Bob Smith",
                "imgUrl": "https://www.example-random.com"
            }
        ],
        "groups": [
            {
                "id": "g105",
                "title": "Research Team",
                "archivedAt": 1589983468418,
                "tasks": [
                    {
                        "id": "c109",
                        "title": "Literature Review"
                    },
                    {
                        "id": "c110",
                        "title": "Data Collection"
                    }
                ],
                "style": {}
            },
            {
                "id": "g106",
                "title": "Data Science Team",
                "tasks": [
                    {
                        "id": "c111",
                        "title": "Feature Engineering",
                        "archivedAt": 1589983468418,
                    },
                    {
                        "id": "c112",
                        "title": "Model Training",
                        "status": "in-progress",
                        "priority": "high",
                        "description": "Train ML models on collected data",
                        "comments": [
                            {
                                "id": "TqXvW",
                                "txt": "This is important!",
                                "createdAt": 1590999817436,
                                "byMember": {
                                    "_id": "u104",
                                    "fullname": "Bob Smith",
                                    "imgUrl": "http://random-image.jpg"
                                }
                            }
                        ],
                        "checklists": [
                            {
                                "id": "JpQsL",
                                "title": "Model Checklist",
                                "todos": [
                                    {
                                        "id": "123mZ",
                                        "title": "Check model performance metrics",
                                        "isDone": false
                                    }
                                ]
                            }
                        ],
                        "memberIds": ["u104"],
                        "labelIds": ["l105", "l106"],
                        "dueDate": 16156215211,
                        "byMember": {
                            "_id": "u104",
                            "username": "Bob",
                            "fullname": "Bob Smith",
                            "imgUrl": "http://random-image.jpg"
                        },
                        "style": {
                            "backgroundColor": "#cc0066"
                        }
                    }
                ],
                "style": {}
            }
        ],
        "activities": [
            {
                "id": "a103",
                "txt": "Completed Literature Review",
                "createdAt": 154514,
                "byMember": {
                    "_id": "u104",
                    "fullname": "Bob Smith",
                    "imgUrl": "http://some-random-image"
                },
                "group": {
                    "id": "g105",
                    "title": "Research Team"
                },
                "task": {
                    "id": "c109",
                    "title": "Literature Review"
                }
            }
        ]
    }

]

export const userDemoData = [
    {
        "_id": "u101",
        "fullname": "Abi Abambi",
        "username": "abi@ababmi.com",
        "password": "aBambi123",
        "imgUrl": "http://some-img.jpg",
        "mentions": [{ //optional
            "id": "m101",
            "boardId": "m101",
            "taskId": "t101"
        }]
    }
]