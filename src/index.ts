export const declareScope = (proto: any, thees: any, scope: any): any => {
    const NewProto = class extends thees {};
    const existed = thees['scopes'] || [];
    const scopes = (NewProto['scopes'] = existed.concat(scope));

    const scopesFindOptions = scopes.reduce((r, c) => Object.assign(r, c), {});

    NewProto.find = async (options: any): Promise<any[]> => {
        const findOptions = { ...options, ...scopesFindOptions };
        return proto.find(findOptions);
    };

    return NewProto;
};
