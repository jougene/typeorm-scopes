export const declareScope = (proto: any, thees: any, scope: any): any => {
    const NewProto = class extends thees {};
    const existed = thees['scopes'] || [];
    const scopes = (NewProto['scopes'] = existed.concat(scope));

    const scopesFindOptions = scopes.reduce((r, c) => Object.assign(r, c), {});

    const resolveFindParams = (options: any, scopesFindOptions: any): any => {
        let findOptions: any;
        if (!options) {
            findOptions = scopesFindOptions;
        }

        if (options && !options.where) {
            findOptions = { ...options, ...scopesFindOptions };
        }

        if (options && options.where) {
            findOptions = options;
            findOptions.where = { ...options.where, ...scopesFindOptions };
        }

        return findOptions;
    };

    NewProto.find = async (options: any): Promise<any[]> => {
        const findOptions = resolveFindParams(options, scopesFindOptions);
        return proto.find(findOptions);
    };

    NewProto.findOne = async (options: any): Promise<any[]> => {
        if (typeof options !== 'object') {
            return proto.findOne(options, scopesFindOptions);
        }

        const findOptions = resolveFindParams(options, scopesFindOptions);
        return proto.findOne(findOptions);
    };

    NewProto.findOneOrFail = async (options: any): Promise<any[]> => {
        if (typeof options !== 'object') {
            return proto.findOne(options, scopesFindOptions);
        }

        const findOptions = resolveFindParams(options, scopesFindOptions);
        return proto.findOneOrFail(findOptions);
    };

    NewProto.count = async (options: any): Promise<any[]> => {
        const findOptions = resolveFindParams(options, scopesFindOptions);
        return proto.count(findOptions);
    };

    return NewProto;
};
