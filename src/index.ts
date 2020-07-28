export * from './scope.decorator';

//@Exclude()
//static scopes = {
//active: { status: ProjectStatus.DRAFT },
//};

//static get active(): any {
//const NewProto = class extends Project {};

//// and all other methods
//// findOne
//NewProto.find = async (options: any): Promise<Project[]> => {
//const findOptions = { ...options, ...Project.scopes.active };
//return Project.find(findOptions);
//};

//return NewProto;
//}
