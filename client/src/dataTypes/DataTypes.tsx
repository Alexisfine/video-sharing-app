import {TDate} from "timeago.js";

export interface IVideo {
    _id: string,
    userId: string,
    title: string,
    description: string,
    imgUrl: string,
    videoUrl: string,
    videoViews: number,
    likes: string[],
    dislikes: string[],
    tags: string[],
    createdAt: TDate,
    updatedAt: TDate,
}

export interface IUser {
    _id?: string,
    name?: string,
    img?: string,
}