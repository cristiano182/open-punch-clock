export const UpdateCompanySchema = {
  schema: {
    body: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        document: { type: 'string' },
      },
      required: [],
    },
    params: {
      id: { type: 'string' },
    },
  },
}
