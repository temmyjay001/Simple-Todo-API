import { v4 } from "uuid";
import { APIGatewayProxyResult, APIGatewayProxyEvent } from "aws-lambda";
import { Handler } from "aws-lambda";
import middify from "../core/middify";
import todoService from "../database/services";
import createTodo from "../dtos/CreateTodo";
import jsonResponse from "../core/jsonResponse";
import handleError from "../core/handleError";

export const handler: Handler = middify(
  async (event: APIGatewayProxyEvent & createTodo): Promise<APIGatewayProxyResult> => {
    const { label, completed } = event.body;

    try {
      const todo = await todoService.createTodo({
        id: v4(),
        label,
        completed,
        createdAt: new Date().toISOString()
      });
      return jsonResponse(201, todo);
    } catch (error) {
      return handleError(error);
    }
  },
);
