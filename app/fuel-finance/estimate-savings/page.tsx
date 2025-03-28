'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ChartBarIcon, ArrowTrendingUpIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import '@fontsource/poppins';
import '@fontsource/inter';

interface SavingsData {
  currentCost: number;
  potentialSavings: number;
  annualSavings: number;
  co2Reduction: number;
}

export default function EstimateSavings() {
  const [formData, setFormData] = useState({
    vehicleType: 'car',
    fuelType: 'petrol',
    currentMileage: '',
    monthlyDistance: '',
    fuelPrice: '',
    drivingStyle: 'normal',
    vehicleAge: 'new',
    maintenanceFrequency: 'regular'
  });

  const [savingsData, setSavingsData] = useState<SavingsData | null>(null);

  const calculateSavings = () => {
    const {
      vehicleType,
      fuelType,
      currentMileage,
      monthlyDistance,
      fuelPrice,
      drivingStyle,
      vehicleAge,
      maintenanceFrequency
    } = formData;

    // Base calculations
    const monthlyFuelConsumption = (parseFloat(monthlyDistance) / parseFloat(currentMileage));
    const currentMonthlyCost = monthlyFuelConsumption * parseFloat(fuelPrice);

    // Efficiency factors
    const drivingStyleFactor = drivingStyle === 'eco' ? 0.85 : drivingStyle === 'aggressive' ? 1.15 : 1;
    const vehicleAgeFactor = vehicleAge === 'new' ? 1 : vehicleAge === 'moderate' ? 1.1 : 1.2;
    const maintenanceFactor = maintenanceFrequency === 'regular' ? 1 : maintenanceFrequency === 'occasional' ? 1.15 : 1.25;

    // Calculate optimized consumption
    const optimizedConsumption = monthlyFuelConsumption * drivingStyleFactor * vehicleAgeFactor * maintenanceFactor;
    const optimizedCost = optimizedConsumption * parseFloat(fuelPrice);

    // Calculate savings
    const monthlySavings = currentMonthlyCost - optimizedCost;
    const annualSavings = monthlySavings * 12;

    // CO2 reduction calculation (rough estimate)
    const co2PerLiter = fuelType === 'petrol' ? 2.31 : 2.68; // kg CO2 per liter
    const monthlyReduction = (monthlyFuelConsumption - optimizedConsumption) * co2PerLiter;
    const annualCO2Reduction = monthlyReduction * 12;

    setSavingsData({
      currentCost: currentMonthlyCost,
      potentialSavings: monthlySavings,
      annualSavings: annualSavings,
      co2Reduction: annualCO2Reduction
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateSavings();
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-['Inter']">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl font-['Poppins'] mb-6">
            <span className="bg-gradient-to-r from-green-600 to-teal-600 dark:from-green-400 dark:to-teal-400 bg-clip-text text-transparent">
              Estimate Your Fuel Savings
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Calculate your potential fuel savings by optimizing your driving habits and vehicle maintenance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calculator Form */}
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Vehicle Type
                  </label>
                  <select
                    name="vehicleType"
                    value={formData.vehicleType}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-green-500 focus:ring-green-500"
                  >
                    <option value="car">Car</option>
                    <option value="suv">SUV</option>
                    <option value="truck">Truck</option>
                    <option value="van">Van</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Fuel Type
                  </label>
                  <select
                    name="fuelType"
                    value={formData.fuelType}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-green-500 focus:ring-green-500"
                  >
                    <option value="petrol">Petrol</option>
                    <option value="diesel">Diesel</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Current Mileage (km/L)
                  </label>
                  <input
                    type="number"
                    name="currentMileage"
                    value={formData.currentMileage}
                    onChange={handleInputChange}
                    placeholder="Enter current mileage"
                    className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-green-500 focus:ring-green-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Monthly Distance (km)
                  </label>
                  <input
                    type="number"
                    name="monthlyDistance"
                    value={formData.monthlyDistance}
                    onChange={handleInputChange}
                    placeholder="Enter monthly distance"
                    className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-green-500 focus:ring-green-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Fuel Price (per liter)
                  </label>
                  <input
                    type="number"
                    name="fuelPrice"
                    value={formData.fuelPrice}
                    onChange={handleInputChange}
                    placeholder="Enter fuel price"
                    className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-green-500 focus:ring-green-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Driving Style
                  </label>
                  <select
                    name="drivingStyle"
                    value={formData.drivingStyle}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-green-500 focus:ring-green-500"
                  >
                    <option value="eco">Eco-friendly</option>
                    <option value="normal">Normal</option>
                    <option value="aggressive">Aggressive</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Vehicle Age
                  </label>
                  <select
                    name="vehicleAge"
                    value={formData.vehicleAge}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-green-500 focus:ring-green-500"
                  >
                    <option value="new">New (0-3 years)</option>
                    <option value="moderate">Moderate (4-7 years)</option>
                    <option value="old">Old (8+ years)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Maintenance Frequency
                  </label>
                  <select
                    name="maintenanceFrequency"
                    value={formData.maintenanceFrequency}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-green-500 focus:ring-green-500"
                  >
                    <option value="regular">Regular</option>
                    <option value="occasional">Occasional</option>
                    <option value="rare">Rare</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                >
                  Calculate Savings
                </button>
              </div>
            </form>
          </motion.div>

          {/* Results Section */}
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {savingsData ? (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Your Potential Savings</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 p-4 rounded-xl">
                    <div className="flex items-center space-x-3 mb-2">
                      <CurrencyDollarIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Monthly Savings</h3>
                    </div>
                    <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                      ₹{savingsData.potentialSavings.toFixed(2)}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-teal-50 to-green-50 dark:from-teal-900/20 dark:to-green-900/20 p-4 rounded-xl">
                    <div className="flex items-center space-x-3 mb-2">
                      <ArrowTrendingUpIcon className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Annual Savings</h3>
                    </div>
                    <p className="text-3xl font-bold text-teal-600 dark:text-teal-400">
                      ₹{savingsData.annualSavings.toFixed(2)}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 p-4 rounded-xl">
                    <div className="flex items-center space-x-3 mb-2">
                      <ChartBarIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Current Monthly Cost</h3>
                    </div>
                    <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                      ₹{savingsData.currentCost.toFixed(2)}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-teal-50 to-green-50 dark:from-teal-900/20 dark:to-green-900/20 p-4 rounded-xl">
                    <div className="flex items-center space-x-3 mb-2">
                      <Image
                        src="/images/doodles/leaf-doodle.svg"
                        alt="Environmental Impact"
                        width={24}
                        height={24}
                        className="text-teal-600 dark:text-teal-400"
                      />
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">CO2 Reduction</h3>
                    </div>
                    <p className="text-3xl font-bold text-teal-600 dark:text-teal-400">
                      {savingsData.co2Reduction.toFixed(2)} kg/year
                    </p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Recommendations for Maximum Savings
                  </h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li>• Maintain steady speeds and avoid rapid acceleration</li>
                    <li>• Regular vehicle maintenance and tire pressure checks</li>
                    <li>• Plan routes to avoid traffic and minimize idle time</li>
                    <li>• Remove excess weight from your vehicle</li>
                    <li>• Consider carpooling or combining trips</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
                <Image
                  src="/images/doodles/calculator-doodle.svg"
                  alt="Calculator"
                  width={100}
                  height={100}
                  className="mb-4 opacity-50"
                />
                <p className="text-lg">
                  Fill in the form to see your potential savings
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
} 