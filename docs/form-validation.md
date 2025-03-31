# Form Validation Documentation

## Overview
This document outlines the form validation rules and error handling mechanisms implemented in the vehicle finance application. The validation occurs at multiple levels to ensure data integrity and provide a smooth user experience.

## Client-Side Validation

### HTML5 Validation Attributes
```typescript
// Example of HTML5 validation attributes
<input
  type="number"
  name="creditScore"
  required
  min="300"
  max="900"
/>

<input
  type="email"
  name="email"
  required
/>

<input
  type="tel"
  name="contactNumber"
  required
/>
```

### Input Field Validation Rules

#### Personal Information
1. **Full Name**
   - Required field
   - Must contain only letters and spaces
   - Maximum length: 100 characters

2. **Contact Number**
   - Required field
   - Must be a valid Indian phone number
   - Format: +91 followed by 10 digits
   - Regular expression: `^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$`

3. **Email**
   - Required field
   - Must be a valid email format
   - Maximum length: 255 characters
   - Regular expression: `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`

#### Vehicle Details
1. **Vehicle Cost**
   - Required field
   - Must be a positive number
   - Car: Minimum ₹100,000
   - Truck: Minimum ₹500,000
   - Maximum: ₹50,000,000

2. **Down Payment**
   - Required field
   - Must be a positive number
   - Car: Minimum 10% of vehicle cost
   - Truck: Minimum 15% of vehicle cost
   - Maximum: Vehicle cost

3. **Loan Term**
   - Required field
   - Must be one of: 36, 48, 60, 72, or 84 months

#### Financial Information
1. **Monthly Income/Revenue**
   - Required field
   - Must be a positive number
   - Car: Minimum ₹25,000
   - Truck: Minimum ₹100,000

2. **Credit Score**
   - Required field
   - Must be between 300 and 900
   - Integer values only

3. **Business Age** (Truck Finance)
   - Required field
   - Must be a positive number
   - Minimum: 2 years

## Error Messages

### Generic Error Messages
```typescript
const errorMessages = {
  required: 'This field is required',
  invalidFormat: 'Please enter a valid format',
  minValue: 'Value must be greater than {min}',
  maxValue: 'Value must be less than {max}',
  invalidEmail: 'Please enter a valid email address',
  invalidPhone: 'Please enter a valid Indian phone number',
  invalidCreditScore: 'Credit score must be between 300 and 900',
  insufficientDownPayment: 'Down payment must be at least {percent}% of vehicle cost'
};
```

### Field-Specific Error Messages
```typescript
const fieldErrors = {
  vehicleCost: {
    car: 'Vehicle cost must be at least ₹100,000',
    truck: 'Vehicle cost must be at least ₹500,000'
  },
  monthlyIncome: {
    car: 'Monthly income must be at least ₹25,000',
    truck: 'Monthly revenue must be at least ₹100,000'
  },
  businessAge: {
    minimum: 'Business must be at least 2 years old'
  }
};
```

## Validation Functions

### Example Validation Implementation
```typescript
interface ValidationResult {
  isValid: boolean;
  error?: string;
}

// Credit Score Validation
const validateCreditScore = (score: number): ValidationResult => {
  if (!score) {
    return { isValid: false, error: errorMessages.required };
  }
  if (score < 300 || score > 900) {
    return { isValid: false, error: errorMessages.invalidCreditScore };
  }
  return { isValid: true };
};

// Down Payment Validation
const validateDownPayment = (
  downPayment: number,
  vehicleCost: number,
  vehicleType: 'car' | 'truck'
): ValidationResult => {
  const minPercentage = vehicleType === 'car' ? 10 : 15;
  const minAmount = (vehicleCost * minPercentage) / 100;

  if (!downPayment) {
    return { isValid: false, error: errorMessages.required };
  }
  if (downPayment < minAmount) {
    return {
      isValid: false,
      error: errorMessages.insufficientDownPayment.replace('{percent}', minPercentage.toString())
    };
  }
  if (downPayment > vehicleCost) {
    return { isValid: false, error: 'Down payment cannot exceed vehicle cost' };
  }
  return { isValid: true };
};
```

## Form State Management

### Form Data Interface
```typescript
interface FormData {
  customerName: string;
  contactNumber: string;
  email: string;
  vehicleCost: string;
  downPayment: string;
  loanTerm: string;
  monthlyIncome: string;
  creditScore: string;
  // Additional fields for truck finance
  businessName?: string;
  vehicleType?: string;
  monthlyRevenue?: string;
  businessAge?: string;
}
```

### Form Error State Interface
```typescript
interface FormErrors {
  [key: string]: string;
}
```

## Error Handling

### Client-Side Error Handling
```typescript
const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
  
  // Clear error when user starts typing
  if (errors[name]) {
    setErrors(prev => ({ ...prev, [name]: '' }));
  }
};

const validateForm = (): boolean => {
  const newErrors: FormErrors = {};
  
  // Validate each field
  Object.keys(formData).forEach(key => {
    const validationResult = validateField(key, formData[key]);
    if (!validationResult.isValid) {
      newErrors[key] = validationResult.error!;
    }
  });
  
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
```

### Server-Side Error Handling
```typescript
try {
  const { data, error } = await supabase
    .from('car_quotes')
    .insert([quote])
    .select()
    .single();

  if (error) {
    console.error('Database error:', error);
    throw new Error(error.message);
  }

  return data;
} catch (error) {
  console.error('Application error:', error);
  throw error;
}
```

## Best Practices

1. **Progressive Validation**
   - Validate on blur for better user experience
   - Show errors only after user interaction
   - Clear errors when user starts fixing them

2. **Accessibility**
   - Use ARIA attributes for error messages
   - Provide clear feedback for screen readers
   - Maintain proper focus management

3. **Performance**
   - Debounce validation for performance
   - Validate only changed fields when possible
   - Cache validation results when appropriate

4. **Security**
   - Never trust client-side validation alone
   - Always validate on the server side
   - Sanitize all input data

5. **User Experience**
   - Show inline validation feedback
   - Provide clear error messages
   - Guide users to fix errors
   - Allow form submission only when all validations pass 