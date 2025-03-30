import Invited from '../models/Invited.js'
import Event from '../models/Event.js'

export const createInvited = async (req, res) => {
    try {
        const { name, email } = req.body;
        const eventId = req.params.eventId;
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).send({ message: 'Evento não encontrado' });
        }

        const invited = new Invited({ name, email, eventId });
        await invited.save();
        res.status(201).send(invited);
    } catch (error) {
        console.error('Erro ao criar convidado:', error);
        res.status(500).send({ message: 'Erro ao criar convidado' });
    }
}

export const getAllInvited = async (req, res) => {
    try {
        const eventId = req.params.eventId;
        const inviteds = await Invited.find({ eventId });
        res.status(200).send(inviteds);
    } catch (error) {
        console.error('Erro ao listar convidados:', error);
        res.status(500).send({ message: 'Erro ao listar convidados' });
    }
}

export const updateInvited = async (req, res) => {
    try {
        const { name, email } = req.body;
        const invitedId = req.params.invitedId;

        const invited = await Invited.findByIdAndUpdate(invitedId, { name, email }, { new: true });
        if (!invited) {
            return res.status(404).send({ message: 'Convidado não encontrado' });
        }
        res.status(200).send(invited);
    } catch (error) {
        console.error('Erro ao editar convidado:', error);
        res.status(500).send({ message: 'Erro ao editar convidado' });
    }
}

export const deleteInvited = async (req, res) => {
    try {
        const invitedId = req.params.invitedId;
        console.log(req.params.invitedId);

        const invited = await Invited.findByIdAndDelete(invitedId);
        if (!invited) {
            return res.status(404).send({ message: 'Convidado não encontrado' });
        }
        res.status(200).send({ message: 'Convidado excluído com sucesso' });
    } catch (error) {
        console.error('Erro ao excluir convidado:', error);
        res.status(500).send({ message: 'Erro ao excluir convidado' });
    }
}
