import assert = require('assert');
import { Project } from '../samples/simple';
import { createConnection, ConnectionOptions, Connection } from 'typeorm';

const options: ConnectionOptions = {
    type: 'sqlite',
    database: ':memory:',
    entities: [Project],
    synchronize: true,
};

let connection: Connection;
beforeEach(async () => {
    connection = await createConnection(options);
});

it('without find parameters', async () => {
    await Project.create({ status: 'draft', name: 'Draft project' }).save();
    const activeProject = await Project.create({ status: 'active', name: 'Active project' }).save();

    const actual = await Project.active.find();

    assert.deepEqual(actual, [activeProject]);
});

it('with find parameters on top', async () => {
    await Project.create({ status: 'draft', name: 'Draft project' }).save();
    await Project.create({ status: 'active', name: 'Active project 2' }).save();

    const activeProject = await Project.create({ status: 'active', name: 'Active project' }).save();

    const actual = await Project.active.find({ name: 'Active project' });
    assert.deepEqual(actual, [activeProject]);
});

it('with find parameters in where', async () => {
    await Project.create({ status: 'draft', name: 'Draft project' }).save();
    await Project.create({ status: 'active', name: 'Active project 2' }).save();

    const activeProject = await Project.create({ status: 'active', name: 'Active project' }).save();

    const actual = await Project.active.find({ where: { name: 'Active project' } });
    assert.deepEqual(actual, [activeProject]);
});

it('with other find parameters', async () => {
    await Project.create({ status: 'draft', name: 'Draft project' }).save();
    await Project.create({ status: 'active', name: 'Active project 2' }).save();
    await Project.create({ status: 'active', name: 'Active project' }).save();

    const names = await Project.active.find({ where: { name: 'Active project' }, select: ['name'] });
    assert.deepEqual(names, [{ name: 'Active project' }]);
});

it('find one', async () => {
    await Project.create({ status: 'draft', name: 'Draft project' }).save();
    await Project.create({ status: 'active', name: 'Active project 2' }).save();
    const project = await Project.create({ status: 'draft', name: 'Active project' }).save();

    const firstActiveProject = await Project.active.findOne(project.id);
    assert.deepEqual(project, firstActiveProject);
});

afterEach(async () => {
    await connection.close();
});
