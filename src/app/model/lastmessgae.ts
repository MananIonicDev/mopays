import {Contact} from './users';

export interface LastMessage {
    user: Contact;
    date: Date;
    lastMessage: string; 
}