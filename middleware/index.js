module.exports = {
    checkLoggedIn: (req, res, next) => req.isAuthenticated() ? next() : res.render('auth/login', { errorMsg: 'Inicia sesión para acceder' }),
    
    checkAdmin: (req, res, next) => req.user && req.user.role === 'ADMIN' ? next() : res.render('auth/login', { errorMsg: 'Desautorizado, no eres Admin' }),

    checkArtist: (req, res, next) => req.user.userInfo && req.user.userInfo.role === 'ARTIST' ? next() : res.render('auth/login', { errorMsg: 'Desautorizado, no eres Artist' })

    // checkVerified: verified => (req, res, next) => verified.includes(req.user.verified)
}