import {ApiUrlFactory} from "@/services/api-url-factory";
import axios from "axios";
import {NoteCreationModel, INoteListResponse} from "@/models/note-models";

export class NoteService {

    private readonly url  = ApiUrlFactory.create('notes');

    getListNotes(): Promise<INoteListResponse> {
        return axios.get(this.url.toString());
    }

    createNote(body: NoteCreationModel) {
        return axios.post(this.url.toString(), body);
    }

    deleteNote(id: number) {
        return axios.delete(`${this.url.toString()}/${id}`);
    }
}