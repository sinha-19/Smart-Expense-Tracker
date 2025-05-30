import React from 'react';
interface CardProps {
  children: React.ReactNode;
  className?: string;
}
export const Card = ({ children, className = '' }: CardProps) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden ${className}`}>
      {children}
    </div>
  );
};
interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}
export const CardHeader = ({ children, className = '' }: CardHeaderProps) => {
  return (
    <div className={`px-6 py-4 border-b border-gray-200 dark:border-gray-700 ${className}`}>
      {children}
    </div>
  );
}
interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}
export const CardTitle = ({ children, className = '' }: CardTitleProps) => {
  return (
    <h3 className={`text-lg font-medium text-gray-900 dark:text-white ${className}`}>
      {children}
    </h3>
  );
};
interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}
export const CardContent = ({ children, className = '' }: CardContentProps) => {
  return (
    <div className={`px-6 py-4 ${className}`}>
      {children}
    </div>
  );
};
interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}
export const CardFooter = ({ children, className = '' }: CardFooterProps) => {
  return (
    <div className={`px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 ${className}`}>
      {children}
    </div>
  );
};