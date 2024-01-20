export const CreateJobSchema = {
  schema: {
    body: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        durationMinutes: { type: 'number' },
        service: { type: 'string' },
      },
      required: ['name', 'durationMinutes', 'service'],
    },
  },
}
