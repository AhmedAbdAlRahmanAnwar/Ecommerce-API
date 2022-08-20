exports.addReview = {
    tags: ['Review'],
    description: 'This route allows user to add review on purchased product,' +
        ' user must buy product before adding review on it' +
        ' Note: User can\'t edit or delete his review once it has been submitted',
    operationId: 'addReview',
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
                                productId: {
                                    type: 'string',
                                    example: '62e8e168320f5a0290ghfa01'
                                },
                                comment: {
                                    type: 'string',
                                    example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
                                },
                                rating: {
                                    type: 'number',
                                    example: 3
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
            description: 'Review added to purchased product',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            product: {
                                type: 'object',
                                properties: {
                                    _id: {
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
                                    description: {
                                        type: 'string',
                                        example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
                                    },
                                    modelYear: {
                                        type: 'integer',
                                        example: 1950
                                    },
                                    category: {
                                        type: 'string',
                                        example: '62e8e168320f5a0290ghfa01'
                                    },
                                    quantity: {
                                        type: 'integer',
                                        example: 7
                                    },
                                    rating: {
                                        type: 'number',
                                        example: 3.5
                                    },
                                    numberOfSales: {
                                        type: 'integer',
                                        example: 7
                                    },
                                    createdAt: {
                                        type: 'string',
                                        example: '2022-08-14T00:50:58.879Z'
                                    },
                                    updatedAt: {
                                        type: 'string',
                                        example: '2022-08-14T00:50:58.879Z'
                                    },
                                    reviews: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                _id: {
                                                    type: 'string',
                                                    example: '62e8e168320f5a0290ghfa01'
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
                                                        },
                                                    }
                                                },
                                                rating: {
                                                    type: 'number',
                                                    example: 3
                                                },
                                                comment: {
                                                    type: 'string',
                                                    example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
                                                },
                                                createdAt: {
                                                    type: 'string',
                                                    example: '2022-08-14T00:50:58.879Z'
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
        },
        400: {
            description: 'Client error',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message1: {
                                type: 'string',
                                example: 'Only One Review Allowed per product'
                            },
                            message2: {
                                type: 'string',
                                example: 'Invalid product ID'
                            }
                        }
                    }
                }
            }
        },
        403: {
            description: 'Unauthorized action by user',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Product must be bought before reviewing'
                            }
                        }
                    }
                }
            }
        },
        404: {
            description: 'Product with the given Id doesn\'t exist',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Product Not Found'
                            }
                        }
                    }
                }
            }
        },
        422:{
            description: 'Missing required data or invalid data format entered',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message1: {
                                type: 'string',
                                example: 'No review provided'
                            },
                            message2: {
                                type: 'string',
                                example: 'Invalid Product Id'
                            },
                            message3: {
                                type: 'string',
                                example: 'Rating must be a number between 0 and 5'
                            },
                            message4: {
                                type: 'string',
                                example: 'comment should be a string'
                            }
                        }
                    }
                }
            }
        }
    }
}