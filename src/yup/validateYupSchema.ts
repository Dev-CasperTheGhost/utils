import * as yup from "yup";
import type { ObjectShape } from "yup/lib/object";
import { createYupSchema } from "./createYupSchema.js";

/**
 * validate a yup schema
 * @param {ObjectShape[] | ObjectShape} objs An object (or an array of objects) to validate the data on (the schema will be automatically created.)
 * @param data The data to validate
 * @returns An array with the error or null
 */
export async function validateSchema<T = any>(
  objs: ObjectShape | ObjectShape[],
  data: T,
): Promise<[yup.ValidationError | null]> {
  const resolved = Array.isArray(objs) ? objs : [objs];
  const schema = createYupSchema(...resolved);

  try {
    await schema.validate(data);

    return [null];
  } catch (err) {
    return [err as yup.ValidationError];
  }
}
