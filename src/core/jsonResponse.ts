const jsonResponse = (statusCode: number, response: any): Object => {
  return {
    statusCode,
    body: JSON.stringify(response),
  };
};

export default jsonResponse;