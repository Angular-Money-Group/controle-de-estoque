module.exports = {
  get: {
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: ["Produtos"], // operation's tag.
    description: "Exportar produtos", // operation's desc.
    operationId: "exportProducts", // unique operation id.
    // expected responses
    responses: {
      // response code
      200: {
        description: "Exporta produtos", // response desc.
        content: {
          // content-type
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
            schema: {
              type: "string",
              format: "binary",
            },
          },
        },
      },
    },
  },
};
