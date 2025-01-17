import { Injectable } from '@nestjs/common';
import { CreateWorkflowDto } from './dto/createWorkflow.dto';
import { WorkflowStep } from 'src/types/workflow.interface';
import { StepStatus, StepType } from 'src/types/step.enum';
import { steps } from 'src/store/steps';

@Injectable()
export class WorkflowService {
  async runWorkflow(createWorkflow: CreateWorkflowDto): Promise<void> {
    const { workflow } = createWorkflow;
    for (const stepTypes of workflow) {
      const currentSteps = this.createMultipleSteps(stepTypes);
      await this.runStep(currentSteps);
    }
  }

  createMultipleSteps(stepTypes: StepType[]): WorkflowStep[] {
    return stepTypes.map((stepType) => this.getStep(stepType));
  }

  getStep(stepId: StepType): WorkflowStep {
    return steps[stepId];
  }

  async runStep(pendingSteps: WorkflowStep[]) {
    try {
      const stepPromises = pendingSteps.map(async (step) => {
        console.log(`Starting step: ${step.stepType}`);
        step.status = StepStatus.IN_PROGRESS;

        await step.execute();

        step.status = StepStatus.SUCCESS;
        console.log(`Step ${step.stepType} completed successfully.`);
      });

      await Promise.all(stepPromises);
    } catch (error) {
      console.error(`Step failed: ${error.message}`);
      throw new Error(`reason: ${error.message}`);
    }
  }
}
