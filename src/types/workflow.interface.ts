import { StepStatus, StepType } from './step.enum';

export interface WorkflowStep {
  status: StepStatus;
  stepType: StepType;
  execute: () => Promise<void>; // Logic to execute the step
}

export interface Workflow {
  id: string;
  steps: WorkflowStep[];
}
