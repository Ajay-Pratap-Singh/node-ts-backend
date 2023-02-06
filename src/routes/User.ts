import express from 'express';
import controller from '../controllers/User';

const router = express.Router();

router.get('/', controller.readAll);
router.get('/:userId', controller.readUser);
router.post('/', controller.createUser);
router.get('/:userId/hobbies', controller.getHobbies);
router.put('/:userId/hobbies', controller.addHobby);
router.delete('/:userId/hobbies', controller.removeHobby);
router.patch('/:userId', controller.updateUser);
router.delete('/:userId', controller.deleteUser);

export = router;
