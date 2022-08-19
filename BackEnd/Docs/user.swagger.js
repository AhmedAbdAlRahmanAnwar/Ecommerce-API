exports.getAllUsers = {
    tags: ['User'],
    description: 'This route allows only admin to get all users data',
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
    description: 'This route allows only admin to get one user by his id',
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
                            userOrders: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        _id: {
                                            type: 'string',
                                            example: '62dc0857859779834b000be3'
                                        },
                                        products: {
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
                                        shippingAddress: {
                                            type: 'object',
                                            properties: {
                                                street: {
                                                    type: 'string',
                                                },
                                                city: {
                                                    type: 'string',
                                                },
                                                country: {
                                                    type: 'string',
                                                },
                                                mobile: {
                                                    type: 'string',
                                                    example: '01236547895'
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

exports.deleteUser = {
    tags: ['User'],
    description: 'This route allows only admin to delete user account using it\'s ID',
    operationId: 'deleteUser',
    parameters: [{
        in: 'path',
        name: 'id',
        type: 'string',
        example: '62d97e0d60c1097fefd52162',
        description: 'UserID'
    }],
    responses: {
        200: {
            description: 'User account deleted from the database',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'User Deleted Successfully'
                            }
                        }
                    }
                }
            }
        },
        400: {
            description: 'Provided id is the same id of the admin',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Admin can\'t delete himself'
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
        }
    }
}

exports.updateUser = {
    tags: ['User'],
    description: 'This route allows user to update only his userName and email',
    operationId: 'updateUser',
    requestBody: {
        required: true,
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        payload: {
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
                                oldEmail: {
                                    type: 'string',
                                    required: true,
                                    example: "john@gmail.com"
                                },
                                newEmail: {
                                    type: 'string',
                                    required: true,
                                    example: "john@gmail.com"
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    responses: {
        200: {
            description: 'Email or UserName has been Updated Successfully',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'User Data Updated Successfully'
                            }
                        }
                    }
                }
            }
        },
        400: {
            description: 'Required Data is missing or Incorrect user data',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Incorrect data'
                            }
                        }
                    }
                }
            }
        },
        422: {
            description: 'Validation Error',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message1: {
                                type: 'string',
                                example: 'First Name should be a string'
                            },
                            message2: {
                                type: 'string',
                                example: 'First Name should has minimum length of 3 characters'
                            },
                            message3: {
                                type: 'string',
                                example: 'Last Name should be a string'
                            },
                            message4: {
                                type: 'string',
                                example: 'Last Name should has minimum length of 3 characters'
                            },
                            message5: {
                                type: 'string',
                                example: 'Invalid email format'
                            },
                            message6: {
                                type: 'string',
                                example: 'No Data Provided'
                            }
                        }
                    }
                }
            }
        }
    }
}

exports.makeUserAdmin = {
    tags: ['User'],
    description: 'This route allows only admin to promote another user to be an admin',
    operationId: 'makeUserAdmin',
    parameters: [{
        in: 'path',
        name: 'id',
        type: 'string',
        example: '62d97e0d60c1097fqd52162',
        description: 'UserID'
    }],
    responses: {
        200: {
            description: 'User promoted to be an admin',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'User Updated to be Admin'
                            }
                        }
                    }
                }
            }
        },
        400: {
            description: 'Provided id is not a valid MongoID',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Invalid UserId'
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
        }
    }
}

exports.addNewAddress = {
    tags: ['User'],
    description: 'This route allows user to add new address to his profile',
    operationId: 'addNewAddress',
    requestBody: {
        required: true,
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        payload: {
                            type: 'object',
                            properties: {
                                street: {
                                    type: 'string',
                                },
                                city: {
                                    type: 'string',
                                },
                                country: {
                                    type: 'string',
                                },
                                mobile: {
                                    type: 'string',
                                    example: '01236547895'
                                },
                            }
                        }
                    }
                }
            }
        }
    },
    responses: {
        201: {
            description: 'New Address added to user profile',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'address added'
                            },
                            address: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        _id: {
                                            type: 'integer',
                                            example: 3
                                        },
                                        street: {
                                            type: 'string',
                                        },
                                        city: {
                                            type: 'string',
                                        },
                                        country: {
                                            type: 'string',
                                        },
                                        mobile: {
                                            type: 'string',
                                            example: '01236547895'
                                        },
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        400: {
            description: 'Provided address is already exists',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Address Already exist'
                            }
                        }
                    }
                }
            }
        },
        422: {
            description: 'Missing required data or invalid data entered',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message1: {
                                type: 'string',
                                example: 'No address data provided'
                            },
                            message2: {
                                type: 'string',
                                example: 'street should be a string'
                            },
                            message3: {
                                type: 'string',
                                example: 'city should be a string'
                            },
                            message4: {
                                type: 'string',
                                example: 'country should be a string'
                            },
                            message5: {
                                type: 'string',
                                example: 'mobile should be a number'
                            }
                        }
                    }
                }
            }
        }
    }
}

