import { Column, Entity, OneToMany } from "typeorm";
import { BaseModel } from "./BaseModel";
import { ClassRoom } from "./ClassRoom";
import { Course } from "./Course";

@Entity()
export class Grade extends BaseModel {
    @Column({ unique: true })
    name: string;

    @Column()
    description: string;

    @OneToMany(() => ClassRoom, (classRoom) => classRoom.grade)
    classRooms: ClassRoom[];

    @OneToMany(() => Course, (course) => course.grade)
    courses: Course[];
}