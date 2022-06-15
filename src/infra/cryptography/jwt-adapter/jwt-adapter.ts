import jwt from 'jsonwebtoken'
import { Decrypter } from '../../../data/protocols/cryptograthy/decryper'
import { TokenGenerator } from '../../../data/protocols/cryptograthy/token-generator'

export class JwtAdapter implements TokenGenerator, Decrypter {
  private readonly secret: string
  constructor (secret: string) {
    this.secret = secret
  }

  async generate (id: string): Promise<string> {
    const accessToken = await jwt.sign({ id }, this.secret)
    return accessToken
  }

  async decrypt (value: string): Promise<string> {
    jwt.verify(value, this.secret)
    return null
  }
}
