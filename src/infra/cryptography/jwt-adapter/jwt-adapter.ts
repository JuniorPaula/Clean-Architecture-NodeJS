import jwt from 'jsonwebtoken'
import { TokenGenerator } from '../../../data/protocols/cryptograthy/token-generator'

export class JwtAdapter implements TokenGenerator {
  private readonly secret: string
  constructor (secret: string) {
    this.secret = secret
  }

  async generate (id: string): Promise<string> {
    await jwt.sign({ id }, this.secret)
    return null
  }
}
