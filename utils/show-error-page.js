function showErrorPage(res, error) {
    res.render('error', {
    description: error, })
}

module.exports = {
    showErrorPage
}