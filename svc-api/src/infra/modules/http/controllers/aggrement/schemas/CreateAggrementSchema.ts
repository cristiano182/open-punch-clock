export const CreateAggrementSchema = {
  schema: {
    body: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        client: { type: 'string' },
      },
      required: ['name', 'client'],
    },
  },
}
