import express from 'express'
import connectDB from './config/db.js'
import dotenv from 'dotenv'
import eventRoutes from './routes/eventRoutes.js'
import userRoutes from './routes/userRoutes.js'
import invitedRoutes from './routes/invitedRoutes.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

dotenv.config()

connectDB()

const app = express()
const PORT = process.env.PORT || 5000
const corsOptions = {
  origin: 'https://unifor-gerenciador-front-end.vercel.app',
  credentials: true,
};

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

app.use('/api/events', eventRoutes)
app.use('/api/user', userRoutes)
app.use('/api/inviteds', invitedRoutes)

app.use((req, res, next) => {
  res.status(404).json({ message: 'Rota não encontrada' })
})

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))
