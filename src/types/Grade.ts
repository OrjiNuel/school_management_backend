import { object, string } from "zod";
import { Grade } from "./../entities/Grade";
import { FieldError } from "./FieldError";

export class GradeResponse {
    errors?: FieldError[];
    grades?: Grade[] | undefined | null;
    count?: number;
    grade?: Grade | undefined | null;
}

export class CreateGradeInput {
    name: string;
    description: string;
}

export class UpdateGradeInput {
    name: string;
    description: string;
}

export const createGradeSchema = object({
    body: object({
        name: string({ required_error: "Grade name is required" }),
        description: string({ required_error: "Grade description is required" }),
    }),
});

export const updateGradeSchema = object({
    params: object({
        id: string({ required_error: "Invalid grade is supplied" }),
    }),
    body: object({
        name: string({ required_error: "Grade name is required" }),
        description: string({ required_error: "Grade description is required" }),
    }),
});