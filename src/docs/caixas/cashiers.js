module.exports = {
    get:{
        security: [
            {
               bearerAuth: []
            }
         ],
        tags: ["Caixas"],
        description: "Retorna todos os caixas",
        operationId: "getCashiers",
        parameters: [],
        responses: {
            200: {
                description: "Caixas encontrados",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/genericResponse",
                        },
                    },
                },
            },
        },
    },
}