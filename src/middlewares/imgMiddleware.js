
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public/uploads')
        },
        filename: function (req, file, cb) {
             cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname)) 
        }
})

const fileFilter = (req, file, cb,) => {
    const extensoes = /jpeg|jpg/i
    if (extensoes.test(path.extname(file.originalname))){
            cb(null, true)
    }else{
            return cb('Arquivo não suportado. Apenas jpg e jpeg são suportados.')
    }
}


module.exports = { storage, fileFilter};

