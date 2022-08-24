exports.getAllProducts = {
    security: {
        jwt: []
    },
    tags: ['Product'],
    description: 'This route allows you to get all products',
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
        }
    }
}

exports.createProduct = {
    tags: ['Product'],
    description: 'This route allows only admin to add new product ' +
        'Note: you must call /product/validateNewProduct end point first to validate all product data ' +
        'before uploading the image, then you can call this end point immediately after success response returned ' +
        'from /product/validateNewProduct end point',
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
                                example: 'No Image Uploaded with format png, jpg, jpeg'
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
    description: 'This route allows only admin to update existing product, ' +
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
                        payload: {
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
    responses: {
        200: {
            description: 'Product Updated Successfully',
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
        404: {
            description: 'Product with the given Id doesn\'t exist',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Product not found'
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
                                example: 'Invalid Product Id'
                            },
                            message2: {
                                type: 'string',
                                example: 'not allowed updates'
                            },
                            message3: {
                                type: 'string',
                                example: 'product name should be a string'
                            },
                            message4: {
                                type: 'string',
                                example: 'product description should be a string'
                            },
                            message5: {
                                type: 'string',
                                example: 'invalid price'
                            },
                            message6: {
                                type: 'string',
                                example: 'invalid quantity'
                            },
                            message7: {
                                type: 'string',
                                example: 'invalid modelYear'
                            },
                            message8: {
                                type: 'string',
                                example: 'Category Not Found'
                            }
                        }
                    }
                }
            }
        },
    }
}

exports.updateProductImage = {
    tags: ['Product'],
    description: 'This route allows only admin to update product image only',
    operationId: 'updateProductImage',
    requestBody: {
        required: true,
        content: {
            'multipart/form-data': {
                schema: {
                    type: 'object',
                    properties: {
                        productId: {
                            type: 'string',
                            example: '62e8e1686d0f5a029046fa01'
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
        200: {
            description: 'Product Image Updated Successfully',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'product image updated'
                            }
                        }
                    }
                }
            }
        },
        400: {
            description: 'No Image sent, or incorrect file format',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'No Image Uploaded with format png, jpg, jpeg'
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
                                example: 'Invalid Product Id'
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

exports.deleteProduct = {
    tags: ['Product'],
    description: 'This route allows only admin to delete product from data base',
    operationId: 'deleteProduct',
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
            description: 'Product deleted successfully from DB',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'product deleted'
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
        422: {
            description: 'Provided id is not a valid MongoID',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Invalid Product Id'
                            }
                        }
                    }
                }
            }
        }
    }
}

exports.getProductById = {
    security: {
        jwt: []
    },
    tags: ['Product'],
    description: 'This route allows you to specific product using it\'s ID',
    operationId: 'getProductById',
    parameters: [{
        in: 'path',
        name: 'id',
        type: 'string',
        example: '62e8e1686d0f5a029046fa01',
        description: 'Product ID'
    }],
    responses: {
        200: {
            description: 'Get Product',
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
        422: {
            description: 'Provided id is not a valid MongoID',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Not Valid Product ID'
                            }
                        }
                    }
                }
            }
        },
    }
}

exports.getFilteredProducts = {
    security: {
        jwt: []
    },
    tags: ['Product'],
    description: 'This route returns products (sorted) based on specific filters like search key, min and max price, rating',
    operationId: 'getFilteredProducts',
    parameters: [
        {
            in: 'query',
            name: 'searchKey',
            type: 'string',
            example: 'vase',
            description: 'Product Name'
        },
        {
            in: 'query',
            name: 'categoryId',
            type: 'string',
            example: '62e8e168320f5a0290ghfa01',
            description: 'Category ID'
        },
        {
            in: 'query',
            name: 'page',
            type: 'integer',
            example: 1,
            description: 'Page Number'
        },
        {
            in: 'query',
            name: 'modelYearMin',
            type: 'integer',
            example: 1950,
            description: 'Minimum Model Year'
        },
        {
            in: 'query',
            name: 'modelYearMax',
            type: 'integer',
            example: 1999,
            description: 'Maximum Model Year'
        },
        {
            in: 'query',
            name: 'priceMin',
            type: 'integer',
            example: 500,
            description: 'Minimum Price'
        },
        {
            in: 'query',
            name: 'priceMax',
            type: 'integer',
            example: 900,
            description: 'Maximum Price'
        },
        {
            in: 'query',
            name: 'rating',
            type: 'number',
            example: 4,
            description: 'Product\'s rating'
        },
        {
            in: 'query',
            name: 'priceSort',
            type: 'string',
            example: 'lth or htl',
            description: 'Sort products by price lth(low to high) or htl(high to low)'
        },
        {
            in: 'query',
            name: 'modelYearSort',
            type: 'string',
            example: 'lth or htl',
            description: 'Sort products by model year lth(low to high) or htl(high to low)'
        },
        {
            in: 'query',
            name: 'ratingSort',
            type: 'string',
            example: 'lth or htl',
            description: 'Sort products by rating lth(low to high) or htl(high to low)'
        }
    ],
    responses: {
        200: {
            description: 'Get filtered products',
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
                                example: 'Invalid CategoryId'
                            },
                            message2: {
                                type: 'string',
                                example: 'Page must be a number'
                            },
                            message3: {
                                type: 'string',
                                example: 'Minimum Model Year must be a number greater than or equal 0'
                            },
                            message4: {
                                type: 'string',
                                example: 'Max Model Year must be a number less than or equal current year'
                            },
                            message5: {
                                type: 'string',
                                example: 'Minimum Price must be a number'
                            },
                            message6: {
                                type: 'string',
                                example: 'Max Price must be a number'
                            },
                            message7: {
                                type: 'string',
                                example: 'Rating must be a number between 0 and 5'
                            },
                            message8: {
                                type: 'string',
                                example: 'Invalid Sort Query, Query must be htl or lth'
                            }
                        }
                    }
                }
            }
        }
    }
}

exports.productDataIsValid = {
    tags: ['Product'],
    description: 'This route validates data sent by admin to create a new product, ' +
        'Required Fields to be sent are name, price, description, category, quantity, modelYear ' +
        'Note: this route should be called before AddProduct end point',
    operationId: 'productDataIsValid',
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
    responses: {
        200: {
            description: '',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Valid Product Data'
                            },
                            productData:{
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
        422: {
            description: 'Invalid Data entered',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message1: {
                                type: 'string',
                                example: 'No Data provided for Product Creation'
                            },
                            message2: {
                                type: 'string',
                                example: 'product name should be a string'
                            },
                            message3: {
                                type: 'string',
                                example: 'product description should be a string'
                            },
                            message4: {
                                type: 'string',
                                example: 'invalid price'
                            },
                            message5: {
                                type: 'string',
                                example: 'invalid quantity'
                            },
                            message6: {
                                type: 'string',
                                example: 'invalid modelYear'
                            },
                            message7: {
                                type: 'string',
                                example: 'Category Not Found'
                            }
                        }
                    }
                }
            }
        },
    }
}