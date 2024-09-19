import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getHello(id: string, name: string): string {
    return `hellow ${id} ${name}`
  }
}
