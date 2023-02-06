import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Hobby from '../models/Hobby';
import User, { IPopulatedUser } from '../models/User';

const createUser = (req: Request, res: Response, next: NextFunction) => {
    const { name, hobbies } = req.body;

    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name,
        hobbies
    });

    return user
        .save()
        .then((user) => res.status(201).json({ user }))
        .catch((error) => res.status(500).json({ error }));
};

const readUser = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;

    return User.findById(userId)
        .populate('hobbies')
        .then((user) => (user ? res.status(200).json({ user }) : res.status(404).json({ message: 'user not found' })))
        .catch((error) => res.status(500).json({ error }));
};

const getHobbies = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;

    return User.findById(userId)
        .populate('hobbies')
        .then((user) => (user ? res.status(200).json({ hobbies: user.hobbies }) : res.status(404).json({ message: 'user not found' })))
        .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
    return User.find()
        .then((users) => res.status(200).json({ users }))
        .catch((error) => res.status(500).json({ error }));
};

const updateUser = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;

    return User.findById(userId)
        .then((user) => {
            if (user) {
                user.set(req.body);

                return user
                    .save()
                    .then((user) => res.status(201).json({ user }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                return res.status(404).json({ message: 'user not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const deleteUser = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;

    return User.findByIdAndDelete(userId)
        .then((user) => (user ? res.status(201).json({ user, message: 'Deleted' }) : res.status(404).json({ message: 'user not found' })))
        .catch((error) => res.status(500).json({ error }));
};

const addHobby = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;
    const { name, passionLevel, year } = req.body;

    return User.findById(userId)
        .populate<IPopulatedUser>('hobbies')
        .then((user) => {
            if (user) {
                const matchedHobby = user.hobbies.filter((hobby) => hobby.name === name);
                if (matchedHobby.length === 0) {
                    const newHobby = new Hobby({
                        _id: new mongoose.Types.ObjectId(),
                        name,
                        passionLevel,
                        year
                    });
                    newHobby
                        .save()
                        .then((hobby) => {
                            user.hobbies.push(hobby._id);
                            user.save()
                                .then((user) => {
                                    user.populate('hobbies').then((user) => res.status(201).json({ user }));
                                })
                                .catch((error) => res.status(500).json(error));
                        })
                        .catch((error) => res.status(500).json(error));
                } else {
                    res.status(406).json({ message: `hobby ${name} already present` });
                }
            } else {
                res.status(404).json({ message: 'user not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const removeHobby = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;
    const { hobbyId } = req.body;
    console.log(hobbyId);

    return User.findById(userId)
        .then((user) => {
            if (user) {
                console.log(user);
                const index = user.hobbies.indexOf(hobbyId);
                console.log(index);
                user.hobbies.splice(index, 1);
                user.save()
                    .then((user) => {
                        user.populate('hobbies').then((user) => res.status(201).json({ user }));
                    })
                    .catch((error) => res.status(500).json(error));
            } else {
                res.status(404).json({ message: 'user not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

export default { createUser, readUser, readAll, updateUser, deleteUser, addHobby, removeHobby, getHobbies };
