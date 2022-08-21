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
    },
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
            description: 'Client error',
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
    description: 'This route allows only admin to update order status',
    operationId: 'createOrder',
}

exports.getMyOrders = {
    tags: ['Order'],
    description: 'This route allows logged in user to get all his orders',
    operationId: 'getMyOrders',
}

exports.getOrderById = {
    tags: ['Order'],
    description: '',
    operationId: 'getOrderById',
}

exports.cancelOrder = {
    tags: ['Order'],
    description: '',
    operationId: 'cancelOrder',
}

exports.filterOrders = {
    tags: ['Order'],
    description: '',
    operationId: 'filterOrders',
}

exports.updateStock = {
    tags: ['Order'],
    description: '',
    operationId: 'updateStock',
}

exports.checkout = {
    tags: ['Order'],
    description: '',
    operationId: 'checkout',
}