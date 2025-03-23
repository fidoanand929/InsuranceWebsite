'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import '@fontsource/poppins';
import '@fontsource/inter';

export default function EMICalculator() {
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [interestRate, setInterestRate] = useState(9.5);
  const [loanTerm, setLoanTerm] = useState(36);
  const [emi, setEMI] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);

  useEffect(() => {
    calculateEMI();
  }, [loanAmount, interestRate, loanTerm]);

  const calculateEMI = () => {
    // Convert interest rate from percentage to decimal
    const monthlyInterestRate = interestRate / 12 / 100;
    
    // Calculate EMI using the formula: [P x R x (1+R)^N]/[(1+R)^N-1]
    const emiValue = loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTerm) / 
      (Math.pow(1 + monthlyInterestRate, loanTerm) - 1);
    
    setEMI(emiValue);
    setTotalPayment(emiValue * loanTerm);
    setTotalInterest((emiValue * loanTerm) - loanAmount);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  const loanTypes = [
    { name: 'Car Loan', description: 'For new and used vehicles' },
    { name: 'Truck Loan', description: 'For commercial vehicles' },
    { name: 'Business Loan', description: 'For company expansion or equipment' },
    { name: 'Personal Loan', description: 'For personal needs' }
  ];

  return (
    <div className="min-h-screen flex flex-col font-['Inter'] bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 py-16">
      <div className="flex-1 flex flex-col items-center px-6">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-['Poppins'] drop-shadow-sm">
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
              EMI Calculator
            </span>
          </h1>
          <motion.p 
            className="mt-6 text-xl leading-8 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Plan your finances with our easy-to-use calculator. Adjust the sliders to see how different loan parameters affect your monthly payments.
          </motion.p>
        </motion.div>

        {/* Calculator Section */}
        <div className="mt-16 w-full max-w-4xl">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transition-all duration-300 border border-gray-100 dark:border-gray-700">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-12"
            >
              {/* Input Section */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Loan Parameters</h2>
                
                {/* Loan Amount Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Loan Amount</label>
                    <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                      {formatCurrency(loanAmount)}
                    </span>
                  </div>
                  <input 
                    type="range" 
                    min="100000" 
                    max="10000000" 
                    step="100000" 
                    value={loanAmount} 
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>₹1 Lakh</span>
                    <span>₹1 Crore</span>
                  </div>
                </div>

                {/* Interest Rate Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Interest Rate (% p.a.)</label>
                    <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                      {interestRate}%
                    </span>
                  </div>
                  <input 
                    type="range" 
                    min="5" 
                    max="20" 
                    step="0.1" 
                    value={interestRate} 
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>5%</span>
                    <span>20%</span>
                  </div>
                </div>

                {/* Loan Term Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Loan Term (months)</label>
                    <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                      {loanTerm} months
                    </span>
                  </div>
                  <input 
                    type="range" 
                    min="12" 
                    max="84" 
                    step="6" 
                    value={loanTerm} 
                    onChange={(e) => setLoanTerm(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>1 Year</span>
                    <span>7 Years</span>
                  </div>
                </div>
              </div>

              {/* Results Section */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Loan Summary</h2>
                
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6 space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Monthly EMI</h3>
                    <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{formatCurrency(emi)}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-purple-100 dark:border-purple-800">
                    <div className="space-y-1">
                      <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Principal Amount</h3>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">{formatCurrency(loanAmount)}</p>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Interest</h3>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">{formatCurrency(totalInterest)}</p>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-purple-100 dark:border-purple-800">
                    <div className="space-y-1">
                      <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Payable Amount</h3>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">{formatCurrency(totalPayment)}</p>
                    </div>
                  </div>
                </div>
                
                <motion.button
                  className="w-full py-3 mt-8 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-500 dark:to-indigo-500 text-white"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Apply for a Loan
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Loan Types Section */}
        <div className="mt-16 w-full max-w-4xl">
          <motion.h2 
            className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Available Loan Types
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {loanTypes.map((loan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{loan.name}</h3>
                <p className="text-gray-600 dark:text-gray-300">{loan.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Back Button */}
        <motion.div 
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Link href="/">
            <motion.button 
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-gray-600 to-gray-700 dark:from-gray-700 dark:to-gray-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Back to Home
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
} 