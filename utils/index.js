module.exports = {
    isAdmin: user => user.role && user.role.includes('ADMIN'),
    isArtist: user => user.userInfo.role.includes('ARTIST'),
    normalizeText: someStrg => someStrg.normalize('NFD').replace(/[\u0300-\u036f]/g, ""),
    removeDups: someArr => someArr.filter((v, i) => someArr.indexOf(v) === i)
}