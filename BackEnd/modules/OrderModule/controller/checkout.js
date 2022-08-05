const axios = require('axios').default;
const errorHandler = require('./../../../Utilities/errorHandler');

module.exports = async (request, response, next) => {
    let auth_token = "";
    axios.post('https://accept.paymob.com/api/auth/tokens', {
        "api_key": process.env.PAYMOB_API_KEY
    })
        .then(({data}) => {
            auth_token = data.token;
            return axios.post('https://accept.paymob.com/api/ecommerce/orders', {
                "auth_token": data.token,
                "delivery_needed": "false",
                "amount_cents": request.body.payload.totalPrice,
                "currency": "EGP",
                "items": request.body.payload.products
            })
        })
        .then(({data}) => {
            const {street, city, country, phone, postalCode} = request.body.payload.shippingAddress;
            return axios.post('https://accept.paymob.com/api/acceptance/payment_keys', {
                auth_token,
                "expiration": 3600,
                "amount_cents": request.body.payload.totalPrice,
                "currency": "EGP",
                "order_id": data.id,
                "integration_id": process.env.PAYMOB_INTEGRATION_ID,
                "billing_data": {
                    "email": request.user.email,
                    "first_name": request.user.firstName,
                    "last_name": request.user.lastName,
                    city,
                    street,
                    country,
                    "phone_number": phone,
                    "postal_code": postalCode,
                    "floor": "NA",
                    "building": "NA",
                    "apartment": "NA",
                    "shipping_method": "NA",
                    "state": "NA"
                }
                // "lock_order_when_paid": "false"
            })
        })
        .then((res) => {
            response.status(200).json({token:res.data.token});
        })
        .catch(error => {
            errorHandler(error, 502, next)
        });
}


// https://accept.paymob.com/api/acceptance/iframes/443252?payment_token=ZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKSVV6VXhNaUo5LmV5SmpkWEp5Wlc1amVTSTZJa1ZIVUNJc0luQnRhMTlwY0NJNklqRTVOeTQwT0M0eU1UQXVNamdpTENKaGJXOTFiblJmWTJWdWRITWlPakV3TURBc0ltVjRjQ0k2TVRZMU9UY3pOVFV6TUN3aWFXNTBaV2R5WVhScGIyNWZhV1FpT2pJMU5EWXlNekVzSW05eVpHVnlYMmxrSWpvMk1EazBOVGN3Tnl3aWRYTmxjbDlwWkNJNk5EZzJPVEkwTENKc2IyTnJYMjl5WkdWeVgzZG9aVzVmY0dGcFpDSTZabUZzYzJVc0ltSnBiR3hwYm1kZlpHRjBZU0k2ZXlKbWFYSnpkRjl1WVcxbElqb2lRV2h0WldRaUxDSnNZWE4wWDI1aGJXVWlPaUpCYm5kaGNpSXNJbk4wY21WbGRDSTZJbTF2YUdGdFpXUWdZbVZ6YUdseUlpd2lZblZwYkdScGJtY2lPaUpPUVNJc0ltWnNiMjl5SWpvaVRrRWlMQ0poY0dGeWRHMWxiblFpT2lKT1FTSXNJbU5wZEhraU9pSkJiR1Y0WVc1a2NtbGhJaXdpYzNSaGRHVWlPaUpPUVNJc0ltTnZkVzUwY25raU9pSkZaM2x3ZENJc0ltVnRZV2xzSWpvaVlXaHRaV1JoWW1SaGJISmhhRzFoYmpZeFFHZHRZV2xzTG1OdmJTSXNJbkJvYjI1bFgyNTFiV0psY2lJNklqQXhNamMxTmpReU1pSXNJbkJ2YzNSaGJGOWpiMlJsSWpvaU1qRXhOalFpTENKbGVIUnlZVjlrWlhOamNtbHdkR2x2YmlJNklrNUJJbjE5LkF1T1dOYWNPaXVjUnM0b2dYQmRvMW1CU0Q4bkE3STdDV2tvVmwwRU01RTFGRG96NlVSZGFaZjJZMVRQRjZlbEJjN3RudUtoVmw2bDBCT3ItMXhzRTB3