module.exports = {
  post: {
    tags: ["PDV"],
    description: "Create a new PDV",
    operationId: "createPDV",
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/createPDVRequest",
          },
        },
      },
    },
    responses: {
      200: {
        description: "PDV created",
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
};
