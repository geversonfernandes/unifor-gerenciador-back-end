import Event from '../models/Event.js'

export const createEvent = async (req, res) => {
  try {
    const { name, date } = req.body
    const newEvent = new Event({
      name,
      date,
      userId: req.user.id,
    })
    await newEvent.save()
    res.status(201).json({ message: 'Evento cadastrado com sucesso!' })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Erro ao cadastrar evento!', error: error.message })
  }
}

export const getAllEvent = async (req, res) => {
  try {
    const eventList = await Event.find({ userId: req.user.id })
    res.status(200).json(eventList)
  } catch (error) {
    console.error('Erro ao obter a lista de eventos:', error)
    res.status(500).json({ error: error.message })
  }
}

export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params
    const updateEvent = await Event.findByIdAndUpdate(id, req.body, {
      new: true,
    })
    res.status(200).json(updateEvent)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params
    await Event.findByIdAndDelete(id)
    res.status(200).json({ message: 'Evento removido com sucesso!' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
