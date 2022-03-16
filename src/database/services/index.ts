import createDynamoDBClient from "../db";
import TodoService from "./TodoService";

// const { TODOS_TABLE } = process.env;

const todoService = new TodoService(createDynamoDBClient(), 'Todos');

export default todoService;