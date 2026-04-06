import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Wallet, 
  TrendingDown, 
  AlertCircle,
  CheckCircle2,
  FileText,
  Download,
  DollarSign,
  PiggyBank,
  Receipt,
  Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const financialSummary = {
  totalBudget: 50000000000,
  spent: 32500000000,
  remaining: 17500000000,
  donations: 15000000000,
  compliance: 98.5,
};

const monthlyData = [
  { month: 'Jan', income: 2500000000, expense: 1800000000 },
  { month: 'Feb', income: 3200000000, expense: 2400000000 },
  { month: 'Mar', income: 2800000000, expense: 3200000000 },
  { month: 'Apr', income: 4500000000, expense: 3800000000 },
  { month: 'Mei', income: 3800000000, expense: 4100000000 },
  { month: 'Jun', income: 5200000000, expense: 4500000000 },
];

const expenseCategories = [
  { name: 'Kampanye', value: 45, color: '#3b82f6' },
  { name: 'Logistik', value: 25, color: '#22c55e' },
  { name: 'Operasional', value: 15, color: '#eab308' },
  { name: 'Personel', value: 10, color: '#f97316' },
  { name: 'Lainnya', value: 5, color: '#9ca3af' },
];

const recentTransactions = [
  { id: 1, date: '2026-04-05', description: 'Pembelian Baliho Surabaya', category: 'Logistik', amount: 250000000, status: 'approved' },
  { id: 2, date: '2026-04-04', description: 'Honor Relawan Bulan Maret', category: 'Personel', amount: 850000000, status: 'approved' },
  { id: 3, date: '2026-04-03', description: 'Biaya Rapat Koordinasi', category: 'Operasional', amount: 45000000, status: 'pending' },
  { id: 4, date: '2026-04-02', description: 'Sewa Venue Kampanye', category: 'Kampanye', amount: 120000000, status: 'approved' },
  { id: 5, date: '2026-04-01', description: 'Pembelian Merchandise', category: 'Logistik', amount: 180000000, status: 'approved' },
];

const fundTracking = [
  { 
    source: 'Donasi Individu', 
    amount: 8500000000, 
    received: 8500000000, 
    pending: 0,
    status: 'complete' 
  },
  { 
    source: 'Sumbangan Partai', 
    amount: 15000000000, 
    received: 12500000000, 
    pending: 2500000000,
    status: 'partial' 
  },
  { 
    source: 'Crowdfunding', 
    amount: 5000000000, 
    received: 3200000000, 
    pending: 1800000000,
    status: 'partial' 
  },
  { 
    source: 'Sponsor', 
    amount: 8000000000, 
    received: 6800000000, 
    pending: 1200000000,
    status: 'partial' 
  },
  { 
    source: 'Event Fundraising', 
    amount: 3500000000, 
    received: 3500000000, 
    pending: 0,
    status: 'complete' 
  },
];

const complianceItems = [
  { 
    item: 'Laporan Keuangan Bulanan', 
    status: 'completed', 
    deadline: '05 Apr 2026',
    submitted: '03 Apr 2026'
  },
  { 
    item: 'Dokumen Sumbangan > 100jt', 
    status: 'completed', 
    deadline: '10 Apr 2026',
    submitted: '08 Apr 2026'
  },
  { 
    item: 'Laporan Penggunaan Dana', 
    status: 'pending', 
    deadline: '15 Apr 2026',
    submitted: '-'
  },
  { 
    item: 'Verifikasi Rekening Kampanye', 
    status: 'completed', 
    deadline: '01 Apr 2026',
    submitted: '28 Mar 2026'
  },
  { 
    item: 'Dokumen Perjanjian Sponsor', 
    status: 'warning', 
    deadline: '08 Apr 2026',
    submitted: '-'
  },
];

export function FinancialDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      approved: 'bg-green-500',
      pending: 'bg-yellow-500',
      rejected: 'bg-red-500',
    };
    const labels = {
      approved: 'Disetujui',
      pending: 'Menunggu',
      rejected: 'Ditolak',
    };
    return (
      <Badge className={cn(styles[status as keyof typeof styles])}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  const getComplianceBadge = (status: string) => {
    const styles = {
      completed: 'bg-green-500',
      pending: 'bg-yellow-500',
      warning: 'bg-red-500',
    };
    const labels = {
      completed: 'Selesai',
      pending: 'Menunggu',
      warning: 'Terlambat',
    };
    return (
      <Badge className={cn(styles[status as keyof typeof styles])}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs">TOTAL ANGGARAN</p>
                <p className="text-xl font-bold">{formatCurrency(financialSummary.totalBudget)}</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Wallet className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs">TERPAKAI</p>
                <p className="text-xl font-bold text-red-600">{formatCurrency(financialSummary.spent)}</p>
                <p className="text-xs text-gray-500">
                  {Math.round((financialSummary.spent / financialSummary.totalBudget) * 100)}% dari anggaran
                </p>
              </div>
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs">SISA ANGGARAN</p>
                <p className="text-xl font-bold text-green-600">{formatCurrency(financialSummary.remaining)}</p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <PiggyBank className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs">COMPLIANCE</p>
                <p className="text-xl font-bold text-green-600">{financialSummary.compliance}%</p>
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Sesuai Aturan
                </p>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tracking">Fund Tracking</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid lg:grid-cols-2 gap-4">
            {/* Income vs Expense Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Pemasukan vs Pengeluaran</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value: number) => formatCurrency(value)} />
                      <Legend />
                      <Bar dataKey="income" name="Pemasukan" fill="#22c55e" />
                      <Bar dataKey="expense" name="Pengeluaran" fill="#ef4444" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Expense Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Distribusi Pengeluaran</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={expenseCategories}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {expenseCategories.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Transactions */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Transaksi Terbaru</CardTitle>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" /> Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <Receipt className="w-5 h-5 text-yellow-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{transaction.description}</p>
                        <p className="text-xs text-gray-500">{transaction.date} • {transaction.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-red-600">-{formatCurrency(transaction.amount)}</p>
                      {getStatusBadge(transaction.status)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tracking" className="space-y-4">
          <div className="grid gap-4">
            {fundTracking.map((fund, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <DollarSign className="w-5 h-5 text-yellow-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">{fund.source}</h4>
                        <p className="text-sm text-gray-500">
                          Target: {formatCurrency(fund.amount)}
                        </p>
                      </div>
                    </div>
                    <Badge className={fund.status === 'complete' ? 'bg-green-500' : 'bg-yellow-500'}>
                      {fund.status === 'complete' ? 'Lengkap' : 'Dalam Proses'}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Diterima</span>
                      <span className="font-medium">{formatCurrency(fund.received)}</span>
                    </div>
                    <Progress value={(fund.received / fund.amount) * 100} className="h-2" />
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Pending</span>
                      <span className="font-medium text-yellow-600">{formatCurrency(fund.pending)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Status Kepatuhan</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">{financialSummary.compliance}%</p>
                    <p className="text-xs text-gray-500">Overall Compliance</p>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {complianceItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center",
                        item.status === 'completed' ? 'bg-green-100' :
                        item.status === 'warning' ? 'bg-red-100' : 'bg-yellow-100'
                      )}>
                        {item.status === 'completed' ? (
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                        ) : item.status === 'warning' ? (
                          <AlertCircle className="w-5 h-5 text-red-600" />
                        ) : (
                          <Clock className="w-5 h-5 text-yellow-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{item.item}</p>
                        <p className="text-xs text-gray-500">
                          Deadline: {item.deadline} • Submitted: {item.submitted}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      {getComplianceBadge(item.status)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
