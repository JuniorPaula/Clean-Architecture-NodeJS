export const surveyPath = {
  get: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Enquete'],
    summary: 'API para listar todas as enquetes',
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/surveys'
            }
          }
        }
      },
      403: {
        $ref: '#components/forbiddenError'
      },
      404: {
        $ref: '#components/notFoundError'
      },
      500: {
        $ref: '#components/serverError'
      }
    }
  }
}
