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
      {
        name: "page", // name of the param
        in: "query", // location of the param
        required: false, // Mandatory param
        schema: {
          type: "number",
        },
        description: "Pagina a buscar", // param desc.
      },
      {
        name: "limit", // name of the param
        in: "query", // location of the param
        required: false, // Mandatory param
        schema: {
          type: "number",
        },
        description: "Limite de registros", // param desc.
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
    description: "Criar produtos", // operation's desc.
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
