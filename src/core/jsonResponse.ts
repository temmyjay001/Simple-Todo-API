const jsonResponse = (statusCode: number, response: any): JsonResponseFormat => {
  return {
    statusCode,
    body: JSON.stringify(response),
  };
};

interface JsonResponseFormat {
    statusCode: number;
    body: any
};

export default jsonResponse;