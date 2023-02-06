import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Hobby from '../models/Hobby';

const createHobby = (req: Request, res: Response, next: NextFunction) => {
    const { name, passionLevel, year } = req.body;

    const hobby = new Hobby({
        _id: new mongoose.Types.ObjectId(),
        name,
        passionLevel,
        year
    });

    return hobby
        .save()
        .then((hobby) => res.status(201).json({ hobby }))
        .catch((error) => res.status(500).json({ error }));
};

const readHobby = (req: Request, res: Response, next: NextFunction) => {
    const hobbyId = req.params.hobbyId;

    return Hobby.findById(hobbyId)
        .then((hobby) => (hobby ? res.status(200).json({ hobby }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
    return Hobby.find()
        .then((hobbies) => res.status(200).json({ hobbies }))
        .catch((error) => res.status(500).json({ error }));
};

const updateHobby = (req: Request, res: Response, next: NextFunction) => {
    const hobbyId = req.params.hobbyId;

    return Hobby.findById(hobbyId)
        .then((hobby) => {
            if (hobby) {
                hobby.set(req.body);

                return hobby
                    .save()
                    .then((hobby) => res.status(201).json({ hobby }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                return res.status(404).json({ message: 'not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const deleteHobby = (req: Request, res: Response, next: NextFunction) => {
    const hobbyId = req.params.hobbyId;

    return Hobby.findByIdAndDelete(hobbyId)
        .then((hobby) => (hobby ? res.status(201).json({ hobby, message: 'Deleted' }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

export default { createHobby, readHobby, readAll, updateHobby, deleteHobby };
