
import React from 'react';
import { DollarSign, Heart, Brain, Smile, TrendingUp } from 'lucide-react';

interface PlayerStatsProps {
  money: number;
  happiness: number;
  health: number;
  financialIQ: number;
  age: number;
}

const PlayerStats: React.FC<PlayerStatsProps> = ({ money, happiness, health, financialIQ, age }) => {
  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getStatColor = (value: number) => {
    if (value >= 80) return 'text-financial-money';
    if (value >= 60) return 'text-financial-gold';
    if (value >= 40) return 'text-orange-500';
    return 'text-financial-loss';
  };

  const getStatGradient = (value: number) => {
    if (value >= 80) return 'from-financial-money to-financial-money-light';
    if (value >= 60) return 'from-financial-gold to-financial-gold-light';
    if (value >= 40) return 'from-orange-400 to-orange-500';
    return 'from-financial-loss to-financial-loss-light';
  };

  const getLifePhase = (age: number) => {
    if (age < 18) return "High School";
    if (age < 23) return "College Years";
    if (age < 30) return "Early Career";
    if (age < 40) return "Building Wealth";
    if (age < 50) return "Prime Earning";
    if (age < 60) return "Pre-Retirement";
    return "Golden Years";
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-6 mb-6 border border-gray-100 animate-fade-in">
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {age}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Age {age}</h2>
              <p className="text-sm text-gray-600 font-medium">{getLifePhase(age)}</p>
            </div>
          </div>
        </div>
        <div className="text-right bg-financial-money/10 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-financial-money" />
            <p className="text-sm text-gray-600 font-medium">Net Worth</p>
          </div>
          <p className="text-2xl font-bold text-financial-money">{formatMoney(money)}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-center mb-3">
            <div className="w-10 h-10 bg-financial-money/10 rounded-full flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-financial-money" />
            </div>
          </div>
          <p className="text-center font-semibold text-gray-800 mb-2">Wealth</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2 overflow-hidden">
            <div 
              className="h-2 rounded-full bg-gradient-to-r from-financial-money to-financial-money-light transition-all duration-500 ease-out animate-pulse-success" 
              style={{ width: `${Math.min(100, Math.max(5, (money / 100000) * 100))}%` }}
            ></div>
          </div>
          <p className="text-xs text-center text-gray-600 font-medium">{formatMoney(money)}</p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-center mb-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
              <Smile className="w-5 h-5 text-yellow-600" />
            </div>
          </div>
          <p className="text-center font-semibold text-gray-800 mb-2">Happiness</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2 overflow-hidden">
            <div 
              className={`h-2 rounded-full bg-gradient-to-r ${getStatGradient(happiness)} transition-all duration-500 ease-out`}
              style={{ width: `${happiness}%` }}
            ></div>
          </div>
          <p className="text-xs text-center text-gray-600 font-medium">{happiness}%</p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-center mb-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5 text-red-500" />
            </div>
          </div>
          <p className="text-center font-semibold text-gray-800 mb-2">Health</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2 overflow-hidden">
            <div 
              className={`h-2 rounded-full bg-gradient-to-r ${getStatGradient(health)} transition-all duration-500 ease-out`}
              style={{ width: `${health}%` }}
            ></div>
          </div>
          <p className="text-xs text-center text-gray-600 font-medium">{health}%</p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-center mb-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Brain className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-center font-semibold text-gray-800 mb-2">Financial IQ</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2 overflow-hidden">
            <div 
              className={`h-2 rounded-full bg-gradient-to-r ${getStatGradient(financialIQ)} transition-all duration-500 ease-out`}
              style={{ width: `${financialIQ}%` }}
            ></div>
          </div>
          <p className="text-xs text-center text-gray-600 font-medium">{financialIQ}%</p>
        </div>
      </div>
    </div>
  );
};

export default PlayerStats;
