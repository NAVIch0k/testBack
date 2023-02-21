import jwt from 'jsonwebtoken'

const AuthMiddleWare = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next()
  }
  try {
    const token = req.headers?.authorization?.split(' ')[1]
    if (!token) {
      return res.status(401).json({ message: 'user not authorized' })
    }
    const decodeData = jwt.verify(token, process.env.SECRET_KEY)
    req.user = decodeData
    next()
  } catch (e) {
    return res.status(401).json({ message: 'user not authorized' })
  }
}

export default AuthMiddleWare
