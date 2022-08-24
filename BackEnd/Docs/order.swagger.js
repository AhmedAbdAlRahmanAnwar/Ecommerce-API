exports.getAllOrders = {
    tags: ['Order'],
    description: 'This route allows only admin to get all orders',
    operationId: 'getAllOrders',
    parameters: [{
        in: 'query',
        name: 'page',
        type: 'integer',
        example: 3,
        description: 'When number of orders is greater than 12 orders, it divides into pages each page contain 12 orders.'
    }],
    responses: {
        200: {
            description: 'Get All Orders',
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
                            orders: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        user: {
                                            type: 'object',
                                            properties: {
                                                firstName: {
                                                    type: 'string',
                                                    example: 'peter'
                                                },
                                                lastName: {
                                                    type: 'string',
                                                    example: 'ali'
                                                }
                                            }
                                        },
                                        totalPrice: {
                                            type: 'number',
                                            example: 555
                                        },
                                        status: {
                                            type: 'string',
                                            example: 'pending, accepted, rejected, shipped, delivered, cancelled'
                                        },
                                        paymentMethod: {
                                            type: 'string',
                                            example: 'card or cash'
                                        },
                                        isDelivered: {
                                            type: 'boolean',
                                            example: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        400: {
            description: 'Client error',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'error message'
                            }
                        }
                    }
                }
            }
        }
    }
}

exports.createOrder = {
    tags: ['Order'],
    description: 'This route allows logged in user to create order',
    operationId: 'createOrder',
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
                                products: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            productId: {
                                                type: 'string',
                                                example: '62e8e168320f5a0290ghfa01'
                                            },
                                            name: {
                                                type: 'string',
                                                example: 'Camera Antique'
                                            },
                                            price: {
                                                type: 'integer',
                                                example: 121
                                            },
                                            image: {
                                                type: 'string',
                                                example: '/edd5e245-0db6-4b96-ad24-ds2f96e28ad8.png'
                                            },
                                            quantity: {
                                                type: 'integer',
                                                example: 7
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
                                paymentMethod: {
                                    type: 'string',
                                    example: 'card or cash'
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    responses: {
        201: {
            description: 'Order created successfully',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'order created'
                            },
                            clientSecret: {
                                type: 'string',
                                example: '62e8e168320f5a0290ghfa01'
                            },
                            order: {
                                type: 'object',
                                properties: {
                                    _id: {
                                        type: 'string',
                                        example: '62dc0857859779834b000be3'
                                    },
                                    user: {
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
                                    isDelivered: {
                                        type: 'boolean',
                                        example: 'false'
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
        },
        400: {
            description: 'Client error or missing required data' +
                ' Note: this route also validate products quantities if it is available in stock and returns' +
                ' quantityErrors array with the correct quantities',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message1: {
                                type: 'string',
                                example: 'error message'
                            },
                            message2: {
                                type: 'string',
                                example: 'Fields Required'
                            },
                            quantityErrors:{
                                type:'array',
                                items:{
                                    type:'object',
                                    properties:{
                                        productId: {
                                            type: 'string',
                                            example: '62e8e168320f5a0290ghfa01'
                                        },
                                        quantity:{
                                            type: 'integer',
                                            example: 7
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
            description: 'Order doesn\'t contains any product or one of them doesn\'t exist',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message1: {
                                type: 'string',
                                example: 'No products found to make an order'
                            },
                            message2: {
                                type: 'string',
                                example: 'Product Not Found'
                            }
                        }
                    }
                }
            }
        },
        502: {
            description: 'the server received an invalid response from the stripe payment gateway',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'error message based on type of the error'
                            }
                        }
                    }
                }
            }
        },
    }
}

exports.updateOrderStatus = {
    tags: ['Order'],
    description: 'This route allows only admin to update order status to one of the following statuses: '
        + '[\'accepted\', \'rejected\', \'shipped\', \'delivered\', \'cancelled\']',
    operationId: 'updateOrderStatus',
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
                                orderId: {
                                    type: 'string',
                                    example: '62e8e168320f5a0290ghfa01'
                                },
                                status: {
                                    type: 'string',
                                    example: '[\'accepted\', \'rejected\', \'shipped\', \'delivered\', \'cancelled\']'
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
            description: 'Order Status Updated',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Order Status Updated'
                            },
                            order: {
                                type: 'object',
                                properties: {
                                    _id: {
                                        type: 'string',
                                        example: '62dc0857859779834b000be3'
                                    },
                                    user: {
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
                                    isDelivered: {
                                        type: 'boolean',
                                        example: 'false'
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
        },
        400: {
            description: 'Admin Can\'t cancel order if it is delivered',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Can\'t cancel order that has been delivered'
                            }
                        }
                    }
                }
            }
        },
        404: {
            description: 'Order with the given Id doesn\'t exist',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Order Not Found'
                            }
                        }
                    }
                }
            }
        },
        422: {
            description: 'Provided id is not a valid MongoID',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Not Valid Order Id'
                            }
                        }
                    }
                }
            }
        }
    }
}

