module.exports = {
  get: {
    security: [
        {
           bearerAuth: []
        }
     ],
    tags: ["Produtos"], // operation's tag.
    description: "Pesquisar e Filtrar produtos", // operation's desc.
    operationId: "getProducts", // unique operation id.
    parameters: [
      {
        name: "filter", // name of the param
        in: "query", // location of the param
        required: false, // Mandatory param
        schema: {
          type: "string",
        },
        description: "Buscar nome ou codigo de barras do produto", // param desc.
      },
    ], // expected params.
    // expected responses
    responses: {
      // response code
      200: {
        description: "Retorna produtos", // response desc.
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
  post: {
    security: [
        {
           bearerAuth: []
        }
     ],
    tags: ["Produtos"], // operation's tag.
    description: "Pesquisar e Filtrar produtos", // operation's desc.
    operationId: "createProduct", // unique operation id.
    parameters: [
      {
        name: "id", // name of the param
        in: "body", // location of the param
        required: true, // Mandatory param
        schema: {
          $ref: "#/components/schemas/createProductRequest",
        },
        description: "Buscar produto pelo id", // param desc.
      },
    ], // expected params.
    // expected responses
    responses: {
      // response code
      200: {
        description: "Cria novos produtos", // response desc.
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
};
