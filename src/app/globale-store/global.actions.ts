

export enum GlobalActionsType {
  SET_PROGESS = "[global] set progress",
  CANCEL_PROGESS = "[global] cancel progress"
}

export class SetProgress {
  readonly type: string = GlobalActionsType.SET_PROGESS

  constructor() { }
}

export class CancelProgress {
  readonly type: string = GlobalActionsType.CANCEL_PROGESS

  constructor() { }
}

export type GlobalActions =
  SetProgress
  | CancelProgress
