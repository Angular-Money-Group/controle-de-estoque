module.exports = {
    post: {
        security: [
            {
               bearerAuth: []
            }
         ],
        tags: ["Caixas"], // operation's tag.
        description: "Remove dinheiro do caixa", // operation's desc.
        operationId: "removeCashier", // unique operation id.
        parameters: [
            // expected params.
            {
                name: "id", // name of the param
                in: "path", // location of the param
                required: true, // Mandatory param
                schema: {
                    type: "string",
                },
            },
        ],
        requestBody: {
            // expected request body
            content: {
                // content-type
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            totalCash: {
                                type: "number",
                                description: "Total de dinheiro no caixa",
                                example: 100.0,
                            },
                            
                    }
                    },
                },
            },
        },
        responses: {
            // response code
            200: {
                description: "Dinheiro removido com sucesso", // response desc.
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/genericResponse",
                        },
                    },
                },
            },
            // response code
            400: {
                description: "Erro ao remover dinheiro do caixa", // response desc.
                content: {
                    "application/json": {
                        schema: {
                            message: {
                                type: "string",
                                example: "Erro ao remover dinheiro do caixa",
                            },
                            err: {
                                type: "string",
                                example: "Error",
                            },
                        },
                    },
                },
            },
        },
    },
};
