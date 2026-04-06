import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  icon?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'highlight' | 'success' | 'warning';
}

export function StatCard({ 
  title, 
  value, 
  subtitle,
  trend, 
  trendValue,
  icon,
  className,
  variant = 'default'
}: StatCardProps) {
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  
  const variantStyles = {
    default: 'bg-white border-gray-200',
    highlight: 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-300',
    success: 'bg-gradient-to-br from-green-50 to-green-100 border-green-300',
    warning: 'bg-gradient-to-br from-orange-50 to-orange-100 border-orange-300',
  };

  return (
    <div className={cn(
      "rounded-xl border p-4 shadow-sm hover:shadow-md transition-shadow",
      variantStyles[variant],
      className
    )}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-gray-500 text-xs font-medium uppercase tracking-wide">{title}</p>
          <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mt-1">{value}</h3>
          {subtitle && (
            <p className="text-gray-600 text-sm mt-1">{subtitle}</p>
          )}
          {trend && trendValue && (
            <div className={cn(
              "flex items-center gap-1 mt-2 text-sm font-medium",
              trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-500'
            )}>
              <TrendIcon className="w-4 h-4" />
              <span>{trendValue}</span>
            </div>
          )}
        </div>
        {icon && (
          <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center text-yellow-600">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
