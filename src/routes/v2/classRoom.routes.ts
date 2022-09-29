import express from 'express'
import {
  createClassRoomSchema,
  updateClassRoomSchema,
} from '../../types/ClassRoom'
import {
  createClassRoom,
  deleteClassRoom,
  getAllClassRooms,
  getClassRoom,
  updateClassRoom,
} from '../../controllers/classRoom/ClassRoom.Controller'
import validateResource from '../../middlewares/ValidateResource'

const router = express.Router()

router.get('/', getAllClassRooms)

router.get('/:id', getClassRoom)

router.post('/', validateResource(createClassRoomSchema), createClassRoom)

router.put('/:id', validateResource(updateClassRoomSchema), updateClassRoom)

router.delete('/:id', deleteClassRoom)

export default router
