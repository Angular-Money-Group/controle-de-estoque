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
      parameters: [],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              properties: {
                day: {
                  type: "Date",
                  description: "Day to search",
                  example: "2021-05-01",
                },
              },
            }
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
  