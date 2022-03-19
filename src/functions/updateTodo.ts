import { APIGatewayProxyResult } from "aws-lambda";
import { APIGatewayProxyEvent } from "aws-lambda";
import handleError from "../core/handleError";
import jsonResponse from "../core/jsonResponse";
import todoService from "../database/services";
import UpdateTodo from "../dtos/UpdateTodo";

export const handler = async (event: APIGatewayProxyEvent & UpdateTodo): Promise<APIGatewayProxyResult> => {
  try {
    const body = JSON.parse(event.body);
    const todo = await todoService.updateTodo(event.pathParameters?.id as string, body);

    return jsonResponse(200, todo);
  } catch (error) {
    return handleError(error);
  }
};
