import { DocumentClient } from "aws-sdk/clients/dynamodb";
import Todo from "../../models/Todo";
class TodoService {
  constructor(private readonly docClient: DocumentClient, private readonly tableName: string) {}

  async createTodo(item: Todo): Promise<Todo> {
    await this.docClient
      .put({
        TableName: this.tableName,
        Item: item,
      })
      .promise();
    return item;
  }

  async getTodo(id: string): Promise<Todo> {
    const result = await this.docClient
      .get({
        TableName: this.tableName,
        Key: {
          id,
        },
      })
      .promise();

    return result.Item as Todo;
  }

  async getAllTodos(): Promise<Todo[]> {
    const todos = await this.docClient.scan({
      TableName: this.tableName,
    }).promise();

    return todos.Items as Todo[]
  }

  async updateTodo(id: string, item: Partial<Todo>): Promise<Todo> {
    const updated = await this.docClient
      .update({
        TableName: this.tableName,
        Key: { id },
        UpdateExpression: "set #label = :label, completed = :completed, updatedAt = :updatedAt",
        ExpressionAttributeNames: {
          "#label": "label",
        },
        ExpressionAttributeValues: {
          ":label": item.label,
          ":completed": item.completed,
          ":updatedAt": item.updatedAt,
        },
        ReturnValues: "ALL_NEW",
      })
      .promise();

    return updated.Attributes as Todo;
  }

  async deleteTodo(id: string) {
    return await this.docClient
      .delete({
        TableName: this.tableName,
        Key: { id },
      })
      .promise();
  }
}
