export interface Memento
{
    getContent(): string;

    getTitle(): string;

    getDate(): Date;
    
    getId(): number;
}