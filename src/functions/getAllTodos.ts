import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import handleError from "../core/handleError";
import jsonResponse from "../core/jsonResponse";
import todoService from "../database/services";

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const todo = await todoService.getAllTodos();
    return jsonResponse(200, todo);
  } catch (error) {
    return handleError(error);
  }
};
