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
                    text: "Usuario logado com sucesso!",
                },
            },
        },
    }
}