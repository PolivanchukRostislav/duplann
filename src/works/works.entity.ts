import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('works')
export class Works{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    
    @Column()
    text: string;

    @Column()
    AddDate: Date;

    @Column()
    UpdateDate: Date;

    @Column()
    author: string;

    @Column({ type: 'longblob' })
    file: Buffer;


}