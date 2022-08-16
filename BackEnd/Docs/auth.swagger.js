exports.login = {
    security: {
        jwt: []
    },
    tags: ['Auth'],
    description: 'This route allow you to login into the api',
    operationId: 'login',
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
                                email: {
                                    type: 'string',
                                    required: true,
                                    example: "john@gmail.com"
                                },
                                password: {
                                    type: 'string',
                                    required: true,
                                    example: "JOhn112@#"
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
            description: 'User logged in successfully',
            content: {
                'application/json': {
                    schema: {
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
                                example: 'true'
                            },
                            address: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        _id: {
                                            type: 'integer',
                                            example: 1
                                        },
                                        street: {
                                            type: 'string',
                                            example: '13 max street'
                                        },
                                        city: {
                                            type: 'string',
                                            example: 'Cairo'
                                        },
                                        country: {
                                            type: 'string',
                                            example: 'Egypt'
                                        },
                                        mobile: {
                                            type: 'string',
                                            example: '01234567589'
                                        }
                                    }
                                }
                            },
                            wishlist: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        product:{
                                            type: 'object',
                                            properties: {
                                                // _id:{
                                                //     type:'string',
                                                //     example:'62e8e168320f5a0290ghfa01'
                                                // },
                                                // name: {
                                                //     type: 'string',
                                                //     example: 'Camera Antique'
                                                // },
                                                // price: {
                                                //     type: 'integer',
                                                //     example: 121
                                                // },
                                                // description: {
                                                //     type: 'string',
                                                //     example: 'The quality material used in its construction makes it durable '
                                                // },
                                                // modelYear: {
                                                //     type: 'integer',
                                                //     example: 1940
                                                // },
                                                // image: {
                                                //     type: 'string',
                                                //     example: '/edd5e245-0db6-4b96-ad24-ds2f96e28ad8.png'
                                                // },
                                            }
                                        }

                                    }
                                }
                            },
                            token: {
                                type: 'string',
                                example: 'eyJhbGciOiJIUzCI6I9.eyJpZCIjYyZGMwODU3ODY5NDg5ODM0YjAwMGJlMyIsImlhdCI6MTY2MDY2Mjk4MiwiZXhwIjoxNjYwNjgwOTgyfQ.4ex1DB519Djki-oPxkxcgEfxcCLOwp9LGfCjwHhq19w'
                            },
                        }
                    }
                }
            }
        },
        401: {
            description: 'Error: 401',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Invalid email or password'
                            }
                        }
                    }
                }
            }
        },
        422: {
            description: 'Validation Error: 422',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Invalid email or password'
                            }
                        }
                    }
                }
            }
        }
    }
};