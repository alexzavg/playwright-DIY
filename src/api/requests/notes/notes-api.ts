import { BaseRequestor } from '../base-requestor';

export interface NoteAuthor {
  id: number;
  avatar: string;
  firstName: string;
  lastName: string;
}

export interface NoteReply {
  id: number;
  text: string;
  author: NoteAuthor;
  createdAt: string;
}

export interface Note {
  id: number;
  text: string;
  author: NoteAuthor;
  replies: NoteReply[];
  createdAt: string;
  updatedAt: string;
}

export class NotesApi extends BaseRequestor {
  private static readonly basePath = '/api/notes';

  async getAllNotes() {
    return await this.getRequest({
      url: NotesApi.basePath,
      responseType: 'json',
    });
  }

  async createNote(text: string) {
    return await this.postRequest({
      url: NotesApi.basePath,
      headers: { 'Content-Type': 'application/json' },
      data: { 
        "text": text 
      },
      responseType: 'json',
    });
  }

  async deleteNote(id: number) {
    return await this.makeRequest({
      method: 'DELETE',
      url: `${NotesApi.basePath}/${id}`,
      responseType: 'json',
    });
  }

  async createReply(noteId: number, text: string) {
    return await this.postRequest({
      url: `${NotesApi.basePath}/${noteId}/reply`,
      headers: { 'Content-Type': 'application/json' },
      data: { 
        "text": text 
      },
      responseType: 'json',
    });
  }
}
