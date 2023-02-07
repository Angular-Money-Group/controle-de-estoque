module.exports = {
    post: {
        tags: ["Auth"],
        description: "refreshToken",
        operationId: "refreshToken",
        requestBody: {
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/refreshTokenRequest",
                    },
                },
            },
        },
        responses: {
            200: {
                description: "Return accessToken!",
                schema: {
                    $ref: "#/components/schemas/refreshTokenResponse",
                },
            },
            401: {
                description: "Invalid refresh token",
                schema: {
                    $ref: "#/components/schemas/genericError",
                },
            }
        },
    }
}