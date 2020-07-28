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

const declareScope = (proto: any, thees: any, scope: any): any => {
    const NewProto = class extends thees {};
    const existed = thees['scopes'] || [];
    const scopes = (NewProto['scopes'] = existed.concat(scope));

    const scopesFindOptions = scopes.reduce((r, c) => Object.assign(r, c), {});

    NewProto.find = async (options: any): Promise<typeof proto[]> => {
        const findOptions = { ...options, ...scopesFindOptions };
        return proto.find(findOptions);
    };

    return NewProto;
};

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

    static get some(): any {
        return declareScope(Project, this, { name: 'Active project' });
    }

    static get active(): any {
        return declareScope(Project, this, { status: 'active' });
    }
}

export interface Project {
    active: any;
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
})();
