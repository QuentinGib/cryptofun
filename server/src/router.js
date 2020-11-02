const express = require('express')

const router = new express.Router()
const fetch = require('isomorphic-fetch')
const apiKey = 'cc248258-201f-4bca-ad87-32d58a858c46'
router.get('/', (req, res) => {
    fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
        headers: {
            accept: 'application/json',
            'x-cmc_pro_api_key':apiKey
        }
    })
    .then(function(res){
        return res.json();
    })
    .then(function(responseData){
        const errorCode = responseData.status.errorCode
        if(errorCode!=0){
            res.json({
                success: false,
                message: 'Error'
            })
            return
        }
        const currencies = responseData.data
        console.log(currencies)
        res.json(currencies)
    })
  })

module.exports = router