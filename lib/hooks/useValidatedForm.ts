import { useState } from 'react';
import { ZodSchema, z } from 'zod';
import { handleClientError } from '../utils/error-handling';

interface UseValidatedFormOptions<T> {
  schema: ZodSchema<T>;
  onSubmit: (data: T) => Promise<void>;
  onError?: (error: { message: string; errors?: Record<string, string[]> }) => void;
}

export function useValidatedForm<T extends Record<string, unknown>>({ 
  schema, 
  onSubmit, 
  onError 
}: UseValidatedFormOptions<T>) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const validateField = async (name: keyof T, value: unknown) => {
    try {
      // Create a partial object with just the field being validated
      const partialData = { [name]: value };
      await schema.parseAsync(partialData).catch(() => {
        throw new Error('Validation failed');
      });
      
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name as string];
        return newErrors;
      });
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(prev => ({
          ...prev,
          [name as string]: error.errors.map(err => err.message)
        }));
        return false;
      }
      return false;
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(event.currentTarget);
      const data = Object.fromEntries(formData.entries());
      
      // Handle file inputs
      const fileInputs = Array.from(
        event.currentTarget.querySelectorAll('input[type="file"]')
      ) as HTMLInputElement[];
      
      fileInputs.forEach(input => {
        if (input.files?.length) {
          data[input.name] = input.files[0];
        }
      });

      const validatedData = await schema.parseAsync(data);
      await onSubmit(validatedData as T);
      setErrors({});
    } catch (error) {
      const clientError = handleClientError(error);
      setErrors(clientError.errors || {});
      onError?.(clientError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    handleSubmit,
    validateField,
    errors,
    isSubmitting,
  };
}

// Example usage:
/*
const MyForm = () => {
  const { handleSubmit, validateField, errors, isSubmitting } = useValidatedForm({
    schema: contactFormSchema,
    onSubmit: async (data) => {
      await submitToApi(data);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        onChange={(e) => validateField('email', e.target.value)}
      />
      {errors.email && <span>{errors.email[0]}</span>}
      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
    </form>
  );
};
*/ 