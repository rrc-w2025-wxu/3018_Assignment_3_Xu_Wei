import { ObjectSchema } from "joi";

export const validateData = (schema: ObjectSchema, data: any) => {
    const { error, value } = schema.validate(data, { abortEarly: false });
    if (error) {
        throw new Error(error.details.map(d => d.message).join(", "));
    }
    return value;
};