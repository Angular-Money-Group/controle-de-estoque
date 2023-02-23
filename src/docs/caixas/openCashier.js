module.exports = {
  post: {
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: ["Caixas"], // operation's tag.
    description: "Abre um caixa", // operation's desc.
    operationId: "openCashier", // unique operation id.
    requestBody: {
        // expected request body
        content: {
            // content-type
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        name: {
                            type: "string",
                            description: "Nome do caixa",
                            example: "Caixa 1",
                        },
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
    responses: {
      // response code
      200: {
        description: "Caixa aberto com sucesso", // response desc.
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
        description: "Erro ao abrir caixa", // response desc.
        content: {
          "application/json": {
            schema: {
              message: {
                type: "string",
                example: "Erro ao abrir caixa",
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
