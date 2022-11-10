import { ConcreteMemento } from "./concreteMemento";
import { Memento } from "./memento";

export class Originator
{
    private _title: string;
    private _content: string;
    private _date: Date;
    private _id: number;

    constructor(id: number, title: string, content: string, date: Date)
    {
        this._title = title;
        this._content = content;
        this._date = date;
        this._id = id;
    }

    public save(): Memento
    {
        return new ConcreteMemento(
            this._id,
            this._title,
            this._content,
            this._date
        );
    }

    public restore(memento: Memento): void
    {
        this._title = memento.getTitle();
        this._content = memento.getContent();
        this._date = memento.getDate();
        this._id = memento.getId();
    }
}