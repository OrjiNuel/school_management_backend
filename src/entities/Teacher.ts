import { Column, Entity, ManyToOne, OneToOne } from "typeorm";
import { BaseModel } from "./BaseModel";
import { ClassRoom } from "./ClassRoom";
import { Course } from "./Course";

@Entity()
export class Teacher extends BaseModel {
    [x: string]: any;
    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column()
    address: string;

    @Column()
    dob: string;

    @Column()
    age: number;

    @Column()
    password: string;

    @Column()
    gender: string;

    @Column({ type: "timestamptz" })
    dateJoined: Date;

    @Column()
    status: boolean;

    @OneToOne(() => ClassRoom, (classRoom) => classRoom.teacher)
    classRoom: ClassRoom;

    @ManyToOne(() => Course, (course) => course.teachers, {
        cascade: ["insert", "update"],
    })
    course: Course;
}