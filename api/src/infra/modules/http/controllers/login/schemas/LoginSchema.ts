export const LoginSchema = {
  schema: {
    body: {
      type: 'object',
      properties: {
        email: { type: 'string' },
        password: { type: 'string' },
      },
      required: ['email','password'],
    },
  },
}
