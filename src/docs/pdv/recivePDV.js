module.exports = {
  post: {
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: ["PDV"],
    description: "Recive a PDV",
    operationId: "recivePDV",
    parameters: [
      {
        name: "id", // name of the param
        in: "path", // location of the param
        required: true, // Mandatory param
        description: "PDV ID", // param description
      },
    ],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            properties: {
              paymentMethods: {
                type: "array",
                description: "Payment method",
                example: "[{Dinheiro: 3.00}, {Cartão: 2.00}]",
              },
              cashierID: {
                type: "string",
                description: "Cashier ID",
                example: "60a9f1b5b8f5a8a0f4e1f2f2",
              },
            },
          },
        },
      },
    },
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
    },
  },
};
