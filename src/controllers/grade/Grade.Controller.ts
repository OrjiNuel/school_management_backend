import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { 
    createGradeService, 
    deleteGradeService, 
    getAllGradesService, 
    getGradeService, 
    updateGradeService 
} from "../../services/grade/Grade.Service";

//  Get all grades
export async function getAllGrades(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { skip, take, query } = req.query;
        return res.status(200).send(
            await getAllGradesService({
                skip: Number(skip ?? 0),
                take: Number(take ?? 0),
                query: query as string,
            })
        );
    } catch (error) {
        let message;
        if (error instanceof Error) {
            message = error.message;
        } else {
            message = String(error);
        }
        console.error("error ", error)
        return next(createHttpError(500, message));
    }
}

// Get single grade by id
export async function getGrade(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
    const result = await getGradeService(req.params["id"]);
    if (!result.grade) return next(createHttpError(404, "Grade not found"));
    return res.status(200).send(result);
  } catch (error) {
    let message;
    if (error instanceof Error) {
      message = error.message;
    } else {
      message = String(error);
    }
    if (message.includes("invalid input syntax")) {
      message = "Invalid grade id supplied";
      return next(createHttpError(400, message));
    }
    return next(createHttpError(500, message));
  }
}

// Create grade
export async function createGrade(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        return res.send(201).send(await createGradeService(req.body));
    } catch (error: any) {
        let message;
        if (error instanceof Error) {
            message = error.message;
        } else {
            message = String(error);
        }

        if (
            message.includes("duplicate key value violates unique constraint") &&
            error.detail.includes("name")
        ) {
            message = "A grade with this name already exists";
            return next(createHttpError(400, message));
        }

        return next(createHttpError(500, message));
    }
}

// Update Grade
export async function updateGrade(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const result = await updateGradeService(req.params["id"], req.body);
        if (!result.grade) return next(createHttpError(404, "Grade not found"));
        return res.send(200).send(result);
    } catch (error: any) {
        let message;
        if (error instanceof Error) {
            message = error.message;
        } else {
            message = String(error);
        }

        if (
            message.includes("duplicate key value violates unique constraint") &&
            error.detail.includes("name")
        ) {
            message = "A grade with this name already exists";
            return next(createHttpError(400, message));
        }

        if (message.includes("invalid input syntax")) {
            message = "Invalid grade id supplied";
            return next(createHttpError(400, message));
        }
        return next(createHttpError(500, "Something went wrong, try again later"));
    }
}

// Delete Grade
export async function deleteGrade(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const result = await deleteGradeService(req.params['id']);
        if (!result.grade) return next(createHttpError(404, "Grade not found"));
        return res.status(200).send(result);
    } catch (error) {
        let message;
        if (error instanceof Error) {
            message = error.message;
        } else {
            message = String(error);
        }
        if (message.includes("invalid input syntax")) {
            message = "Invalid grade id supplied";
            return next(createHttpError(400, message));
        }
        return next(createHttpError(500, "Something went wrong, try again later"));
    }
}