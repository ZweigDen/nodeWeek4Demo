function handleError(res, data) {
    res.status(400).send({
        status:false,
        message: "欄位填寫錯誤或無此ＩＤ"
    })
}

module.exports = handleError;