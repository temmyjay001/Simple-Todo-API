import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import AWS from "aws-sdk";
import { v4 } from "uuid";
import * as yup from "yup";

const docClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "Todos";

class HttpError extends Error {
  constructor(public statusCode: number, body: Record<string, unknown> = {}) {
    super(JSON.stringify(body));
  }
}

const TodoSchema = yup.object().shape({
  label: yup.string().required(),
  completed: yup.bool().required(),
});

function handleError(error: unknown) {
  if (error instanceof yup.ValidationError) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        errors: error.errors,
      }),
    };
  }
  if (error instanceof SyntaxError) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: `Invalid request body format: "${error.message}"` }),
    };
  }
  if (error instanceof HttpError) {
    return {
      statusCode: error.statusCode,
      body: error.message,
    };
  }
  throw error;
}

const fetchTodoById = async (id: string) => {
  const output = await docClient
    .get({
      TableName: TABLE_NAME,
      Key: {
        id,
      },
    })
    .promise();

  if (!output.Item) {
    throw new HttpError(404, { error: "Todo not found" });
  }

  return output.Item;
};

export const createTodo = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const requestBody = JSON.parse(event.body as string);

    await TodoSchema.validate(requestBody, { abortEarly: false });

    const todo = {
      id: v4(),
      ...requestBody,
      created_at: new Date(),
      updated_at: new Date(),
    };

    await docClient
      .put({
        TableName: TABLE_NAME,
        Item: todo,
      })
      .promise();

    return {
      statusCode: 201,
      body: JSON.stringify(todo),
    };
  } catch (error) {
    return handleError(error);
  }
};

export const getTodo = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const todo = await fetchTodoById(event.pathParameters?.id as string);

    return {
      statusCode: 200,
      body: JSON.stringify(todo),
    };
  } catch (error) {
    return handleError(error);
  }
};

export const updateTodo = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const id = event.pathParameters?.id as string;
    await fetchTodoById(id);
    const requestBody = JSON.parse(event.body as string);

    await TodoSchema.validate(requestBody, {abortEarly: false})

    const todo = {
      id: id, 
      ...requestBody,
      updated_at: new Date(),
    };

    await docClient
      .put({
        TableName: TABLE_NAME,
        Item: todo,
      })
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify(todo),
    };
  } catch (error) {
    return handleError(error);
  }
};

export const deleteTodo = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const id = event.pathParameters?.id as string;

    await fetchTodoById(id);

    await docClient
      .delete({
        TableName: TABLE_NAME,
        Key: {
          id,
        },
      })
      .promise();

    return {
      statusCode: 204,
      body: "",
    };
  } catch (error) {
    return handleError(error);
  }
};

export const listTodos = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const output = await docClient
    .scan({
      TableName: TABLE_NAME,
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify(output.Items),
  };
};
