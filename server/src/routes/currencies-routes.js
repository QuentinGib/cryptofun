const express = require('express')

const router = new express.Router()

const apiBaseUrl = 'https://pro-api.coinmarketcap.com/v1'

const usd = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  });

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
                evolutionPrice: Math.round(currency.quote.USD.percent_change_24h * 100) / 100,
                price: usd.format(currency.quote.USD.price)
            })),
        })
    })
    .catch(error => {
        res.json({
            success: false,
            message: error.message
        })
    })
})

router.get('/cryptoTrade', function getRoot(req, res) {

    const path = '/cryptocurrency/listings/latest'

    fetchCMC(path)
    .then(currencies => {
        res.json({
            success: true,
            currencies: currencies.map(currency => ({
                id: currency.id,
                name: currency.name,
                symbol: currency.symbol,
                price: currency.quote.USD.price
            })),
        })
    })
    .catch(error => {
        res.json({
            success: false,
            message: error.message
        })
    })
})

router.get('/holdings', function getRoot(req, res) {

    const path = '/cryptocurrency/listings/latest'

    fetchCMC(path)
    .then(currencies => {
        res.json({
            success: true,
            currencies: currencies.slice(0, 11).map(currency => ({
                id: currency.id,
                symbol: currency.symbol,
                name: currency.name,
                somme: 0
            })),
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