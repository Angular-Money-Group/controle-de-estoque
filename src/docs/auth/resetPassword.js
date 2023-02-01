module.exports = {
    post: {
      tags: ["Auth"], // operation's tag.
      description: "Recuperar Senha", // operation's desc.
      operationId: "resetPassword", // unique operation id.
      parameters: [
        // expected params.
        {
            name: "userId", // name of the param
            in: "path", // location of the param
            required: true, // Mandatory param
            schema: {
                type: "string",
            },
            description: "Id do usuario", // param desc.
        },
        {
            name: "token", // name of the param
            in: "path", // location of the param
            required: true, // Mandatory param
            schema: {
                type: "string",
            },
            description: "Token do usuario", // param desc.
        },
        {
          name: "password", // name of the param
          in: "query", // location of the param
          required: true, // Mandatory param
          schema: {
            type: "string",
          },
          description: "Nova senha a cadastrar do usuario", // param desc.
        },
      ],
      // expected responses
      responses: {
        // response code
        200: {
          description: "Senha Alterada com sucesso", // response desc.
          content: {
            // content-type
            "application/json": {
              schema: {
                text: "Senha Alterada com sucesso",
              },
            },
          },
        },
      },
    },
  };
  