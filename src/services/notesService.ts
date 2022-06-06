import axios from 'axios';
import {NOTES_API_URL} from '../constants/api'
import INote from '../interfaces/note.interface';

export const getNotes = async () => {
    //console.log("We are awesome");
    try {
      const response = await axios.get(NOTES_API_URL);
      // Cors policy error is due to the security breach and the reason behind this
      // is that frontend and backend is on different port and on the different domain
      // For this we will install CORS package on the backend to allow access from everywhere
      // But in production we should not do this. You wouldn't allow every single domain to allow backend application
      // The good idea is to whitelist the some of the urls and would allow access to this 
      // notesList = response.data.notes;
      return response.data.notes;
    } catch (err) {
      console.error(err);
    }
};

export const createNote = async (newNote: Partial<INote>) => {
    try {
      const response = await axios.post(NOTES_API_URL, newNote);
      return response.data.note;
    } catch (err) {
      console.error(err);
    }
};

export const deleteNote = async (id: string) => {
    try {
      const url = `${NOTES_API_URL}/${id}`;
      const response = await axios.delete(url);
      return response.data.message;
    } catch (err) {
      console.error(err);
    }
};

export const updateNote = async (noteToUpdate: INote) => {
    try {
      const url = `${NOTES_API_URL}/${noteToUpdate._id}`;
      const response = await axios.put(url, noteToUpdate);
      return response.data.note;
    } catch (err) {
      console.error(err);
    }
};