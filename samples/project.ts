import {
    Entity,
    Column,
    createConnection,
    ConnectionOptions,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    FindConditions,
} from 'typeorm';
//import * as crypto from 'crypto';

const fireScope = (proto: any, thees: any, scope: FindConditions<Project>): any => {
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
        return fireScope(Project, this, { name: 'Active project' });
    }

    static get active(): any {
        return fireScope(Project, this, { status: 'active' });
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

    //console.log('===================all===================');
    //console.log(await Project.find());
    console.log('==================active=================');
    console.log(await Project.active.some.find());
    console.log('==================active1=================');
    console.log(await Project.some.active.find());
})();
