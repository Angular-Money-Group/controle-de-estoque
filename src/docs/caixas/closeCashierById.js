module.exports = {
  post: {
    security: [
      {
         bearerAuth: []
      }
   ],
    tags: ["Caixas"], // operation's tag.
    description: "Fecha um caixa", // operation's desc.
    operationId: "closeCashierById", // unique operation id.
    parameters: [
      // expected params.
      {
        name: "id", // name of the param
        in: "path", // location of the param
        required: true, // Mandatory param
        schema: {
          type: "string",
        },
      },
    ],
    requestBody: {
      // expected request body
      content: {
        // content-type
        "application/json": {
          schema: {
                        type: "object",
                        properties: {
                            totalCash: {
                                type: "number",
                                description: "Total de dinheiro no caixa",
                                example: 100.0,
                            },
                            
                    }
                    },
        },
      },
    },
    // expected responses
    responses: {
      // response code
      200: {
        description: "Caixa fechado com sucesso", // response desc.
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/genericResponse",
            },
          },
        },
      },
      // response code
      400: {
        description: "Erro ao fechar caixa", // response desc.
        content: {
          "application/json": {
            schema: {
              message: {
                type: "string",
                example: "Erro ao fechar caixa",
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
