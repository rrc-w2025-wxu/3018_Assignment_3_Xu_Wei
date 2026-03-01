import { ObjectSchema } from "joi";

/**
 * Validate data against a Joi schema.
 *
 * This function checks if the provided data conforms to the given Joi schema.
 * It throws an error if validation fails, with all error messages concatenated.
 *
 * @param schema - Joi ObjectSchema used to validate the data
 * @param data - The input data to validate
 * @returns The validated and potentially coerced data if validation passes
 * @throws Throws an Error containing all validation error messages if validation fails
 */
export const validateData = (schema: ObjectSchema, data: any) => {
    const { error, value } = schema.validate(data, { abortEarly: false });
    if (error) {
        throw new Error(error.details.map(d => d.message).join(", "));
    }
    return value;
};