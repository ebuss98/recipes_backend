const{ Router } = require('express')
const axios = require('axios')
const {db} = require('../app')
const ObjectId = db.ObjectID;
const router = Router()
const CLIENT_ID = '7698287'
const CLIENT_SECRET = 'phoIMI10GF6UqWVujMTp'
const HOME_URI = 'https://b1236c9e2a90.ngrok.io/auth'
const REDIRECT_URI = HOME_URI + '/vk/'

const accessToken = '88b100013425cd18d5383f44995d72283d90f153206abe1a0bab225b6c3614c0aec4b128b5ecd0d2494b4'
const version = '5.126'

const getUserFields = ['photo_200']
async function getUserInfo(id) {
//https://api.vk.com/method/users.get?user_ids=11260918..

    let response = await axios.get(constructRequestUrl('users.get', { user_ids: id, fields: getUserFields.join(',') }))
    const userObject = response.data.response[0]
    if (!userObject) throw new Error(`User not found. id - ${id}`)
    return {
        id: userObject.id,
        name: userObject.first_name + ' ' + userObject.last_name,
        avatar: userObject[getUserFields[0]]
    }
}

function constructRequestUrl(method, params) {
    let paramsStr = Object.entries(params)
        .map((a) => a.join('='))
        .join('&')
    return `https://api.vk.com/method/${method}?${paramsStr}&access_token=${accessToken}&v=${version}`
}
router.get('/url/:id', (req, res) => {
    let redirect = REDIRECT_URI + req.params.id
    res.send(`https://oauth.vk.com/authorize?client_id=${CLIENT_ID}&display=page&redirect_uri=${redirect}&scope=offline&response_type=code&v=5.126`)
})
router.get('/:id', async (req, res) => {
        let token = await db.tokens.findOne({id: req.params.id})
        if (!token) return res.json()
        let user = await db.users.findOne({id: token.userId})
        if (!user) {
            user = await getUserInfo(token.userId)
            await db.users.insertOne(user)
        }
        res.json(user)
})
router.get('/vk/:id', async (req, res) => {
    try {
        let { id } = req.params
        let { code } = req.query
        let redirect = REDIRECT_URI + id
        let vkResponse = await axios.get(`https://oauth.vk.com/access_token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&redirect_uri=${redirect}&code=${code}`)
        if (vkResponse.data.error) return res.status(500).json(vkResponse.data)
        await db.tokens.insertOne({token: vkResponse.data.access_token, userId: vkResponse.data.user_id, id})
        res.redirect('http://localhost:3000')
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }

})

module.exports = router
