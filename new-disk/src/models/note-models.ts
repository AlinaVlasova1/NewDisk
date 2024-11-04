export class NoteCreationModel {
    title: string;
    content: string;

    constructor(title: string, content: string) {
        this.title = title;
        this.content = content;
    }
}

export interface INoteResponse {
    id: number;
    title: string;
    content: string;
}

export interface INoteListResponse {
    data: Array<INoteResponse>;
}