'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import '@fontsource/poppins';
import '@fontsource/inter';

interface FormData {
  customerName: string;
  contactNumber: string;
  email: string;
  carModel: string;
  carMake: string;
  carYear: string;
  vehicleCost: string;
  downPayment: string;
  loanTerm: string;
  monthlyIncome: string;
  employmentType: string;
  creditScore: string;
}

export default function CarFinanceQuote() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    customerName: '',
    contactNumber: '',
    email: '',
    carModel: '',
    carMake: '',
    carYear: new Date().getFullYear().toString(),
    vehicleCost: '',
    downPayment: '',
    loanTerm: '60',
    monthlyIncome: '',
    employmentType: 'salaried',
    creditScore: ''
  });
  const [quoteResult, setQuoteResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const checkEligibility = () => {
    const creditScore = parseInt(formData.creditScore);
    const monthlyIncome = parseInt(formData.monthlyIncome);
    const vehicleCost = parseInt(formData.vehicleCost);
    const downPayment = parseInt(formData.downPayment);

    // Basic eligibility criteria for car loans
    if (creditScore < 550) return false;
    if (monthlyIncome < 25000) return false;
    if (downPayment < vehicleCost * 0.10) return false; // 10% minimum down payment

    return true;
  };

  const generateQuote = async () => {
    setIsLoading(true);
    const isEligible = checkEligibility();

    if (!isEligible) {
      setQuoteResult({
        status: 'rejected',
        message: 'We apologize, but based on the provided information, we cannot offer financing at this time.'
      });
      setIsLoading(false);
      return;
    }

    const vehicleCost = parseInt(formData.vehicleCost);
    const downPayment = parseInt(formData.downPayment);
    const loanTerm = parseInt(formData.loanTerm);
    const creditScore = parseInt(formData.creditScore);

    // Calculate interest rate based on credit score
    let interestRate = 14; // Base rate
    if (creditScore > 750) interestRate = 7;
    else if (creditScore > 700) interestRate = 8.5;
    else if (creditScore > 650) interestRate = 10;
    else if (creditScore > 600) interestRate = 12;

    const loanAmount = vehicleCost - downPayment;
    const monthlyInterest = interestRate / 12 / 100;
    const monthlyPayment = (loanAmount * monthlyInterest * Math.pow(1 + monthlyInterest, loanTerm)) / 
      (Math.pow(1 + monthlyInterest, loanTerm) - 1);

    const quote = {
      customer_name: formData.customerName,
      contact_number: formData.contactNumber,
      email: formData.email,
      car_make: formData.carMake,
      car_model: formData.carModel,
      car_year: parseInt(formData.carYear),
      vehicle_cost: vehicleCost,
      down_payment: downPayment,
      loan_term: loanTerm,
      monthly_income: parseInt(formData.monthlyIncome),
      employment_type: formData.employmentType,
      credit_score: creditScore,
      quote_amount: loanAmount,
      interest_rate: interestRate,
      monthly_payment: Math.round(monthlyPayment),
      status: 'approved'
    };

    try {
      console.log('Attempting to insert car quote:', quote);
      const { data, error } = await supabase
        .from('car_quotes')
        .insert([quote])
        .select()
        .single();

      if (error) {
        console.error('Supabase error details:', {
          code: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint
        });
        setQuoteResult({
          status: 'error',
          message: `Database error: ${error.message}. Please try again or contact support if the issue persists.`
        });
        return;
      }

      console.log('Successfully inserted car quote:', data);
      setQuoteResult({
        status: 'approved',
        ...data
      });
    } catch (error) {
      console.error('Application error:', error);
      setQuoteResult({
        status: 'error',
        message: 'An unexpected error occurred. Please try again or contact support.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      await generateQuote();
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  const renderFormStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  className="form-input bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                  required
                />
              </div>
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Contact Number</label>
                <input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  className="form-input bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                  required
                />
              </div>
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                  required
                />
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Car Make</label>
                <input
                  type="text"
                  name="carMake"
                  value={formData.carMake}
                  onChange={handleInputChange}
                  className="form-input bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                  required
                  placeholder="e.g., Honda, Toyota"
                />
              </div>
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Car Model</label>
                <input
                  type="text"
                  name="carModel"
                  value={formData.carModel}
                  onChange={handleInputChange}
                  className="form-input bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                  required
                  placeholder="e.g., Civic, Camry"
                />
              </div>
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Manufacturing Year</label>
                <input
                  type="number"
                  name="carYear"
                  value={formData.carYear}
                  onChange={handleInputChange}
                  className="form-input bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                  required
                  min="2000"
                  max={new Date().getFullYear()}
                />
              </div>
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Vehicle Cost (₹)</label>
                <input
                  type="number"
                  name="vehicleCost"
                  value={formData.vehicleCost}
                  onChange={handleInputChange}
                  className="form-input bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                  required
                  min="100000"
                />
              </div>
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Down Payment (₹)</label>
                <input
                  type="number"
                  name="downPayment"
                  value={formData.downPayment}
                  onChange={handleInputChange}
                  className="form-input bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                  required
                />
              </div>
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Loan Term (months)</label>
                <select
                  name="loanTerm"
                  value={formData.loanTerm}
                  onChange={handleInputChange}
                  className="form-select bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                  required
                >
                  <option value="36">36 months (3 years)</option>
                  <option value="48">48 months (4 years)</option>
                  <option value="60">60 months (5 years)</option>
                  <option value="72">72 months (6 years)</option>
                  <option value="84">84 months (7 years)</option>
                </select>
              </div>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Monthly Income (₹)</label>
                <input
                  type="number"
                  name="monthlyIncome"
                  value={formData.monthlyIncome}
                  onChange={handleInputChange}
                  className="form-input bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                  required
                  min="25000"
                />
              </div>
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Employment Type</label>
                <select
                  name="employmentType"
                  value={formData.employmentType}
                  onChange={handleInputChange}
                  className="form-select bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                  required
                >
                  <option value="salaried">Salaried</option>
                  <option value="self-employed">Self Employed</option>
                  <option value="business">Business Owner</option>
                </select>
              </div>
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Credit Score</label>
                <input
                  type="number"
                  name="creditScore"
                  value={formData.creditScore}
                  onChange={handleInputChange}
                  className="form-input bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                  required
                  min="300"
                  max="900"
                />
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  if (quoteResult) {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {quoteResult.status === 'approved' ? (
                <>
                  <div className="text-center mb-8">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                      <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Congratulations!</h2>
                    <p className="text-lg text-gray-600">Your car loan application has been pre-approved.</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 mb-8">
                    <h3 className="text-xl font-semibold mb-4">Loan Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Loan Amount</p>
                        <p className="text-lg font-semibold">{formatCurrency(quoteResult.quote_amount)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Monthly Payment</p>
                        <p className="text-lg font-semibold">{formatCurrency(quoteResult.monthly_payment)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Interest Rate</p>
                        <p className="text-lg font-semibold">{quoteResult.interest_rate}% p.a.</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Loan Term</p>
                        <p className="text-lg font-semibold">{quoteResult.loan_term} months</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-600 mb-4">
                      Our team will contact you shortly at {quoteResult.contact_number} to proceed with your application.
                    </p>
                    <Link
                      href="/car-finance"
                      className="inline-flex items-center text-blue-600 hover:text-blue-500"
                    >
                      ← Back to Car Finance
                    </Link>
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                    <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Status</h2>
                  <p className="text-gray-600 mb-6">{quoteResult.message}</p>
                  <Link
                    href="/car-finance"
                    className="inline-flex items-center text-blue-600 hover:text-blue-500"
                  >
                    ← Back to Car Finance
                  </Link>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl mb-4 font-['Poppins']">
            Car Loan Application
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Get instant approval for your dream car
          </p>
        </motion.div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <div className="mb-8">
            <div className="flex items-center justify-between relative">
              {[1, 2, 3].map((stepNumber) => (
                <div
                  key={stepNumber}
                  className={`flex items-center ${stepNumber < 3 ? 'flex-1' : ''}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-semibold
                      ${step === stepNumber
                        ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                        : step > stepNumber
                          ? 'border-green-500 bg-green-500 text-white'
                          : 'border-gray-300 text-gray-300 dark:border-gray-600 dark:text-gray-600'
                      }`}
                  >
                    {step > stepNumber ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      stepNumber
                    )}
                  </div>
                  {stepNumber < 3 && (
                    <div
                      className={`flex-1 h-0.5 mx-4 ${
                        step > stepNumber 
                          ? 'bg-green-500' 
                          : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Personal Info</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">Vehicle Details</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">Financial Info</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {renderFormStep()}
            
            <div className="flex justify-between pt-6">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
                >
                  Previous
                </button>
              )}
              <button
                type="submit"
                disabled={isLoading}
                className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 ml-auto
                  ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Processing...
                  </>
                ) : step < 3 ? (
                  'Next'
                ) : (
                  'Get Quote'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 