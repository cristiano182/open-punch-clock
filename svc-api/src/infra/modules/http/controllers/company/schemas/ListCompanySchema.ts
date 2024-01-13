export const ListCompanySchema = {
  schema: {
    querystring: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        document: { type: 'string' },
        limit: { type: 'number' },
        skip: { type: 'number' },
      },
      required: [],
    },
    params: {},
  },
}
