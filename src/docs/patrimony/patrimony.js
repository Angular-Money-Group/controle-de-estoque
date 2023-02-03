module.exports = {
  get: {
    security: [
        {
           bearerAuth: []
        }
     ],
    tags: ["Patrimonio"], // operation's tag.
    description: "Pesquisar e Filtrar Patrimonio", // operation's desc.
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
        description: "Retorna Patrimonio", // response desc.
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
    tags: ["Patrimonio"], // operation's tag.
    description: "Criar Patrimonio", // operation's desc.
    operationId: "createProduct", // unique operation id.
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/createProductRequest", // id model
          },
        },
      },
    },
    // expected responses
    responses: {
      // response code
      200: {
        description: "Cria novos Patrimonio", // response desc.
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
