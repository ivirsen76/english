const path = require('path')
const favicon = require('serve-favicon')
const cors = require('cors')
const feathers = require('feathers')
const configuration = require('feathers-configuration')
const hooks = require('feathers-hooks')
const rest = require('feathers-rest')
const bodyParser = require('body-parser')
const express = require('express') // eslint-disable-line import/no-extraneous-dependencies
const fileUpload = require('express-fileupload')

const middleware = require('./middleware')
const services = require('./services')

const app = feathers()

app.configure(configuration(path.join(__dirname, '.')))

// Enchance app to add prefix ability
app.declareService = (name, service) => {
    const url = app.get('prefix') + '/' + name
    app.use(url, service)

    return app.getService(name)
}
app.getService = name => app.service(app.get('prefix') + '/' + name)

// Enable CORS policy if necessary
app.options('*', cors())
if (process.env.IE_CORS_ORIGIN) {
    app.use(cors({ origin: process.env.IE_CORS_ORIGIN }))
}

app
    .use((req, res, next) => {
        if (/\.(css|js|jpg|png|gif|svg|ttf|eot|woff|woff2|mp3)$/.test(req.url)) {
            res.setHeader('Cache-Control', `max-age=${7 * 24 * 3600}`)
        } else {
            res.setHeader('Cache-Control', 'private, no-store')
        }
        next()
    })
    .use('/media', express.static(process.env.IE_MEDIA_PATH || 'media'))
    .use('/', express.static('build'))
    .use((req, res, next) => {
        if (/\.(css|js|jpg|png|gif|svg|ttf|eot|woff|woff2|mp3)$/.test(req.url)) {
            res.status(404)
            res.setHeader('Cache-Control', 'private, no-store')
        }
        next()
    })
    .use(favicon(path.join(app.get('public'), 'favicon.ico')))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(fileUpload())
    .configure(hooks())
    .configure(rest())
    .use((req, res, next) => {
        req.feathers.files = req.files
        next()
    })
    .configure(services)
    .get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '..', '..', 'build', 'index.html'))
    })
    .configure(middleware)

module.exports = app
