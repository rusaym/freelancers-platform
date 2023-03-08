import express from 'express'
import multer from 'multer'
import fs from 'fs-extra'
import path from 'path'

const router = express.Router()
const __dirname = path.resolve()

// Order files
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, `uploads/${req.params.guid}/`)
  },
  filename(req, file, cb) {
    cb(null, file.originalname)
  },
})

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    const existFile = `uploads/${req.params.guid}/${file.originalname}`

    if (fs.existsSync(existFile)) {
      return cb(null, false)
    }

    // if (path.extname(file.originalname) !== '.pdf') {
    //   return cb(null, false)
    // }

    cb(null, true)
  },
})

const initOrderFolder = (req, res, next) => {
  fs.ensureDirSync(path.join(__dirname, 'uploads', req.params.guid))
  next()
}
router.post(
  '/:guid',
  initOrderFolder,
  upload.array('fileCollection'),
  (req, res) => {
    //res.send(req.files.map((e) => e.path))
    res.status(200).send()
  }
)

// Avavtars

const storageAvatar = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, `uploads/avatars/${req.params.guid}/`)
  },
  filename(req, file, cb) {
    cb(null, file.originalname)
  },
})

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png|gif/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Только файлы картинок!')
  }
}

const uploadAvatar = multer({
  storage: storageAvatar,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})

const initOrderFolderAvatar = (req, res, next) => {
  fs.ensureDirSync(path.join(__dirname, 'uploads', 'avatars', req.params.guid))
  next()
}
router.post(
  '/avatars/:guid',
  initOrderFolderAvatar,
  uploadAvatar.single('image'),
  (req, res) => {
    res.send(`/${req.file.path}`)
  }
)

export default router
