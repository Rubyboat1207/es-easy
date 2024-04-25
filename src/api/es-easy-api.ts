import axios from "axios";
import { CourseChange } from "../components/Rotationcard";

declare interface CourseListShareObject {
    id: string,
    data: CourseChange[],
    sharer: string,
}

export async function shareSchedule(courseChanges: CourseChange[], name: string): Promise<{code: string}> {
    return (await axios.post(import.meta.env.VITE_API_URL + '/api/v1/schedules', {
        name,
        data: courseChanges
    })).data
}

export async function getSchedule(id: string): Promise<CourseListShareObject> {
    return (await axios.get(import.meta.env.VITE_API_URL + '/api/v1/schedules/' + id)).data
}