import React from 'react';
import { Card, CardContent } from '../ui/Card';
import { ArrowUpRight, ArrowDownRight, DollarSign } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
interface SummaryCardProps {
  title: string;
  amount: number;
  type: 'income' | 'expense' | 'balance';
}
const SummaryCard: React.FC<SummaryCardProps> = ({ title, amount, type }) => {
  const getIcon = () => {
    switch (type) {
      case 'income':
        return <ArrowUpRight className="w-6 h-6 text-green-500" />;
      case 'expense':
        return <ArrowDownRight className="w-6 h-6 text-red-500" />;
      case 'balance':
        return <span className="text-xl font-bold text-blue-500">₹</span>;
      default:
        return null;
    }
  };
  const getAmountColor = () => {
    switch (type) {
      case 'income':
        return 'text-green-600 dark:text-green-400';
      case 'expense':
        return 'text-red-600 dark:text-red-400';
      case 'balance':
        return amount >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-red-600 dark:text-red-400';
      default:
        return '';
    }
  };
  const getBgColor = () => {
    switch (type) {
      case 'income':
        return 'bg-green-50 dark:bg-green-900/20';
      case 'expense':
        return 'bg-red-50 dark:bg-red-900/20';
      case 'balance':
        return 'bg-blue-50 dark:bg-blue-900/20';
      default:
        return '';
    }
  };
  return (
    <Card className={`${getBgColor()} border-0`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <div className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-sm">
            {getIcon()}
          </div>
        </div>
        <div className="mt-4">
          <h3 className={`text-2xl font-bold ${getAmountColor()}`}>
            {formatCurrency(amount)}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {type === 'balance' 
              ? amount >= 0 ? 'Available to spend' : 'Spending over budget' 
              : 'Current month'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
export default SummaryCard;