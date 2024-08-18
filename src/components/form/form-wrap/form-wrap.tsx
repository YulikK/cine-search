import React, { ReactNode } from 'react';

interface FormWrapperProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
}

const FormWrapper: React.FC<FormWrapperProps> = ({ onSubmit, children }) => {
  return (
    <section className="flex-1 bg-background py-12 md:py-20">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-md space-y-6">
          <form
            className="rounded-lg border bg-card text-card-foreground shadow-sm"
            onSubmit={onSubmit}
          >
            {children}
          </form>
        </div>
      </div>
    </section>
  );
};

export default FormWrapper;
