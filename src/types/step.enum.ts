//steps options
//user can't add stepType that not exist.
export enum StepType {
  SEND_EMAIL = 'SEND_EMAIL',
  UPDATE_GRANT = 'UPDATE_GRANT',
  SEND_EMAIL_COMPANY = 'SEND_EMAIL_COMPANY',
  //created only for testing
  SEND_FAILED_EMAIL = 'SEND_FAILED_EMAIL',
  UPDATE_GRANT_FAILED = 'UPDATE_GRANT_FAILED',
}

//step status initial with Pending
export enum StepStatus {
  PENDING,
  IN_PROGRESS,
  SUCCESS,
  FAILED,
}

export type StepTypeArray = StepType[];
