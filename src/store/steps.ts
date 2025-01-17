import { StepStatus, StepType } from "src/types/step.enum";
import { WorkflowStep } from "src/types/workflow.interface";
import { grant } from "./grant";

export const steps: Record<StepType, WorkflowStep> = {
  [StepType.SEND_EMAIL]: {
    status: StepStatus.PENDING,
    stepType: StepType.SEND_EMAIL,
    execute: async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate delay
      console.log(`Email sent`);
    },
  },
  [StepType.SEND_FAILED_EMAIL]: {
    status: StepStatus.PENDING,
    stepType: StepType.SEND_FAILED_EMAIL,
    execute: async () => {
      await new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Email service unavailable")), 1000)
      ); // Simulate failure
    },
  },
  [StepType.SEND_EMAIL_COMPANY]: {
    status: StepStatus.PENDING,
    stepType: StepType.SEND_EMAIL_COMPANY,
    execute: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay
      console.log(`Email sent company`);
    },
  },
  [StepType.UPDATE_GRANT]: {
    status: StepStatus.PENDING,
    stepType: StepType.UPDATE_GRANT,
    execute: async () => {
      await new Promise((resolve) =>
        setTimeout(() => resolve(grant.optionsShared++), 2500)
      ); // Simulate delay

      console.log(`Grant updated`);
      console.log(`currently grand shared ${grant.optionsShared} options`);

    },
  },
  [StepType.UPDATE_GRANT_FAILED]: {
    status: StepStatus.PENDING,
    stepType: StepType.UPDATE_GRANT_FAILED,
    execute: async () => {
      await new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Update Grant failed")), 2000)
      ); // Simulate failure
    },
  },
};
