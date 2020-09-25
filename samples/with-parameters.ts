import {
    Entity,
    Column,
    createConnection,
    ConnectionOptions,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    Between,
} from 'typeorm';
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

    static get active(): typeof Project {
        return declareScope(Project, this, { status: 'active' });
    }

    static createdAfter(date: Date): typeof Project {
        return declareScope(Project, this, { createdAt: Between(date.toISOString(), new Date().toISOString()) });
    }

    static createdBefore(date: Date): typeof Project {
        return declareScope(Project, this, { createdAt: Between(new Date('1970-01-01').toISOString(), date.toISOString()) });
    }
}

const options: ConnectionOptions = {
    type: 'sqlite',
    //logging: true,
    database: ':memory:',
    entities: [Project],
    synchronize: true,
};

(async () => {
    await createConnection(options);
    const p1 = await Project.create({ status: 'draft', name: 'Draft project' }).save();
    p1.createdAt = new Date('2020-01-01');
    await p1.save();

    const p2 = await Project.create({ status: 'draft', name: 'Active project' }).save();
    p2.createdAt = new Date('2020-02-01');
    await p2.save();

    const p3 = await Project.create({ status: 'active', name: 'Active project' }).save();
    p3.createdAt = new Date('2020-06-01');
    await p3.save();

    await Project.create({ status: 'active', name: 'Another Active project' }).save();
    await Project.create({ status: 'other', name: 'Other project' }).save();

    console.log(await Project.find());

    console.log('Projects created before June');
    console.log(await Project.createdBefore(new Date('2020-06-01')).find());

    console.log('Projects created after June');
    console.log(await Project.createdAfter(new Date('2020-06-01')).find());
})();
