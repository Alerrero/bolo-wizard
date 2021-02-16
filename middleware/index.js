module.exports = {
    checkLoggedIn: (req, res, next) => req.isAuthenticated() ? next() : res.render('auth/login', { errorMsg: 'Inicia sesión para acceder' }),
    
    checkRole: roles => (req, res, next) => roles.includes(req.user.role) ? next() : res.render('auth/login', { errorMsg: 'Desautorizado, no tienes privilegios' })

    // checkVerified: verified => (req, res, next) => verified.includes(req.user.verified)
}