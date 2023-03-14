module.exports = {
    get: {
        security: [
            {
               bearerAuth: []
            }
         ],
        tags: ["Caixas"], // operation's tag.
        description: "Coleta dados do Caixa", // operation's desc.
        operationId: "getDataCaixa", // unique operation id.
        parameters: [
            // expected params.
            {
                name: "id", // name of the param
                in: "query", // location of the param
                required: true, // Mandatory param
                schema: {
                    type: "string",
                },
            },
        ],
        responses: {
            // response code
            200: {
                description: "Dados Recebidos com sucesso", // response desc.
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
                description: "Erro ao abrir caixa", // response desc.
                content: {
                    "application/json": {
                        schema: {
                            message: {
                                type: "string",
                                example: "Erro ao abrir caixa",
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
}