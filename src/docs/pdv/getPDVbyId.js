module.exports = {
  get: {
    security: [
      {
         bearerAuth: []
      }
   ],
    tags: ["PDV"],
    description: "Get a PDV by ID",
    operationId: "getPDVbyID",
    parameters: [
      {
        name: "id", // name of the param
        in: "path", // location of the param
        required: true, // Mandatory param
        schema: {
          type: "string",
        },
      },
    ],
    responses: {
      200: {
        description: "PDV found",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/genericResponse",
            },
          },
        },
      },
      400: {
        description: "Error to get PDV",
        content: {
          "application/json": {
            schema: {
              message: {
                type: "string",
                example: "Erro ao buscar PDV",
              },
              err: {
                type: "string",
                example: "Error",
              },
            },
          },
        },
      },
    },
  },
};
