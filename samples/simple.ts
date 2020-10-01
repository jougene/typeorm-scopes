import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { declareScope } from '../src';

@Entity()
export class Project extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    status: string;

    @Column()
    name: string;

    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    public updatedAt: Date;

    // Scopes
    static get some(): typeof Project {
        return declareScope(Project, this, { name: 'Active project' });
    }

    static get active(): typeof Project {
        return declareScope(Project, this, { status: 'active' });
    }
}
