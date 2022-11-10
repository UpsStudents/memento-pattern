import { Memento } from "./memento";

export class ConcreteMemento implements Memento
    {
        private _title: string;
        private _content: string;
        private _id: number;
        private _date: Date;

        constructor(id: number, title: string, content: string, date: Date) {
            this._title = title;
            this._content = content;
            this._date = date;
            this._id = id;
        }

        public getTitle(): string
        {
            return this._title;
        }

        public getContent(): string
        {
            return this._content;
        }

        public getDate() : Date
        {
            return this._date;
        }

        public getId() : number
        {
            return this._id;
        }
    }