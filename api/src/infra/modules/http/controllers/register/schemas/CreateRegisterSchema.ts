export const CreateRegisterSchema = {
  schema: {
    body: {
      type: 'object',
      properties: {
        job: { type: 'string' },
        person: { type: 'string' },
        start: { type: 'string' },
        end: { type: 'string' },
      },
      required: ['job', 'person'],
    },
  },
}
