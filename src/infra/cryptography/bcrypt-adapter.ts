import bcrypt from 'bcrypt'
import { Hasher } from '../../data/protocols/cryptograthy/hashed'

export class BcryptAdapter implements Hasher {
  constructor (private readonly salt: number) {}
  async hash (value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt)
    return hash
  }
}
