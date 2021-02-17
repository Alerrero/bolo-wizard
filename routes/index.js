module.exports = app => {

    // Base URLS
    app.use('/', require('./base.routes.js'))
    app.use('/', require('./auth.routes.js'))
    app.use('/usuario', require('./user.routes.js'))
    app.use('/eventos', require('./events.routes.js'))
    app.use('/api', require('./api.routes.js'))



}