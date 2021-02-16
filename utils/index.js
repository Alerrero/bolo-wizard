module.exports = {
    isAdmin: user => user.userInfo.role.includes('ADMIN'),
    isArtist: user => user.userInfo.role.includes('ARTIST'),
}