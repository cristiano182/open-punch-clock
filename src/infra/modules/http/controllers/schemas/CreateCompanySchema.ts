export const CreateCompanySchema = {
   schema: {
     body: {
      type: 'object',
      properties: {
           name: {type: 'string'}
      },
      required: ['name']
     },
     querystring: {
      type: 'object',
      properties: {
        id: { type: 'string' },
      },
      required: []
    },
    headers: {
      type: 'object',
      properties: {
        'x-foo': { type: 'string' }
      },
      required: []
    },
    params: {},
   }
  }

  

