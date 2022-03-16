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
      const result = await this.docClient.get({
          TableName: this.tableName,
          Key: {
              id
          }
      }).promise();

      return result.Item as Todo
  }
}
