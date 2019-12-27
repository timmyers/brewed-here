import { Entity, PrimaryGeneratedColumn, Column } from "typeorm/browser";

@Entity('visit')
export class Visit {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('text', { nullable: true })
    brewery!: string;
}