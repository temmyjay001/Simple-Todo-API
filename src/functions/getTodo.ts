import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import handleError from "../core/handleError";
import jsonResponse from "../core/jsonResponse";
import todoService from "../services";

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
      const todo = await todoService.getTodo(event.pathParameters?.id as string)
      return jsonResponse(200, todo)
  } catch(error) {
    return handleError(error)
  }
}