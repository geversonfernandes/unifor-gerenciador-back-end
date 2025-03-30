import User from '../models/User.js'

export const createUser = async (req, res) => {
  const { name, email, password } = req.body

  try {
    const userExists = await User.findOne({ email })
    if (userExists) {
      return res.status(400).json({ message: 'Usuário já existe!' })
    }

    const user = new User({ name, email, password })
    await user.save()
    res.status(201).json({ message: 'Usuário criado com sucesso!' })
  } catch (error) {
    console.error('Erro ao criar usuário:', error)
    res.status(500).json({ error: error.message })
  }
}
