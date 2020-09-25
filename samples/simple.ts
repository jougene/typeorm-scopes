import {
    Entity,
    Column,
    createConnection,
    ConnectionOptions,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
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

    // Scopes
    static get some(): typeof Project {
        return declareScope(Project, this, { name: 'Active project' });
    }

    static get active(): typeof Project {
        return declareScope(Project, this, { status: 'active' });
    }
}

const options: ConnectionOptions = {
    type: 'sqlite',
    database: ':memory:',
    entities: [Project],
    synchronize: true,
};

(async () => {
    await createConnection(options);
    await Project.insert({ status: 'draft', name: 'Draft project' });
    await Project.insert({ status: 'draft', name: 'Active project' });
    await Project.insert({ status: 'active', name: 'Active project' });
    await Project.insert({ status: 'active', name: 'Another Active project' });
    await Project.insert({ status: 'other', name: 'Other project' });

    console.log('==================active and some=================');
    console.log(await Project.active.some.find());
    console.log('==================some and active=================');
    console.log(await Project.some.active.find());

    console.log('Active count');
    console.log(await Project.active.count());

    console.log(await Project.active.findOne());
    console.log(await Project.active.find());
})();
