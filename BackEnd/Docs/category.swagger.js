exports.getAllCategories = {
    security: {
        jwt: []
    },
    tags: ['Category'],
    description: 'This route returns all Categories',
    operationId: 'getAllCategories',
    responses:{
        200:{
            description: 'Get all categories',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            categories: {
                                type: 'array',
                                items:{
                                    type:'object',
                                    properties: {
                                        _id:{
                                            type:'string',
                                            example:'62e8e168320f5a0290ghfa01'
                                        },
                                        categoryName:{
                                            type:'string',
                                            example:'statue'
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

exports.createCategory = {
    tags: ['Category'],
    description: 'This route allows only admin to create new category',
    operationId: 'createCategory',
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
                                categoryName: {
                                    type: 'string',
                                    example: 'statue'
                                },
                                categoryDescription: {
                                    type: 'string',
                                    required: false,
                                    example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    responses:{
        201:{
            description: 'Category created successfully',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'category added'
                            }
                        }
                    }
                }
            }
        },
        500:{
            description: 'error',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Can\'t Create Category'
                            }
                        }
                    }
                }
            }
        }
    }
}

exports.updateCategory = {
    tags: ['Category'],
    description: 'This route allows only admin to update category name or description or both',
    operationId: 'updateCategory',
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
                                categoryId:{
                                    type:'string',
                                    example:'62e8e168320f5a0290ghfa01'
                                },
                                categoryName: {
                                    type: 'string',
                                    example: 'statue'
                                },
                                categoryDescription: {
                                    type: 'string',
                                    required: false,
                                    example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    responses:{
        200:{
            description: 'Category Updated Successfully',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Category Updated'
                            },
                            category:{
                                type: 'object',
                                properties: {
                                    _id:{
                                        type:'string',
                                        example:'62e8e168320f5a0290ghfa01'
                                    },
                                    categoryName: {
                                        type: 'string',
                                        example: 'statue'
                                    },
                                    categoryDescription: {
                                        type: 'string',
                                        required: false,
                                        example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        400: {
            description: 'Provided id is not a valid MongoID or no data sent to update category',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message1: {
                                type: 'string',
                                example: 'Invalid Category ID'
                            },
                            message2: {
                                type: 'string',
                                example: 'Fields Required'
                            }
                        }
                    }
                }
            }
        },
        404: {
            description: 'Category with the given Id doesn\'t exist',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Category Not Found'
                            }
                        }
                    }
                }
            }
        }
    }
}

exports.deleteCategory = {
    tags: ['Category'],
    description: 'This route allows only admin to delete category',
    operationId: 'deleteCategory',
    requestBody: {
        required: true,
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        categoryId: {
                            type: 'string',
                            example: '62e8e1686d0f5a029046fa01'
                        }
                    }
                }
            }
        }
    },
    responses:{
        200: {
            description: 'category deleted successfully',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'category deleted'
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
                                example: 'Invalid Category ID'
                            }
                        }
                    }
                }
            }
        },
        404: {
            description: 'Category with the given Id doesn\'t exist',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
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