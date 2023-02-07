module.exports = {
  post: {
    tags: ["Auth"],
    description: "Login",
    operationId: "login",
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/loginRequest",
          },
        },
      },
    },
    responses: {
      200: {
        description: "Usuario logado com sucesso!",
        schema: {
          $ref: "#/components/schemas/authLoginResponse",
        },
      },
      400: {
        description: "Usuario não encontrado",
        schema: {
            $ref: "#/components/schemas/genericError",
        },
      },
      422: {
        description: "Campo invalida",
        schema: {
            $ref: "#/components/schemas/genericError",
        },
      }
    },
  },
};
