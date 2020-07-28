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
//import * as crypto from 'crypto';

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
        const NewProto = class extends this {};
        const existed = this['scopes'] || [];
        const scopes = (NewProto['scopes'] = existed.concat([{ name: 'Active project' }]));

        const scopesFindOptions = scopes.reduce((r, c) => Object.assign(r, c), {});

        NewProto.find = async (options: any): Promise<Project[]> => {
            const findOptions = { ...options, ...scopesFindOptions };
            return Project.find(findOptions);
        };

        return NewProto;
    }

    static get active(): any {
        const NewProto = class extends this {};
        const existed = this['scopes'] || [];
        const scopes = (NewProto['scopes'] = existed.concat({ status: 'active' }));

        console.log({ scopes })

        const scopesFindOptions = scopes.reduce((r, c) => Object.assign(r, c), {});

        NewProto.find = async (options: any): Promise<Project[]> => {
            const findOptions = { ...options, ...scopesFindOptions };
            return Project.find(findOptions);
        };

        return NewProto;
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
    console.log(await Project.active.find());

})();
