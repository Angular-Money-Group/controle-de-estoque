module.exports = {
  put: {
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: ["Patrimônio"], // operation's tag.
    description: "Retornar Patrimônio", // operation's desc.
    operationId: "updatePatrimonyById", // unique operation id.
    parameters: [
      {
        name: "id", // name of the param
        in: "path", // location of the param
        required: true, // Mandatory param
        schema: {
          type: "string",
        },
      },
    ], // expected params.
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/updateProductRequest", // id model
          },
        },
      },
    },    
    // expected responses
    responses: {
      // response code
      200: {
        description: "Retorna Patrimônio editado pelo ID", // response desc.
        content: {
          // content-type
          "application/json": {
            schema: {
              $ref: "#/components/schemas/ResponseProducts", // id model
            },
          },
        },
      },
    },
  },

  delete: {
    security: [
      {
        bearerAuth: [],
      },
    ],

    tags: ["Patrimônio"], // operation's tag.
    description: "Excluir um patrimônio", // operation's desc.
    operationId: "deleteProductsById", // unique operation id.
    parameters: [
      {
        name: "id", // name of the param
        in: "path", // location of the param
        required: true, // Mandatory param
        schema: {
          type: "string",
        },
        description: "Buscar produto pelo id", // param desc.
      },
    ], // expected params.
    // expected responses
    responses: {
      // response code
      200: {
        description: "Exclui Patrimônio pelo ID", // response desc.
        content: {
          // content-type
          "application/json": {},
        },
      },
    },
  },
};
