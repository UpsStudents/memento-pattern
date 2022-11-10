export interface MementoHistoryItem
{
    id: number,
    title: string,
    summary: string,
    date: Date
}

export interface Memento
{
    title: string,
    content: string,
    date: Date
}