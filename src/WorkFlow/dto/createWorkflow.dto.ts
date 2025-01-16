import {
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { StepType } from 'src/types/step.enum';

const possiblesStepValues = Object.values(StepType).join(', ');

// Custom validator for array of arrays of StepType
@ValidatorConstraint({ name: 'isArrayOfEnumArrays', async: false })
export class IsArrayOfEnumArrays implements ValidatorConstraintInterface {
  validate(value: any): boolean {
    if (!Array.isArray(value)) return false;

    return value.every(
      (innerArray) =>
        Array.isArray(innerArray) &&
        innerArray.every((item) => Object.values(StepType).includes(item)),
    );
  }

  defaultMessage(): string {
    return `Each element must be an array of valid StepType values. Valid values are: [${possiblesStepValues}]`;
  }
}

export class CreateWorkflowDto {
  @ApiProperty({
    description: 'Array of arrays of StepType values',
    example: [['SEND_EMAIL', 'UPDATE_GRANT'], ['SEND_EMAIL']],
    isArray: true,
    type: String,
    enum: StepType,
  })
  @Validate(IsArrayOfEnumArrays, {
    message: `steps must be an array of arrays of StepType values. valid step are:[${possiblesStepValues}] for example [['SEND_EMAIL', 'UPDATE_GRANT'], ['SEND_EMAIL']]`,
  })
  workflow: StepType[][];
}
