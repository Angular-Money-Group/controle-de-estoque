module.exports = {
  get: {
    security: [
        {
           bearerAuth: []
        }
     ],
    tags: ["Patrimônio"], // operation's tag.
    description: "Pesquisar e Filtrar Patrimônio", // operation's desc.
    operationId: "getProducts", // unique operation id.
    parameters: [
      {
        name: "filter", // name of the param
        in: "query", // location of the param 
        required: false, // Mandatory param
        schema: {
          type: "string",
        },
        description: "Buscar nome do Patrimônio", // param desc.
      },
    ], // expected params.
    // expected responses
    responses: {
      // response code
      200: {
        description: "Retorna Patrimônio", // response desc.
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
    tags: ["Patrimônio"], // operation's tag.
    description: "Criar Patrimônio", // operation's desc.
    operationId: "createProduct", // unique operation id.
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/createPatrimonyRequest", // id model
          },
        },
      },
    },
    // expected responses
    responses: {
      // response code
      200: {
        description: "Cria novos Patrimônio", // response desc.
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
