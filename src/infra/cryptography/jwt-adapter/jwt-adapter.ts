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

  async decrypt (token: string): Promise<string> {
    const value: any = jwt.verify(token, this.secret)
    return value
  }
}
