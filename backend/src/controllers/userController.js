import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
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

export const updateUser = async (req, res) => {
  const { id } = req.params
  const { name, email, password } = req.body

  try {
    const user = await User.findById(id)
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado!' })
    }

    user.name = name || user.name
    user.email = email || user.email
    user.password = password ? await bcrypt.hash(password, 10) : user.password

    await user.save()
    res.status(200).json({ message: 'Usuário atualizado com sucesso!' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const deleteUser = async (req, res) => {
  const { id } = req.params

  try {
    const user = await User.findByIdAndDelete(id)
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado!' })
    }
    res.status(200).json({ message: 'Usuário deletado com sucesso!' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'Usuário não encontrado!' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Senha incorreta!' })
    }

    const token = jwt.sign({ id: user._id }, 'secret', {
      expiresIn: '1h',
    })

    console.log(token)

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
    });

    res.status(200).json({
      message: 'Login bem-sucedido!',
      token,
      user: { id: user._id, name: user.name, email: user.email },
    })
  } catch (error) {
    console.error('Erro no login:', error)
    res.status(500).json({ error: error.message })
  }
}

export const logoutUser = (req, res) => {
  res.clearCookie('token', { httpOnly: true, secure: true, sameSite: 'strict' })

  res.status(200).json({ message: 'Logout realizado com sucesso.' })
}
