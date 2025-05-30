import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { CategorySum } from '../../types';
import { formatCurrency, formatPercentage } from '../../utils/formatters';
interface ExpenseChartProps {
  data: CategorySum[];
}
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white dark:bg-gray-800 p-2 shadow rounded border border-gray-200 dark:border-gray-700">
        <p className="font-medium">{data.category}</p>
        <p className="text-sm">{formatCurrency(data.amount)} ({formatPercentage(data.percentage)})</p>
      </div>
    );
  }
  return null;
};
const ExpenseChart: React.FC<ExpenseChartProps> = ({ data }) => {
  if (!data.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Expense Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="h-64 flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">No expense data available</p>
        </CardContent>
      </Card>
    );
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Expense Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                innerRadius={40}
                fill="#8884d8"
                dataKey="amount"
                nameKey="category"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                formatter={(value) => {
                  const item = data.find(d => d.category === value);
                  return (
                    <span className="text-sm">
                      {value} ({item ? formatPercentage(item.percentage) : '0%'})
                    </span>
                  );
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
export default ExpenseChart;