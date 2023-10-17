// Error
export class Left<L> {
  readonly reason: any // Motivo do erro

  constructor(reason: any) {
    this.reason = reason
  }
}

// Success
export class Right<R> {
  readonly result: any // Resultado so sucesso

  constructor(result: any) {
    this.result = result
  }
}

export type Either<L, R> = Left<L> | Right<R>

export const left = <L, R>(reason: L): Either<L, R> => {
  return new Left(reason)
}

export const right = <L, R>(result: R): Either<L, R> => {
  return new Right(result)
}
