interface CreateTodo {
  body: {
    label: string;
    completed: boolean;
  };
}

export default CreateTodo;