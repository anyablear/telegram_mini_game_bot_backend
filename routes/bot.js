const express = require('express')
const Bot = require('../model/Bot')

const router = express.Router()

router.get('/currentuser/:username', (req, res) => {
    Bot.findOne({username: req.params.username})
        .then(bot => {
            res.json(bot)
        })
        .catch(err => console.log(err))
})

router.get('/show', (req, res) => {
    Bot.find()
        .then(bot => {
            res.json(bot)
        })
        .catch(err => console.log(err))
})

router.post('/add', (req, res) => {
    const {username} = req.body

    Bot.findOne({username})
        .then(bot => {
            if(bot) {
                bot.username = req.body.username
                bot.star = bot.star + req.body.star
                if(req.body.day === 7) {
                    bot.week = req.body.week + 1
                    bot.day = 1
                    bot.spin = bot.spin + 1
                } else {
                    bot.day = req.body.day + 1
                }

                bot.save()
                    .then(res => console.log(res))
                    .catch(err => console.log(err))
            } else {
                new Bot({username}).save()
                    .then(bot => console.log(bot))
                    .catch(err => console.log(err))
            }
        })
})

module.exports = router;