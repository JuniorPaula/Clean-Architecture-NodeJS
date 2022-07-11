import { AuthenticationParams } from '@/domain/models/authentication'

export type AuthenticationModel = {
  email: string
  password: string
}

export interface Authentication {
  auth: (authentication: AuthenticationModel) => Promise<AuthenticationParams>
}
