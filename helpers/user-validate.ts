/** Validation parameters */
type AttrProps = {
    regex?: RegExp,
    min?: number,
}

type FieldProps = {
    [key: string]: AttrProps
}

type TypesProps = {
    [key: string]: FieldProps
}

const types: TypesProps = {
    name: {
        format: {
            regex: /^[a-zA-Zà-úÀ-Ú\s]{2,}$/,
        },
        length: {
            min: 2,
        }
    },
    weight: {
        format: {
            regex: /^(([\d]{1,3})(\,([\d]{1,2}))?)$/,
        }
    },
    height: {
        format: {
            regex: /^[0-9]+$/,
        }
    },
    email: {
        format: {
            regex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        }
    },
    password: {
        format: {
            regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/,
        },
        length: {
            min: 6,
        }
    },
};

type ValidateProps = {
    type: string,
    value: string,
    min?: number,
}

/** Validate form fields */
export function validate({ type, value, min = 0 }: ValidateProps) {
    if (value.trim().length === 0) return false;

    else if (Number(value) === 0 && !isNaN(Number(value))) return false;

    else if (types[type] && ("length" in types[type]) && value.trim().length < min) return false;

    else if (types[type] && ("format" in types[type]) && !types[type].format.regex?.test(value)) return false;

    else return true;
}