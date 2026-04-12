import { Page } from 'playwright';
import { SignInApi } from './requests/auth/sign-in';
import { NotesApi } from './requests/notes/notes-api';

export class ApiManager {
  private _signInApi?: SignInApi;
  private _notesApi?: NotesApi;

  constructor(protected page: Page) {}

  get signIn() {
    return (this._signInApi ??= new SignInApi(this.page));
  }

  get notes() {
    return (this._notesApi ??= new NotesApi(this.page));
  }
}
