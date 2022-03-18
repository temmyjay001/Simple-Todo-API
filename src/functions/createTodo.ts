import { v4 } from "uuid";
import { APIGatewayProxyResult, APIGatewayProxyEvent } from "aws-lambda";
import todoService from "../database/services";
import createTodo from "../dtos/CreateTodo";
import jsonResponse from "../core/jsonResponse";
import handleError from "../core/handleError";
import * as yup from "yup";

export const handler = async (event: APIGatewayProxyEvent & createTodo): Promise<APIGatewayProxyResult> => {
  try {
    const { label, completed } = JSON.parse(event.body as string);
    await yup
      .object()
      .shape({
        label: yup.string().required(),
        completed: yup.bool().required(),
      })
      .validate(event.body, { abortEarly: false });

    const todo = await todoService.createTodo({
      id: v4(),
      label,
      completed,
      createdAt: new Date().toISOString(),
    });
    return jsonResponse(201, todo);
  } catch (error) {
    return handleError(error);
  }
};
