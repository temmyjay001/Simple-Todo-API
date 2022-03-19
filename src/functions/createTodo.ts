import { v4 } from "uuid";
import { APIGatewayProxyResult, APIGatewayProxyEvent } from "aws-lambda";
import todoService from "../services";
import createTodo from "../dtos/CreateTodo";
import jsonResponse from "../core/jsonResponse";
import handleError from "../core/handleError";
import * as yup from "yup";

export const handler = async (event: APIGatewayProxyEvent & createTodo): Promise<APIGatewayProxyResult> => {
  try {
    const reqBody = JSON.parse(event.body as string) || {};
    await yup
      .object()
      .shape({
        label: yup.string().required(),
        completed: yup.bool().required(),
      })
      .validate(reqBody, { abortEarly: false });

    const todo = await todoService.createTodo({
      id: v4(),
      ...reqBody,
      createdAt: new Date().toISOString(),
    });
    return jsonResponse(201, todo);
  } catch (error) {
    return handleError(error);
  }
};
