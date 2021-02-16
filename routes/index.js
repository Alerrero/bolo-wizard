module.exports = app => {

    // Base URLS
    app.use('/', require('./base.routes.js'))
    app.use('/', require('./auth.routes.js'))
    app.use('/user', require('./user.routes.js'))
    app.use('/events', require('./events.routes.js'))
    app.use('/api', require('./api.routes.js'))


    app.use('/places', require('./places.routes.js'))

}