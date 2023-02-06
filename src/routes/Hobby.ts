import express from 'express';
import controller from '../controllers/Hobby';

const router = express.Router();

router.post('/', controller.createHobby);
router.get('/:hobbyId', controller.readHobby);
router.get('/', controller.readAll);
router.patch('/:hobbyId', controller.updateHobby);
router.delete('/:hobbyId', controller.deleteHobby);

export = router;
