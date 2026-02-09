'use client';

import { cn } from '@/lib/utils';

interface StepperProps {
  currentStep: number;
  steps: { label: string }[];
}

export function Stepper({ currentStep, steps }: StepperProps) {
  return (
    <div className="flex items-center justify-center">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          <div
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-full',
              currentStep > index ? 'bg-green-500 text-white' : '',
              currentStep === index ? 'border-2 border-blue-500 bg-white' : ''
            )}
          >
            {currentStep > index ? (
              <span>&#10003;</span>
            ) : (
              <span
                className={cn(
                  currentStep === index ? 'text-blue-500' : 'text-gray-500'
                )}
              >
                {index + 1}
              </span>
            )}
          </div>
          <p
            className={cn(
              'ml-4 text-sm font-medium',
              currentStep === index ? 'text-blue-500' : 'text-gray-500'
            )}
          >
            {step.label}
          </p>
          {index < steps.length - 1 && (
            <div className="ml-4 h-0.5 w-16 bg-gray-300"></div>
          )}
        </div>
      ))}
    </div>
  );
}