exports.getMyOrders = {
    tags: ['Order'],
    description: 'This route allows logged in user to get all of his orders',
    operationId: 'getMyOrders',
    parameters: [{
        in: 'query',
        name: 'page',
        type: 'integer',
        example: 3,
        description: 'When number of orders is greater than 12 orders, it divides into pages each page contain 12 orders.'
    }],
    responses: {
        200: {
            description: 'Get My Orders',
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
                            orders: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        _id: {
                                            type: 'string',
                                            example: '62dc0857859779834b000be3'
                                        },
                                        user: {
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
                                        isDelivered: {
                                            type: 'boolean',
                                            example: 'false'
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
        }
    }
}

exports.getOrderById = {
    tags: ['Order'],
    description: 'This route allows only admin to get specific order by its id',
    operationId: 'getOrderById',
    parameters: [{
        in: 'path',
        name: 'id',
        type: 'string',
        example: '62e8e1686d0f5a029046fa01',
        description: 'Order ID'
    }],
    responses: {
        200: {
            description: 'Get Order by Id',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            order: {
                                type: 'object',
                                properties: {
                                    _id: {
                                        type: 'string',
                                        example: '62dc0857859779834b000be3'
                                    },
                                    user: {
                                        type: 'object',
                                        properties: {
                                            firstName: {
                                                type: 'string',
                                                example: 'peter'
                                            },
                                            lastName: {
                                                type: 'string',
                                                example: 'ali'
                                            }
                                        }
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
                                    isDelivered: {
                                        type: 'boolean',
                                        example: 'false'
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
        },
        404: {
            description: 'Order with the given Id doesn\'t exist',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Order Not Found'
                            }
                        }
                    }
                }
            }
        },
        422: {
            description: 'Provided id is not a valid MongoID',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Not Valid Order Id'
                            }
                        }
                    }
                }
            }
        }
    }
}

exports.cancelOrder = {
    tags: ['Order'],
    description: 'This route allow logged in user to cancel any of his orders if it is still pending',
    operationId: 'cancelOrder',
    parameters: [{
        in: 'path',
        name: 'id',
        type: 'string',
        example: '62e8e1686d0f5a029046fa01',
        description: 'Order ID'
    }],
    responses: {
        200: {
            description: 'Order status changed to cancelled',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Order is Cancelled'
                            },
                            order: {
                                type: 'object',
                                properties: {
                                    _id: {
                                        type: 'string',
                                        example: '62dc0857859779834b000be3'
                                    },
                                    user: {
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
                                    isDelivered: {
                                        type: 'boolean',
                                        example: 'false'
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
                                example: 'Invalid Order ID'
                            }
                        }
                    }
                }
            }
        },
        403: {
            description: 'User trying to cancel order that its status isn\'t pending ' +
                'or trying to cancel order that is not his',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Not Authorized'
                            }
                        }
                    }
                }
            }
        },
        404: {
            description: 'Order with the given Id doesn\'t exist',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Order Not Found'
                            }
                        }
                    }
                }
            }
        }
    }
}

exports.filterOrders = {
    tags: ['Order'],
    description: 'This route returns orders based on specific filters like userName, status, order Id',
    operationId: 'filterOrders',
    parameters: [
        {
            in: 'query',
            name: 'userName',
            type: 'string',
            example: 'ahmed',
            description: 'User Name'
        },
        {
            in: 'query',
            name: 'orderId',
            type: 'string',
            example: '62e8e168320f5a0290ghfa01',
            description: 'Order ID'
        },
        {
            in: 'query',
            name: 'status',
            type: 'string',
            example: 'pending, accepted, rejected, shipped, delivered, cancelled',
            description: 'Order Status'
        },
        {
            in: 'query',
            name: 'sortByDate',
            type: 'string',
            example: 'lth or htl',
            description: 'Sort orders by Date lth(low to high) or htl(high to low)'
        },
        {
            in: 'query',
            name: 'page',
            type: 'integer',
            example: 1,
            description: 'Page Number'
        }
    ],
    responses: {
        200: {
            description: 'Get All Orders',
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
                            orders: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        _id: {
                                            type: 'string',
                                            example: '62dc0857859779834b000be3'
                                        },
                                        user: {
                                            type: 'object',
                                            properties: {
                                                firstName: {
                                                    type: 'string',
                                                    example: 'peter'
                                                },
                                                lastName: {
                                                    type: 'string',
                                                    example: 'ali'
                                                }
                                            }
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
                                        isDelivered: {
                                            type: 'boolean',
                                            example: 'false'
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
        422: {
            description: 'Validation Errors on query strings',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message1: {
                                type: 'string',
                                example: 'Invalid orderId'
                            },
                            message2: {
                                type: 'string',
                                example: 'Page must be a number'
                            },
                            message3: {
                                type: 'string',
                                example: 'Invalid Sort Query, Query must be htl or lth'
                            },
                            message4: {
                                type: 'string',
                                example: 'Invalid status'
                            },
                            message5: {
                                type: 'string',
                                example: 'userName should be a string'
                            },
                            message6: {
                                type: 'string',
                                example: 'userName should has minimum length of 3 characters'
                            }
                        }
                    }
                }
            }
        }
    }
}

exports.updateStock = {
    tags: ['Order'],
    description: 'This route should be called after successful payment to update products stock',
    operationId: 'updateStock',
    parameters: [{
        in: 'path',
        name: 'id',
        type: 'string',
        example: '62e8e1686d0f5a029046fa01',
        description: 'Order ID'
    }],
    responses: {
        200: {
            description: 'Stock Updated Successfully by the new products quantities',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Stock Updated Successfully'
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
                                example: 'Invalid Order ID'
                            }
                        }
                    }
                }
            }
        },
        403: {
            description: 'The order sent doesn\'t belong to the logged in user that successfully paid for it',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Not Authorized'
                            }
                        }
                    }
                }
            }
        },
        404: {
            description: 'Order with the given Id doesn\'t exist',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Order Not Found'
                            }
                        }
                    }
                }
            }
        }
    }
}