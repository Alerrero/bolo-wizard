module.exports = {
    isAdmin: user => user.role && user.role.includes('ADMIN'),
    isArtist: user => user.userInfo.role.includes('ARTIST'),
}