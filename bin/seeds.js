const mongoose = require('mongoose');
const { User } = require('../models/user.model')

mongoose.connect('mongodb+srv://Alerrero:2181993AhL*@cluster0.lozyl.mongodb.net/bolo-wizard')

const bcrypt = require("bcrypt")
const bcryptSalt = 10

const password = "catboss"
const salt = bcrypt.genSaltSync(bcryptSalt)
const hashPass = bcrypt.hashSync(password, salt)


const admin = {
    email: "catboss@catboss.com",
    password: password,
    role: "ADMIN"
}

User
    .create(admin)
    .then(response => {
        console.log("We have catboss")
        mongoose.connection.close()

    })
    .catch(err => console.log(err))


