export type Options = {
    transitions: any[];
    stateField?: string;
    options?: {
        autoImplementAll?: boolean;
        autoImplementOnly?: string[];
        autoImplementExcept?: string[];
        errorFactory?: () => Error;
    };
};

const defaultOptions: Partial<Options> = {
    stateField: 'status',
    options: {
        autoImplementAll: true,
    },
};

export function Scopes(data: Options) {
    const options = data;
    options.stateField = data.stateField || defaultOptions.stateField;
    options.options = data.options || defaultOptions.options;

    return function (ctor: any) {
        console.log(ctor);
    };
}
