import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Memento {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    title: string;

    @Column({ nullable: true })
    content: string;

    @Column({ nullable: true })
    date?: Date;    
}