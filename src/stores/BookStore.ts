'use client';

import { makeAutoObservable } from 'mobx';
import { RootStore } from './index';


export enum BookStatus {
    Read,
    Unread,
}

export type Book = {
    status: BookStatus,
    title: string,
    author_name: string,
    genre: string,
    key: string,
};


export class BookStore {
    rootStore: RootStore;

    books: { [key: string]: Book } = {};

    constructor(rootStore: RootStore) {
        makeAutoObservable(this, { rootStore: false });
        this.rootStore = rootStore;
    }

    setBooks = (books: { [key: string]: Book }) => {
        this.books = books;
    }

    getBooks = () => {
        return this.books;
    }

    getBooksAsList = () => {
        return Object.values(this.books);
    }

    addBook = (book: Book) => {
        book.status = BookStatus.Unread;
        this.books[book.key] = book;
        localStorage.setItem('books', JSON.stringify(this.books));
    }

    deleteBook = (book: Book) => {
        delete this.books[book.key];
        localStorage.setItem('books', JSON.stringify(this.books));
    }

    updateBook = (book: Book, property: string, value: any) => {
        this.books[book.key] = {
            ...this.books[book.key],
            [property]: value,
        };
        localStorage.setItem('books', JSON.stringify(this.books));
    }
}

export default BookStore;
