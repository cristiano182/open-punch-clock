export const ListAggrementSchema = {
  schema: {
    querystring: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        limit: { type: 'number' },
        skip: { type: 'number' },
      },
      required: [],
    },
  },
}
