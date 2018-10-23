const path = require('path')
const favicon = require('serve-favicon')
const cors = require('cors')
const feathers = require('feathers')
const configuration = require('feathers-configuration')
const hooks = require('feathers-hooks')
const rest = require('feathers-rest')
const bodyParser = require('body-parser')
const express = require('express') // eslint-disable-line import/no-extraneous-dependencies

const middleware = require('./middleware')
const services = require('./services')

const app = feathers()

app.configure(configuration(path.join(__dirname, '.')))

app
    .options('*', cors())
    .use(cors())
    .use(favicon(path.join(app.get('public'), 'favicon.ico')))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use((req, res, next) => {
        if (/\.mp3$/.test(req.url)) {
            res.setHeader('Cache-Control', `max-age=${365 * 24 * 3600}`)
        } else if (/\.(css|js|jpg|png|gif|svg|ttf|eot|woff|woff2)$/.test(req.url)) {
            res.setHeader('Cache-Control', `max-age=${7 * 24 * 3600}`)
        } else {
            res.setHeader('Cache-Control', 'private, no-store')
        }
        next()
    })
    .configure(hooks())
    .configure(rest())
    .configure(services)
    .use('/media', express.static('media'))
    .use('/', express.static('build'))
    .get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '..', '..', 'build', 'index.html'))
    })
    .configure(middleware)

module.exports = app
