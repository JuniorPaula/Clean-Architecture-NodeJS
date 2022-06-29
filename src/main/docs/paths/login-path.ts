export const loginPath = {
  post: {
    tags: ['Login'],
    summary: 'API para autenticar o usuário',
    requestBody: {
      content: {
        'applicatio/json': {
          schema: {
            $ref: '#/schemas/login'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'applicatio/json': {
            schema: {
              $ref: '#/schemas/account'
            }
          }
        }
      },
      400: {
        $ref: '#components/badRequest'
      },
      401: {
        $ref: '#components/unauthorizedError'
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
