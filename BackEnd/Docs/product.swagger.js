exports.getAllProducts = {
    security: {
        jwt: []
    },
    tags: ['Product'],
    description: 'This route allow you to get all products',
    operationId: 'getAllUsers',
    parameters: [{
        in: 'query',
        name: 'page',
        type: 'integer',
        example: 3,
        description: 'When number of products is greater than 12 products, it divides into pages each page contain 12 products.'
    }],
    responses: {
        200: {
            description: 'Get all products',
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
                            products: {
                                type: 'array',
                                items: {
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
                                        rating: {
                                            type: 'number',
                                            example: 3.5
                                        },
                                        category: {
                                            type: 'object',
                                            properties: {
                                                _id: {
                                                    type: 'string',
                                                    example: '62e8e168320f5a0290ghfa01'
                                                },
                                                categoryName: {
                                                    type: 'string',
                                                    example: 'statue'
                                                }
                                            }
                                        },
                                        image: {
                                            type: 'string',
                                            example: '/edd5e245-0db6-4b96-ad24-ds2f96e28ad8.png'
                                        },
                                        quantity: {
                                            type: 'integer',
                                            example: 7
                                        },
                                        numberOfSales: {
                                            type: 'integer',
                                            example: 4
                                        },
                                        createdAt: {
                                            type: 'string',
                                            example: '2022-08-14T00:50:58.879Z'
                                        },
                                        updatedAt: {
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
}

exports.createProduct = {
    tags: ['Product'],
    description: 'This route allow only admin to add new product',
    operationId: 'createProduct',
    requestBody: {
        required: true,
        content: {
            'multipart/form-data': {
                schema: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string',
                            required: true,
                        },
                        price: {
                            type: 'integer',
                            required: true
                        },
                        description: {
                            type: 'string',
                            required: true
                        },
                        modelYear: {
                            type: 'integer',
                            required: true
                        },
                        category: {
                            type: 'string',
                            required: true
                        },
                        quantity: {
                            type: 'integer',
                            required: true
                        },
                        image: {
                            format: 'image',
                            required: true
                        }
                    }
                }
            }
        }
    },
    responses: {
        201: {
            description: 'New product is added successfully',
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
                                    rating: {
                                        type: 'number',
                                        example: 0
                                    },
                                    category: {
                                        type: 'string',
                                        example: '62e8e168320f5a0290ghfa01'
                                    },
                                    image: {
                                        type: 'string',
                                        example: '/edd5e245-0db6-4b96-ad24-ds2f96e28ad8.png'
                                    },
                                    quantity: {
                                        type: 'integer',
                                        example: 7
                                    },
                                    numberOfSales: {
                                        type: 'integer',
                                        example: 0
                                    },
                                    createdAt: {
                                        type: 'string',
                                        example: '2022-08-14T00:50:58.879Z'
                                    },
                                    updatedAt: {
                                        type: 'string',
                                        example: '2022-08-14T00:50:58.879Z'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        400: {
            description: 'Required data or fields are missing',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Fields Required'
                            }
                        }
                    }
                }
            }
        },
        422: {
            description: 'Missing required data or invalid data format entered',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message1: {
                                type: 'string',
                                example: 'Invalid Image format , Invalid Data'
                            },
                            message2: {
                                type: 'string',
                                example: 'Validation Error Message'
                            }
                        }
                    }
                }
            }
        },
        500: {
            description: 'Uploaded Image size exceeds the maximum size allowed',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'File too large'
                            }
                        }
                    }
                }
            }
        }
    }
}

exports.updateProductDetails = {
    tags: ['Product'],
    description: 'This route allow only admin to update existing product, ' +
        'allowed updates are name, price, description, category, quantity, modelYear',
    operationId: 'updateProductDetails',
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
                        },
                        payload:{
                            type: 'object',
                            properties: {
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
                            }
                        }
                    }
                }
            }
        }
    },
    responses:{
        200: {
            description: 'Required data or fields are missing',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'product details updated'
                            }
                        }
                    }
                }
            }
        },
        400: {
            description: 'Required data or fields are missing',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Fields Required'
                            }
                        }
                    }
                }
            }
        },
        422: {
            description: 'Missing required data or invalid data format entered',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message1: {
                                type: 'string',
                                example: 'Invalid Image format , Invalid Data'
                            },
                            message2: {
                                type: 'string',
                                example: 'Validation Error Message'
                            }
                        }
                    }
                }
            }
        },
    }
}

exports.updateProductImage = {}

exports.deleteProduct = {}

exports.getProductById = {}

exports.getFilteredProducts = {}

exports.productDataIsValid = {}