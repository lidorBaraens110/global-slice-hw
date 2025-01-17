import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { WorkflowService } from './workflow.service';
import { CreateWorkflowDto } from './dto/createWorkflow.dto';
import { ApiBody, ApiOperation } from '@nestjs/swagger';

@Controller('workflow')
export class WorkflowController {
  constructor(private readonly workflowService: WorkflowService) {}

  @Post('run')
  @ApiOperation({ summary: 'Run a workflow with multiple steps' })
  @ApiBody({ type: CreateWorkflowDto })
  async runWorkflow(@Body() createWorkflow: CreateWorkflowDto) {
    try {
      await this.workflowService.runWorkflow(createWorkflow);
      return { message: 'Workflow executed successfully!' };
    } catch (error) {
      console.error('Error in workflow execution:', error.message);
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `Workflow failed. ${error.message}`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
