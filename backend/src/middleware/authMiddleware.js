import jwt from 'jsonwebtoken'

export const authMiddleware = (req, res, next) => {
  const token = req.cookies.token

  if (!token) {
    return res.status(401).json({ message: 'Acesso negado. Não autenticado.' })
  }

  try {
    const decoded = jwt.verify(token, 'secret')
    req.user = decoded
    next()
  } catch (error) {
    res.status(401).json({ message: 'Token inválido.' })
  }
}
