module.exports = {
    get: {
      security: [
        {
           bearerAuth: []
        }
     ],
      tags: ["PDV"],
      description: "Get a PDV by day",
      operationId: "getByDayPDV",
      parameters: [
        {
          name: "day",
          in: "query",
          required: true,
          description: "Day to search",
        },
      ],
      responses: {
        200: {
          description: "PDV found",
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
  