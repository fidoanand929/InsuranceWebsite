'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import '@fontsource/poppins';
import '@fontsource/inter';

interface FormData {
  customerName: string;
  businessName: string;
  contactNumber: string;
  email: string;
  vehicleType: string;
  vehicleCost: string;
  downPayment: string;
  loanTerm: string;
  monthlyRevenue: string;
  businessAge: string;
  creditScore: string;
}

export default function TruckFinanceQuote() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    customerName: '',
    businessName: '',
    contactNumber: '',
    email: '',
    vehicleType: 'heavy-duty',
    vehicleCost: '',
    downPayment: '',
    loanTerm: '48',
    monthlyRevenue: '',
    businessAge: '',
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
    const businessAge = parseInt(formData.businessAge);
    const monthlyRevenue = parseInt(formData.monthlyRevenue);
    const vehicleCost = parseInt(formData.vehicleCost);
    const downPayment = parseInt(formData.downPayment);

    // Basic eligibility criteria
    if (creditScore < 600) return false;
    if (businessAge < 2) return false;
    if (monthlyRevenue < 100000) return false;
    if (downPayment < vehicleCost * 0.15) return false;

    return true;
  };

  const testConnection = async () => {
    try {
      const { data, error } = await supabase
        .from('truck_quotes')
        .select('id')
        .limit(1);

      if (error) {
        console.error('Connection test error:', error);
        return false;
      }
      console.log('Connection test successful');
      return true;
    } catch (error) {
      console.error('Connection test failed:', error);
      return false;
    }
  };

  const generateQuote = async () => {
    setIsLoading(true);
    
    // Test connection first
    const isConnected = await testConnection();
    if (!isConnected) {
      setQuoteResult({
        status: 'error',
        message: 'Unable to connect to our servers. Please try again later.'
      });
      setIsLoading(false);
      return;
    }

    const isEligible = checkEligibility();

    if (!isEligible) {
      setQuoteResult({
        status: 'rejected',
        message: 'We apologize, but based on the provided information, we cannot offer financing at this time.'
      });
      setIsLoading(false);
      return;
    }

    // Generate dummy quote numbers
    const vehicleCost = parseInt(formData.vehicleCost);
    const downPayment = parseInt(formData.downPayment);
    const loanTerm = parseInt(formData.loanTerm);
    const creditScore = parseInt(formData.creditScore);

    // Calculate dummy interest rate based on credit score
    let interestRate = 12; // Base rate
    if (creditScore > 750) interestRate = 8;
    else if (creditScore > 700) interestRate = 9;
    else if (creditScore > 650) interestRate = 10;

    const loanAmount = vehicleCost - downPayment;
    const monthlyInterest = interestRate / 12 / 100;
    const monthlyPayment = (loanAmount * monthlyInterest * Math.pow(1 + monthlyInterest, loanTerm)) / 
      (Math.pow(1 + monthlyInterest, loanTerm) - 1);

    const quote = {
      customer_name: formData.customerName,
      business_name: formData.businessName,
      contact_number: formData.contactNumber,
      email: formData.email,
      vehicle_type: formData.vehicleType,
      vehicle_cost: vehicleCost,
      down_payment: downPayment,
      loan_term: loanTerm,
      monthly_revenue: parseInt(formData.monthlyRevenue),
      business_age: parseInt(formData.businessAge),
      credit_score: creditScore,
      quote_amount: loanAmount,
      interest_rate: interestRate,
      monthly_payment: Math.round(monthlyPayment),
      status: 'approved'
    };

    try {
      console.log('Attempting to insert quote:', quote);
      const { data, error } = await supabase
        .from('truck_quotes')
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
        if (error.code === '42P01') {
          setQuoteResult({
            status: 'error',
            message: 'The quote system is currently being set up. Please try again in a few minutes.'
          });
        } else if (error.code === 'PGRST116') {
          setQuoteResult({
            status: 'error',
            message: 'Unable to connect to the database. Please check your internet connection and try again.'
          });
        } else if (error.code === '42501') {
          setQuoteResult({
            status: 'error',
            message: 'Permission denied. Please contact support.'
          });
        } else {
          setQuoteResult({
            status: 'error',
            message: `Database error: ${error.message}. Please try again or contact support if the issue persists.`
          });
        }
        return;
      }

      console.log('Successfully inserted quote:', data);
      setQuoteResult({
        status: 'approved',
        ...data
      });
    } catch (error) {
      console.error('Application error:', error);
      // Check if it's a network error
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        setQuoteResult({
          status: 'error',
          message: 'Unable to connect to our servers. Please check your internet connection and try again.'
        });
      } else {
        setQuoteResult({
          status: 'error',
          message: 'An unexpected error occurred. Please try again or contact support.'
        });
      }
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

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-['Inter']">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-['Poppins'] mb-6">
            <span className="bg-gradient-to-r from-emerald-600 to-green-600 dark:from-emerald-400 dark:to-green-400 bg-clip-text text-transparent">
              Get Your Truck Finance Quote
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Complete the form below to receive your personalized financing quote.
          </p>
        </motion.div>

        {!quoteResult ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
          >
            <div className="mb-8">
              <div className="flex justify-between items-center">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`flex items-center ${i < 3 ? 'flex-1' : ''}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        i <= step
                          ? 'bg-emerald-600 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      {i}
                    </div>
                    {i < 3 && (
                      <div
                        className={`flex-1 h-1 mx-2 ${
                          i < step
                            ? 'bg-emerald-600'
                            : 'bg-gray-200 dark:bg-gray-700'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Basic Info</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">Vehicle Details</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">Business Info</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
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
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Business Name</label>
                    <input
                      type="text"
                      name="businessName"
                      value={formData.businessName}
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
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Vehicle Type</label>
                    <select
                      name="vehicleType"
                      value={formData.vehicleType}
                      onChange={handleInputChange}
                      className="form-select bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                      required
                    >
                      <option value="heavy-duty">Heavy Duty Truck</option>
                      <option value="medium-duty">Medium Duty Truck</option>
                      <option value="light-duty">Light Duty Truck</option>
                      <option value="semi-truck">Semi Truck</option>
                    </select>
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
                      min="500000"
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
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Monthly Revenue (₹)</label>
                    <input
                      type="number"
                      name="monthlyRevenue"
                      value={formData.monthlyRevenue}
                      onChange={handleInputChange}
                      className="form-input bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                      required
                      min="0"
                    />
                  </div>
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Years in Business</label>
                    <input
                      type="number"
                      name="businessAge"
                      value={formData.businessAge}
                      onChange={handleInputChange}
                      className="form-input bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                      required
                      min="0"
                    />
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
                </motion.div>
              )}

              <div className="flex justify-between pt-6">
                {step > 1 && (
                  <motion.button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="px-6 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Previous
                  </motion.button>
                )}
                <motion.button
                  type="submit"
                  className={`px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 ${
                    step === 3
                      ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white'
                      : 'bg-emerald-600 text-white'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isLoading}
                >
                  {isLoading
                    ? 'Processing...'
                    : step === 3
                    ? 'Get Quote'
                    : 'Next'}
                </motion.button>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
          >
            {quoteResult.status === 'approved' ? (
              <>
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-green-600 dark:text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Congratulations! You're Pre-Approved
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    Here's your personalized financing quote
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Loan Details
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Loan Amount</span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {formatCurrency(quoteResult.quote_amount)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Interest Rate</span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {quoteResult.interest_rate}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Loan Term</span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {quoteResult.loan_term} months
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Payment Details
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Monthly Payment</span>
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                          {formatCurrency(quoteResult.monthly_payment)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Down Payment</span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {formatCurrency(quoteResult.down_payment)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center space-y-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    This is a preliminary quote. Final terms may vary based on additional verification.
                  </p>
                  <div className="flex justify-center gap-4">
                    <Link href="/truck-finance">
                      <motion.button
                        className="px-6 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Back to Truck Finance
                      </motion.button>
                    </Link>
                    <motion.button
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Proceed with Application
                    </motion.button>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-red-600 dark:text-red-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {quoteResult.message}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  Please contact our finance team for more information and alternative options.
                </p>
                <Link href="/truck-finance">
                  <motion.button
                    className="px-6 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Back to Truck Finance
                  </motion.button>
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
} 