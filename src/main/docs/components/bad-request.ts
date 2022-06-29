export const badRequest = {
  description: 'Requisição inválida',
  content: {
    'applicatio/json': {
      schema: {
        $ref: '#/schemas/error'
      }
    }
  }
}
