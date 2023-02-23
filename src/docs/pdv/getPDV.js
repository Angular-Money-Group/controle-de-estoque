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
      requestBody: {
        content: {
          "application/json": {
            day: {
                type: "string",
                description: "Day to get PDV",
                example: "2021-05-01",
            },
          },
        },
      },
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
  