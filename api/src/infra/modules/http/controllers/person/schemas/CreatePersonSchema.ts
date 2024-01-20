export const CreatePersonSchema = {
  schema: {
    body: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        email: { type: 'string' },
        document: { type: 'string' },
        phone: { type: 'string' },
        status: { type: 'boolean' },
        password: { type: 'string' },
      },
      required: ['name','email','document','phone','status','password'],
    },
  },
}