exports.updateAddress = {
    tags: ['User'],
    description: 'This route allows user to update one of his existing addresses, User can update specific field e.g. street, or any combination of address fields e.g. city and country',
    operationId: 'updateAddress',
    requestBody: {
        required: true,
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        addressId: {
                            type: 'integer',
                            example: 10
                        },
                        payload: {
                            type: 'object',
                            properties: {
                                street: {
                                    type: 'string',
                                },
                                city: {
                                    type: 'string',
                                },
                                country: {
                                    type: 'string',
                                },
                                mobile: {
                                    type: 'string',
                                    example: '01236547895'
                                },
                            }
                        }
                    }
                }
            }
        }
    },
    responses: {
        200: {
            description: 'User Address updated successfully',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'address updated'
                            },
                            address: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        _id: {
                                            type: 'integer',
                                            example: 3
                                        },
                                        street: {
                                            type: 'string',
                                        },
                                        city: {
                                            type: 'string',
                                        },
                                        country: {
                                            type: 'string',
                                        },
                                        mobile: {
                                            type: 'string',
                                            example: '01236547895'
                                        },
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        400: {
            description: 'Provided address Id doesn\'t exist or unallowed update provided',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message1: {
                                type: 'string',
                                example: 'Address id doesn\'t exist'
                            },
                            message2: {
                                type: 'string',
                                example: 'Invalid Update!'
                            }
                        }
                    }
                }
            }
        },
        422: {
            description: 'Missing required data or invalid data entered',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message1: {
                                type: 'string',
                                example: 'No Updated Address Data provided'
                            },
                            message2: {
                                type: 'string',
                                example: 'Invalid Address ID'
                            },
                            message3: {
                                type: 'string',
                                example: 'street should be a string'
                            },
                            message4: {
                                type: 'string',
                                example: 'city should be a string'
                            },
                            message5: {
                                type: 'string',
                                example: 'country should be a string'
                            },
                            message6: {
                                type: 'string',
                                example: 'mobile should be a number'
                            }
                        }
                    }
                }
            }
        }
    }
}

exports.deleteAddress = {
    tags: ['User'],
    description: 'This route allows user to delete one of his addresses',
    operationId: 'deleteAddress',
    parameters: [{
        in: 'path',
        name: 'id',
        type: 'integer',
        example: 3,
        description: 'AddressID'
    }],
    responses: {
        200: {
            description: 'Address deleted from user profile',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'address deleted'
                            },
                            address: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        _id: {
                                            type: 'integer',
                                            example: 3
                                        },
                                        street: {
                                            type: 'string',
                                        },
                                        city: {
                                            type: 'string',
                                        },
                                        country: {
                                            type: 'string',
                                        },
                                        mobile: {
                                            type: 'string',
                                            example: '01236547895'
                                        },
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        400: {
            description: 'Provided address Id doesn\'t exists',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Address id doesn\'t exist'
                            }
                        }
                    }
                }
            }
        }
    }
}

exports.addProductToWishlist = {
    tags: ['User'],
    description: 'This route allows user to add product into his wishlist',
    operationId: 'addProductToWishlist',
    requestBody: {
        required: true,
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        productId: {
                            type: 'string',
                            example: '62e8e1686d0f5a029046fa01'
                        }
                    }
                }
            }
        }
    },
    responses: {
        200: {
            description: 'Product added to wishlist',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Product added to wishlist'
                            },
                            wishlist: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        product: {
                                            type: 'string',
                                            example: '62e902def69f0a6f79ce5ac0'
                                        },
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        400: {
            description: 'Missing or Incorrect Data sent by user',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message1: {
                                type: 'string',
                                example: 'ProductId Required'
                            },
                            message2: {
                                type: 'string',
                                example: 'Invalid Product ID'
                            },
                            message3: {
                                type: 'string',
                                example: 'product already exist in wishlist'
                            }
                        }
                    }
                }
            }
        },
        404: {
            description: 'The product with the given ID doesn\'t exist',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'product not found'
                            }
                        }
                    }
                }
            }
        }
    }
}

exports.deleteProductFromWishlist = {
    tags: ['User'],
    description: 'This route allows user to remove one product from his wishlist',
    operationId: 'deleteProductFromWishlist',
    requestBody: {
        required: true,
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        required: false,
                        productId: {
                            type: 'string',
                            example: '62e8e1686d0f5a029046fa01'
                        }
                    }
                }
            }
        }
    },
    responses: {
        200: {
            description: 'Product removed from wishlist',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Product removed from wishlist'
                            },
                            wishlist: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        product: {
                                            type: 'string',
                                            example: '62e902def69f0a6f79ce5ac0'
                                        },
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        400: {
            description: 'Missing or Incorrect Data sent by user',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message1: {
                                type: 'string',
                                example: 'ProductId Required'
                            },
                            message2: {
                                type: 'string',
                                example: 'Invalid Product ID'
                            }
                        }
                    }
                }
            }
        }
    }
}

exports.clearWishlist = {
    tags: ['User'],
    description: 'This route allows user to remove all products from his wishlist',
    operationId: 'clearWishlist',
    responses: {
        200: {
            description: 'All products removed from Wishlist',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Wishlist is Cleared'
                            }
                        }
                    }
                }
            }
        }
    }
}