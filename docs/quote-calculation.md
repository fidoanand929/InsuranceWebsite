# Quote Calculation Documentation

## Overview
This document outlines the loan calculation process used in the vehicle finance application. The calculations are based on industry-standard formulas and take into account various factors such as credit score, loan term, and down payment.

## Loan Amount Calculation

### Basic Formula
```typescript
const loanAmount = vehicleCost - downPayment;
```

### Example
```typescript
const vehicleCost = 1000000; // ₹10,00,000
const downPayment = 200000;  // ₹2,00,000
const loanAmount = 800000;   // ₹8,00,000
```

## Interest Rate Determination

### Car Loans
```typescript
const determineCarInterestRate = (creditScore: number): number => {
  if (creditScore > 750) return 7.0;
  if (creditScore > 700) return 8.5;
  if (creditScore > 650) return 10.0;
  if (creditScore > 600) return 12.0;
  return 14.0;
};
```

### Truck Loans
```typescript
const determineTruckInterestRate = (creditScore: number): number => {
  if (creditScore > 750) return 8.0;
  if (creditScore > 700) return 9.0;
  if (creditScore > 650) return 10.0;
  return 12.0;
};
```

## EMI (Monthly Payment) Calculation

### Formula
The monthly EMI is calculated using the following formula:

\[
EMI = P \times \frac{r(1+r)^n}{(1+r)^n-1}
\]

Where:
- P = Principal (Loan Amount)
- r = Monthly Interest Rate (Annual Rate ÷ 12 ÷ 100)
- n = Total Number of Months

### Implementation
```typescript
const calculateEMI = (
  loanAmount: number,
  annualInterestRate: number,
  loanTermMonths: number
): number => {
  const monthlyInterestRate = annualInterestRate / 12 / 100;
  const emi = (loanAmount * monthlyInterestRate * 
    Math.pow(1 + monthlyInterestRate, loanTermMonths)) / 
    (Math.pow(1 + monthlyInterestRate, loanTermMonths) - 1);
  
  return Math.round(emi);
};
```

### Example
```typescript
const example = {
  loanAmount: 800000,        // ₹8,00,000
  annualInterestRate: 8.5,   // 8.5%
  loanTermMonths: 60,        // 5 years
  monthlyPayment: 16459      // ₹16,459
};
```

## Eligibility Checks

### Car Loan Eligibility
```typescript
const checkCarLoanEligibility = (
  creditScore: number,
  monthlyIncome: number,
  vehicleCost: number,
  downPayment: number
): boolean => {
  // Minimum requirements
  if (creditScore < 550) return false;
  if (monthlyIncome < 25000) return false;
  if (downPayment < vehicleCost * 0.10) return false;

  // Maximum loan amount based on income
  const maxLoanAmount = monthlyIncome * 36;
  if ((vehicleCost - downPayment) > maxLoanAmount) return false;

  return true;
};
```

### Truck Loan Eligibility
```typescript
const checkTruckLoanEligibility = (
  creditScore: number,
  monthlyRevenue: number,
  businessAge: number,
  vehicleCost: number,
  downPayment: number
): boolean => {
  // Minimum requirements
  if (creditScore < 600) return false;
  if (monthlyRevenue < 100000) return false;
  if (businessAge < 2) return false;
  if (downPayment < vehicleCost * 0.15) return false;

  // Maximum loan amount based on revenue
  const maxLoanAmount = monthlyRevenue * 48;
  if ((vehicleCost - downPayment) > maxLoanAmount) return false;

  return true;
};
```

## Total Cost Calculation

### Components
1. Principal Amount (Loan Amount)
2. Total Interest
3. Processing Fee (if applicable)
4. Insurance (if applicable)

### Implementation
```typescript
interface LoanCosts {
  principal: number;
  totalInterest: number;
  processingFee: number;
  insurance: number;
  totalCost: number;
}

const calculateTotalCost = (
  loanAmount: number,
  annualInterestRate: number,
  loanTermMonths: number,
  processingFeePercent: number = 1,
  includeInsurance: boolean = true
): LoanCosts => {
  // Calculate monthly payment
  const monthlyPayment = calculateEMI(loanAmount, annualInterestRate, loanTermMonths);
  
  // Calculate total interest
  const totalPayment = monthlyPayment * loanTermMonths;
  const totalInterest = totalPayment - loanAmount;
  
  // Calculate processing fee
  const processingFee = (loanAmount * processingFeePercent) / 100;
  
  // Calculate insurance (example: 3% of vehicle cost)
  const insurance = includeInsurance ? (loanAmount * 0.03) : 0;
  
  // Calculate total cost
  const totalCost = loanAmount + totalInterest + processingFee + insurance;
  
  return {
    principal: loanAmount,
    totalInterest,
    processingFee,
    insurance,
    totalCost
  };
};
```

## Amortization Schedule

### Schedule Generation
```typescript
interface AmortizationEntry {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

const generateAmortizationSchedule = (
  loanAmount: number,
  annualInterestRate: number,
  loanTermMonths: number
): AmortizationEntry[] => {
  const monthlyInterestRate = annualInterestRate / 12 / 100;
  const monthlyPayment = calculateEMI(loanAmount, annualInterestRate, loanTermMonths);
  const schedule: AmortizationEntry[] = [];
  
  let remainingBalance = loanAmount;
  
  for (let month = 1; month <= loanTermMonths; month++) {
    const interest = remainingBalance * monthlyInterestRate;
    const principal = monthlyPayment - interest;
    remainingBalance -= principal;
    
    schedule.push({
      month,
      payment: monthlyPayment,
      principal,
      interest,
      remainingBalance
    });
  }
  
  return schedule;
};
```

## Best Practices

1. **Precision Handling**
   - Use appropriate decimal precision for calculations
   - Round final results to nearest rupee
   - Handle floating-point arithmetic carefully

2. **Error Handling**
   - Validate all input parameters
   - Handle edge cases (zero values, negative numbers)
   - Provide meaningful error messages

3. **Performance**
   - Cache calculation results when possible
   - Use efficient mathematical operations
   - Optimize loops and iterations

4. **Maintainability**
   - Document all formulas and assumptions
   - Use clear variable names
   - Separate business logic from UI code

5. **Testing**
   - Unit test all calculation functions
   - Test edge cases and boundary conditions
   - Verify results against known examples 