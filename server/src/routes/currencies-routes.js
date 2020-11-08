const express = require('express')

const router = new express.Router()

const apiBaseUrl = 'https://pro-api.coinmarketcap.com/v1'

// Fonction réutilisable pour faire des appels à l'API CMC
function fetchCMC (path) {
    const apiKey = process.env.CMC_API_KEY

    return fetch(`${apiBaseUrl}${path}`, {
        method: "GET",
        headers: {
            accept: 'application/json',
            'x-cmc_pro_api_key': apiKey
        }
    })
    .then(fetchResponse => {
        return fetchResponse.json();
    })
    .then(responseData => {
        const errorCode = responseData.status.error_code
        if (errorCode != 0) {
            throw new Error(responseData.status.error_message)
        }
        return responseData.data
    })
}

router.get('/', function getRoot(req, res) {

    const path = '/cryptocurrency/listings/latest'

    fetchCMC(path)
    .then(currencies => {
        res.json({
            success: true,
            currencies: currencies.map(currency => ({
                id: currency.id,
                name: currency.name,
                slug: currency.slug,
                quote: currency.quote,
            })),
        })
    })
    .catch(error => {
        res.json({
            success: false,
            message: error.message
        })
    })

    /*
    fetchCMC('/cryptocurrency/listings/latest')
    .catch(error => {
        res.json({
            success: false,
            message: error.message
        })
        throw error
    })
    .then(function (responseData) {
        res.json({
            success: true,
            data: responseData.data
        })
    })
    */
})

router.get('/:currencyslug', function getRoot(req, res) {
    const crypto = req.params.currencyslug

    const path = '/cryptocurrency/info?slug=' + crypto

    fetchCMC(path)
    .then(crypto => {
        res.json({
            success: true,
            crypto
        })
    })
    .catch(error => {
        res.json({
            success: false,
            message: error.message
        })
    })
})


module.exports = router