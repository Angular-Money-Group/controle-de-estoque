module.exports = {
    post: {
        tags: ["Auth"],
        description: "Register",
        operationId: "register",
        requestBody: {
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/createUserRequest",
                    },
                },
            },
        },                
        responses: {
            200: {
                description: "Usuario Criado com sucesso!",
                schema: {
                    text: "Usuario Criado com sucesso!",
                },
            },
        },
    }
}