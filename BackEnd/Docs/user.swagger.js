exports.getAllUsers = {
    tags: ['User'],
    description: 'This route allow only admin to get all users data',
    operationId: 'getAllUsers',
    parameters: [
        {
            in: 'query',
            name: 'page',
            type: 'integer',
            example: 3,
            description: 'When number of user is greater than 12 users, it divides into pages each page contain 12 users.'
        },
    ],
    responses: {
        200: {
            description: 'Get all users',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            pageNumber: {
                                type: 'integer',
                                example: 3
                            },
                            numberOfPages: {
                                type: 'integer',
                                example: 10
                            },
                            users: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        firstName: {
                                            type: 'string',
                                            example: 'admin'
                                        },
                                        lastName: {
                                            type: 'string',
                                            example: 'admin'
                                        },
                                        email: {
                                            type: 'string',
                                            example: 'admin@gmail.com'
                                        },
                                        isAdmin: {
                                            type: 'boolean',
                                            example: 'false'
                                        },
                                        createdAt: {
                                            type: 'string',
                                            example: '2022-07-23T14:40:23.899+00:00'
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

exports.getUserById = {
    tags: ['User'],
    description: 'This route allow only admin to get one user by his id',
    operationId: 'getUserById',
    parameters: [
        {
            in: 'path',
            name: 'id',
            type: 'string',
            example: '62d97e0d60c1097fefd52162',
            description: 'UserID'
        },
        {
            in: 'query',
            name: 'page',
            type: 'integer',
            example: 3,
            description: 'When number of orders is greater than 12 users, it divides into pages each page contain 12 orders.'
        }
    ],
    responses: {
        200: {
            description: 'Get User Data and his Orders',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            user: {
                                type: 'object',
                                properties: {
                                    _id: {
                                        type: 'string',
                                        example: '62dc0857859779834b000be3'
                                    },
                                    firstName: {
                                        type: 'string',
                                        example: 'admin'
                                    },
                                    lastName: {
                                        type: 'string',
                                        example: 'admin'
                                    },
                                    email: {
                                        type: 'string',
                                        example: 'admin@gmail.com'
                                    },
                                    isAdmin: {
                                        type: 'boolean',
                                        example: 'false'
                                    },
                                    createdAt: {
                                        type: 'string',
                                        example: '2022-07-23T14:40:23.899+00:00'
                                    }
                                }
                            },
                            pageNumber: {
                                type: 'integer',
                                example: 3
                            },
                            numberOfPages: {
                                type: 'integer',
                                example: 10
                            },
                            userOrders:{
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        _id: {
                                            type: 'string',
                                            example: '62dc0857859779834b000be3'
                                        },
                                        products:{
                                            type: 'array',
                                            items: {
                                                type: 'object',
                                                properties: {
                                                    productId: {
                                                        type: 'string',
                                                        example: '62dc0857859779834b000be3'
                                                    },
                                                    name: {
                                                        type: 'string',
                                                        example: 'Vase Antique'
                                                    },
                                                    quantity: {
                                                        type: 'integer',
                                                        example: 8
                                                    },
                                                    price: {
                                                        type: 'integer',
                                                        example: 99
                                                    },
                                                    image: {
                                                        type: 'string',
                                                        example: '/cb0a6b12-7ab1-4260-93a6-33b0a505ad10.png'
                                                    }
                                                }
                                            }
                                        },
                                        shippingAddress:{
                                            type: 'object',
                                            properties: {
                                                street:{
                                                    type:'string',
                                                },
                                                city:{
                                                    type:'string',
                                                },
                                                country:{
                                                    type:'string',
                                                },
                                                mobile:{
                                                    type:'string',
                                                    example:'01236547895'
                                                },
                                            }
                                        },
                                        totalPrice: {
                                            type: 'integer',
                                            example: 999
                                        },
                                        shippingPrice: {
                                            type: 'integer',
                                            example: 14
                                        },
                                        status: {
                                            type: 'string',
                                            example: 'pending, accepted, rejected, shipped, delivered, cancelled'
                                        },
                                        paymentMethod: {
                                            type: 'string',
                                            example: 'card'
                                        },
                                        isPaid: {
                                            type: 'boolean',
                                            example: 'false'
                                        },
                                        paidAt: {
                                            type: 'string',
                                            example: '2022-07-23T14:40:23.899+00:00'
                                        },
                                        isDelivered: {
                                            type: 'boolean',
                                            example: 'false'
                                        },
                                        deliveredAt: {
                                            type: 'string',
                                            example: '2022-07-23T14:40:23.899+00:00'
                                        },
                                        createdAt: {
                                            type: 'string',
                                            example: '2022-07-23T14:40:23.899+00:00'
                                        },
                                        updatedAt: {
                                            type: 'string',
                                            example: '2022-07-23T14:40:23.899+00:00'
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        404: {
            description: 'No User Found with the provided id',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'User Not Found'
                            }
                        }
                    }
                }
            }
        },
        400: {
            description: 'Error caused by providing invalid data e.g. Incorrect UserId format',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'error message based on the type of the error'
                            }
                        }
                    }
                }
            }
        }
    }
}

// exports.deleteUser = {
//
// }

// exports.updateUser = {
//
// }

// exports.makeUserAdmin = {
//
// }