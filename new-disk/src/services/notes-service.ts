import {UrlServices} from "@/services/url-services";
import axios from "axios";
import {CreatedNote, IResponseNoteData} from "@/models/note-models";

export class NoteService {
    urlService = new UrlServices();
    url  = this.urlService.addPathName('notes');

    getListNotes(accessToken: string): Promise<IResponseNoteData> {
        return axios.get(this.url.toString(), {headers: {Authorization: `Bearer ${accessToken}`}});
    }

    createNote(body: CreatedNote, accessToken: string) {
        return axios.post(this.url.toString(), body, {headers: {Authorization: `Bearer ${accessToken}`}});
    }

    deleteNote(id: number, accessToken: string) {
        return axios.delete(`${this.url.toString()}/${id}`, {headers: {Authorization: `Bearer ${accessToken}`}});
    }
}