module.exports = {
    isAdmin: user => user.role.includes('ADMIN'),
    isArtist: user => user.role.includes('ARTIST'),
}