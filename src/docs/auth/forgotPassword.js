module.exports = {
  post: {
    tags: ["Auth"], // operation's tag.
    description: "Esqueci minha senha", // operation's desc.
    operationId: "forgotPassword", // unique operation id.
    parameters: [
      // expected params.
      {
        name: "email", // name of the param
        in: "query", // location of the param
        required: true, // Mandatory param
        schema: {
          type: "string",
        },
        description: "Email do usuario", // param desc.
      },
    ],
    // expected responses
    responses: {
      // response code
      200: {
        description: "Email enviado com sucesso", // response desc.
        content: {
          // content-type
          "application/json": {
            schema: {
              text: "Email enviado com sucesso",
            },
          },
        },
      },
    },
  },
};
