module.exports = {
  get: {
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: ["Home"],
    description: "Get Home Info",
    operationId: "getHomeInfo",
    parameters: [
      {
        name: "startDate",
        in: "query",
        description: "Start Date",
        required: true,
        type: "string",
        format: "date",
      },
      {
        name: "endDate",
        in: "query",
        description: "End Date",
        required: true,
        type: "string",
        format: "date",
      },
    ],
    responses: {
      200: {
        description: "Home Info",
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
