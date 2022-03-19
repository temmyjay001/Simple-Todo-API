const jsonResponse = (statusCode: number, response: any): JsonResponseFormat => {
  return {
    headers: { "Content-Type": "application/json" },
    statusCode,
    body: JSON.stringify(response),
  };
};

interface JsonResponseFormat {
  headers: any;
  statusCode: number;
  body: any;
}

export default jsonResponse;
