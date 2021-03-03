import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from '../interfaces/contact.interface';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contact: Contact[];
  selectedContact: Contact;

  constructor(public https: HttpClient) { }

  postContact(contact) {
    return this.https.post('https://blackisp.herokuapp.com/contact', contact);
  }
}
