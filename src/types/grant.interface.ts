export enum GrantStatus {
  SUCCESS,
  FAILED,
}

export interface Grant {
  status?: GrantStatus;
  optionsShared: number;
}
