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
                                                rating: {
                                                    type: 'number',
                                                    example: 3.5
                                                },
                                                image: {
                                                    type: 'string',
                                                    example: '/edd5e245-0db6-4b96-ad24-ds2f96e28ad8.png'
                                                },
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

exports.signUp = {
    security: {
        jwt: []
    },
    tags: ['Auth'],
    description: 'This route allow you to Sign Up into the api',
    operationId: 'signUp',
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
                                    required: true,
                                    example: "John"
                                },
                                lastName: {
                                    type: 'string',
                                    required: true,
                                    example: "Mark"
                                },
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
        201: {
            description: 'User signed up successfully',
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
                                example: [],
                            },
                            wishlist: {
                                type: 'array',
                                example: [],
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
        422: {
            description: 'Validation Error: 422',
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
                                example: 'Invalid Password Format'
                            },
                            message7: {
                                type: 'string',
                                example: 'User Already exists'
                            }
                        }
                    }
                }
            }
        }
    }
}

exports.logout = {
    tags: ['Auth'],
    description: 'This route allow you to logOut from the api',
    operationId: 'logOut',
    responses: {
        200: {
            description: 'User logged out successfully',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'logged out successfully'
                            }
                        }
                    }
                }
            }
        },
        404: {
            description: 'Not Found Error: 404',
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

exports.forgetPassword = {
    security: {
        jwt: []
    },
    tags: ['Auth'],
    description: 'This route allow you to send email with the reset password link to reset the password you forgot',
    operationId: 'forgetPassword',
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
                            }
                        }
                    }
                }
            }
        }
    },
    responses: {
        200: {
            description: 'A link is going to be sent to you email to reset you password.',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Email sent successfully'
                            }
                        }
                    }
                }
            }
        },
        404: {
            description: 'User Not Found Error',
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
        422: {
            description: 'User entered invalid email format',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Invalid Email Format'
                            }
                        }
                    }
                }
            }
        }
    }
}

exports.resetPassword = {
    security: {
        jwt: []
    },
    tags: ['Auth'],
    description: 'This route allow you to reset you password using the url you received in you email',
    operationId: 'resetPassword',
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
                                    example: "NewPassword_JOhn112@#"
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
            description: 'password has been updated successfully',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Password changed successfully.'
                            }
                        }
                    }
                }
            }
        },
        400: {
            description: 'Reset token has been expired or Incorrect',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Invalid Link'
                            },
                        }
                    }
                }
            }
        },
        401: {
            description: "Entered email doesn't match actual user email",
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Incorrect email'
                            },
                        }
                    }
                }
            }
        },
        404: {
            description: 'User Not Found Error',
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
        422: {
            description: 'User entered invalid email format or password',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message1: {
                                type: 'string',
                                example: 'Invalid Email Format'
                            },
                            message2: {
                                type: 'string',
                                example: 'Invalid Password Format'
                            }
                        }
                    }
                }
            }
        }
    }
}

exports.changePassword = {
    tags: ['Auth'],
    description: 'This route allow user to change his password',
    operationId: 'changePassword',
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
                                oldPassword: {
                                    type: 'string',
                                    required: true,
                                    example: "oldPassword_JOhn112@#"
                                },
                                newPassword: {
                                    type: 'string',
                                    required: true,
                                    example: "NewPassword_hash%#272"
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
            description: 'password updated successfully',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Password updated successfully.'
                            }
                        }
                    }
                }
            }
        },
        400: {
            description: 'No passwords provided or invalid password',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message1: {
                                type: 'string',
                                example: 'Old and new Passwords are Required'
                            },
                            message2: {
                                type: 'string',
                                example: 'Incorrect Old Password'
                            },
                        }
                    }
                }
            }
        },
        422: {
            description: 'User entered invalid password',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Invalid Password Format'
                            }
                        }
                    }
                }
            }
        }
    }
}
