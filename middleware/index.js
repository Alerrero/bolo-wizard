module.exports = {
    checkLoggedIn: (req, res, next) => req.isAuthenticated() ? next() : res.render('auth/login', { errorMsg: 'Inicia sesión para acceder' }),
    checkRole: (...rolesArray) => (req, res, next) => rolesArray.includes(req.user.role) ? next() : res.render('auth/login', { errorMsg: 'Desautorizado, no tienes privilegios' })
}