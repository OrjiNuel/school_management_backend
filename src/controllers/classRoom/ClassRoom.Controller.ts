import { NextFunction, Request, Response } from 'express'
import createHttpError from 'http-errors'
import {
  createClassRoomService,
  deleteClassRoomService,
  getAllClassRoomsService,
  getClassRoomService,
  updateClassRoomService,
} from '../../services/classRoom/ClassRoom.Service'

//  Get all Class Rooms
export async function getAllClassRooms(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { skip, take, query } = req.query
    return res.sendStatus(200).send(
      await getAllClassRoomsService({
        skip: Number(skip ?? 0),
        take: Number(take ?? 0),
        query: query as string,
      })
    )
  } catch (error) {
    let message
    if (error instanceof Error) {
      message = error.message
    } else {
      message = String(error)
    }
    console.error('error ', error)
    return next(createHttpError(500, message))
  }
}

// Get single Class Room by id
export async function getClassRoom(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await getClassRoomService(req.params['id'])
    if (!result.classRoom)
      return next(createHttpError(404, 'ClassRoom not found'))
    return res.sendStatus(200).send(result)
  } catch (error) {
    let message
    if (error instanceof Error) {
      message = error.message
    } else {
      message = String(error)
    }
    if (message.includes('invalid input syntax')) {
      message = 'Invalid ClassRoom id supplied'
      return next(createHttpError(400, message))
    }
    return next(createHttpError(500, message))
  }
}

// Create ClassRoom
export async function createClassRoom(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    return res.sendStatus(201).send(await createClassRoomService(req.body))
  } catch (error: any) {
    let message
    if (error instanceof Error) {
      message = error.message
    } else {
      message = String(error)
    }

    if (
      message.includes('duplicate key value violates unique constraint') &&
      error.detail.includes('name')
    ) {
      message = 'A ClassRoom with this name already exists'
      return next(createHttpError(400, message))
    }

    return next(createHttpError(500, message))
  }
}

// Update ClassRoom
export async function updateClassRoom(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await updateClassRoomService(req.params['id'], req.body)
    if (!result.classRoom)
      return next(createHttpError(404, 'ClassRoom not found'))
    return res.sendStatus(200).send(result)
  } catch (error: any) {
    let message
    if (error instanceof Error) {
      message = error.message
    } else {
      message = String(error)
    }

    if (
      message.includes('duplicate key value violates unique constraint') &&
      error.detail.includes('name')
    ) {
      message = 'A ClassRoom with this name already exists'
      return next(createHttpError(400, message))
    }

    if (message.includes('invalid input syntax')) {
      message = 'Invalid ClassRoom id supplied'
      return next(createHttpError(400, message))
    }
    return next(createHttpError(500, 'Something went wrong, try again later'))
  }
}

// Delete class room
export async function deleteClassRoom(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await deleteClassRoomService(req.params.id)
    if (!result.classRoom)
      return next(createHttpError(404, 'ClassRoom not found'))
    return res.sendStatus(200).send(result)
  } catch (error) {
    let message
    if (error instanceof Error) {
      message = error.message
    } else {
      message = String(error)
    }
    if (message.includes('invalid input syntax')) {
      message = 'Invalid class room id supplied'
      return next(createHttpError(400, message))
    }
    return next(createHttpError(500, 'Something went wrong, try again later'))
  }
}
