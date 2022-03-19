import { DocumentClient } from "aws-sdk/clients/dynamodb";
import HttpError from "../../core/HttpError";
import Todo from "../../models/Todo";

class TodoService {
  constructor(private readonly docClient: DocumentClient, private readonly tableName: string) {}

  async createTodo(item: Todo): Promise<Todo> {
    await this.docClient
      .put({
        TableName: this.tableName,
        Item: {
          ...item,
          updatedAt: new Date().toISOString(),
        },
      })
      .promise();
    return item;
  }

  async getTodo(id: string): Promise<Todo> {
    return await this.fetchTodoById(id);
  }

  async getAllTodos(): Promise<Todo[]> {
    const todos = await this.docClient
      .scan({
        TableName: this.tableName,
      })
      .promise();

    return todos.Items as Todo[];
  }

  async updateTodo(id: string, item: Partial<Todo>): Promise<Todo> {
    await this.fetchTodoById(id);
    item.updatedAt = new Date().toISOString();
    const objectKeys = Object.keys(item);

    const updated = await this.docClient
      .update({
        TableName: this.tableName,
        Key: { id },
        UpdateExpression: `SET ${objectKeys.map((_, index) => `#${_} = :${_}`)}`,
        ExpressionAttributeNames: objectKeys.reduce(
          (acc, key, index) => ({
            ...acc,
            [`#${key}`]: key,
          }),
          {},
        ),
        ExpressionAttributeValues: objectKeys.reduce(
          (acc, key, index) => ({
            ...acc,
            [`:${key}`]: item[key as keyof Todo],
          }),
          {},
        ),
        ReturnValues: "ALL_NEW",
      })
      .promise();

    return updated.Attributes as Todo;
  }

  async deleteTodo(id: string) {
    await this.fetchTodoById(id);
    return await this.docClient
      .delete({
        TableName: this.tableName,
        Key: { id },
      })
      .promise();
  }

  async fetchTodoById(id: string): Promise<Todo> {
    const output = await this.docClient
      .get({
        TableName: this.tableName,
        Key: {
          id,
        },
      })
      .promise();

    if (!output.Item) {
      throw new HttpError(404, { error: "Todo not found" });
    }

    return output.Item as Todo;
  }
}

export default TodoService;
