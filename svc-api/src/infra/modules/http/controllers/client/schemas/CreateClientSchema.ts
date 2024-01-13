export const CreateClientSchema = {
  schema: {
    body: {
      type: 'object',
      properties: {
        name: { type: 'string' },
      },
      required: ['name'],
    },
  },
}
