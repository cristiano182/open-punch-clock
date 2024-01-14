export const ListJobSchema = {
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
