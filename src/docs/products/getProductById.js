module.exports = {
  get: {
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: ["Produtos"], // operation's tag.
    description: "Pesquisar e Filtrar produtos", // operation's desc.
    operationId: "getProductsById", // unique operation id.
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
        description: "Retorna produtos pelo ID", // response desc.
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
  put: {
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: ["Produtos"], // operation's tag.
    description: "Pesquisar e Filtrar produtos", // operation's desc.
    operationId: "updateProductsById", // unique operation id.
    parameters: [
      {
        name: "id", // name of the param
        in: "path", // location of the param
        required: true, // Mandatory param
        schema: {
          type: "string",
        },
        description: "Editar produto pelo id", // param desc.
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
        description: "Retorna produto editado pelo ID", // response desc.
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

    tags: ["Produtos"], // operation's tag.
    description: "Excluir um produto", // operation's desc.
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
        description: "Retorna produtos pelo ID", // response desc.
        content: {
          // content-type
          "application/json": {},
        },
      },
    },
  },
};
