import HttpError from "./HttpError";
import * as yup from "yup";
import jsonResponse from "./jsonResponse";

export default function handleError(error: unknown) {
  if (error instanceof yup.ValidationError) {
    return jsonResponse(400, {
      errors: error.errors,
    });
  }
  if (error instanceof SyntaxError) {
    return jsonResponse(400, { error: `Invalid request body format: "${error.message}"` });
  }
  if (error instanceof HttpError) {
    return jsonResponse(error.statusCode, error.message);
  }

  throw error;
}
