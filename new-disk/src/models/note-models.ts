export class CreatedNote {
    title: string;
    content: string;

    constructor(title: string, content: string) {
        this.title = title;
        this.content = content;
    }
}

export interface IResponseNote {
    id: number;
    title: string;
    content: string;
}

export interface IResponseNoteData {
    data: Array<IResponseNote>;
}