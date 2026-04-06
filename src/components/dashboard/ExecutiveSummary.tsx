import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Users, 
  MessageCircle, 
  Zap,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  BarChart3,
  Brain,
  Eye
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line } from 'recharts';

const summaryStats = [
  { 
    title: 'Prediksi Suara', 
    value: '23.8%', 
    subtitle: 'Golkar Jatim',
    trend: 'up', 
    trendValue: '+2.3% dari bulan lalu',
    icon: BarChart3,
    variant: 'highlight' as const
  },
  { 
    title: 'Target Kursi', 
    value: '28', 
    subtitle: 'DPRD Jatim',
    trend: 'neutral', 
    trendValue: 'Dapil strategis',
    icon: Target,
    variant: 'default' as const
  },
  { 
    title: 'Sentimen Publik', 
    value: '72%', 
    subtitle: 'POSITIF',
    trend: 'up', 
    trendValue: '+5.2% minggu ini',
    icon: MessageCircle,
    variant: 'success' as const
  },
  { 
    title: 'Aktivitas Relawan', 
    value: '142,500', 
    subtitle: 'Desa/Kelurahan',
    trend: 'up', 
    trendValue: '+12.5% hari ini',
    icon: Users,
    variant: 'default' as const
  },
];

const electabilityTrend = [
  { month: 'Jan', golkar: 18.5, competitor1: 22.3, competitor2: 19.8 },
  { month: 'Feb', golkar: 19.2, competitor1: 21.8, competitor2: 20.1 },
  { month: 'Mar', golkar: 20.5, competitor1: 21.5, competitor2: 20.3 },
  { month: 'Apr', golkar: 21.8, competitor1: 21.2, competitor2: 20.5 },
  { month: 'Mei', golkar: 22.5, competitor1: 20.8, competitor2: 20.7 },
  { month: 'Jun', golkar: 23.8, competitor1: 20.5, competitor2: 20.9 },
];

const quickStats = [
  { label: 'KTA Terdaftar', value: '2.85M', target: '3.5M', progress: 81.4 },
  { label: 'Saksi TPS', value: '87,500', target: '87,500', progress: 100 },
  { label: 'Relawan Aktif', value: '112,500', target: '125,000', progress: 90 },
  { label: 'Anggaran Terserap', value: '32.5M', target: '50M', progress: 65 },
];

const aiAlerts = [
  {
    type: 'warning',
    title: 'Fokus Kunjungan Diperlukan',
    message: 'Tuban & Bojonegoro membutuhkan perhatian khusus. Amankan 3% Swing Voters.',
    action: 'Jadwalkan kunjungan',
    priority: 'high'
  },
  {
    type: 'info',
    title: 'Tren Positif di Surabaya',
    message: 'Sentimen positif meningkat 8% setelah kunjungan terakhir.',
    action: 'Lihat detail',
    priority: 'medium'
  },
  {
    type: 'success',
    title: 'Target KTA Tercapai',
    message: 'Rekrutmen KTA Generasi Z melebihi target 23%.',
    action: 'Lihat laporan',
    priority: 'low'
  },
];

const recentActivities = [
  { time: '2 jam lalu', activity: 'Kunjungan Ketua Umum ke Surabaya', type: 'event', status: 'completed' },
  { time: '4 jam lalu', activity: 'Rapat Koordinasi PAC Se-Jatim', type: 'meeting', status: 'completed' },
  { time: '6 jam lalu', activity: 'Peluncuran Program KTA Gen Z', type: 'campaign', status: 'ongoing' },
  { time: '8 jam lalu', activity: 'Sosialisasi di 50 Desa Madura', type: 'canvasing', status: 'ongoing' },
  { time: '12 jam lalu', activity: 'Upload konten TikTok viral', type: 'social', status: 'completed' },
];

const topIssues = [
  { issue: 'Kelangkaan Pupuk', location: 'Jember/Banyuwangi', mentions: 45200, sentiment: 'negatif' },
  { issue: 'Banjir Rob', location: 'Gresik/Surabaya', mentions: 38900, sentiment: 'negatif' },
  { issue: 'Lapangan Kerja', location: 'Malang', mentions: 32500, sentiment: 'positif' },
  { issue: 'Infrastruktur Jalan', location: 'Jatim', mentions: 28100, sentiment: 'positif' },
];

export function ExecutiveSummary() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Selamat Datang di War Room Digital</h1>
            <p className="text-yellow-100">
              Dashboard komprehensif untuk monitoring dan analisis pemenangan pemilu 2029
            </p>
          </div>
          <div className="hidden lg:flex items-center gap-4">
            <div className="bg-white/20 rounded-xl px-4 py-3 text-center">
              <p className="text-3xl font-bold">187</p>
              <p className="text-xs text-yellow-100">Hari Menuju Pemilu</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryStats.map((stat, index) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === 'up' ? TrendingUp : stat.trend === 'down' ? TrendingDown : null;
          
          return (
            <Card key={index} className={cn(
              "hover:shadow-lg transition-shadow",
              stat.variant === 'highlight' && "bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-300",
              stat.variant === 'success' && "bg-gradient-to-br from-green-50 to-green-100 border-green-300",
            )}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-gray-500 text-xs font-medium uppercase">{stat.title}</p>
                    <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mt-1">{stat.value}</h3>
                    <p className="text-gray-600 text-sm">{stat.subtitle}</p>
                    {stat.trend && stat.trendValue && (
                      <div className={cn(
                        "flex items-center gap-1 mt-2 text-sm font-medium",
                        stat.trend === 'up' ? 'text-green-600' : stat.trend === 'down' ? 'text-red-600' : 'text-gray-500'
                      )}>
                        {TrendIcon && <TrendIcon className="w-4 h-4" />}
                        <span>{stat.trendValue}</span>
                      </div>
                    )}
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center text-yellow-600">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Electability Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-yellow-600" />
                Tren Elektabilitas
              </CardTitle>
              <div className="flex gap-2">
                {['7d', '30d', '90d', '1y'].map((range) => (
                  <Button
                    key={range}
                    variant={selectedTimeRange === range ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedTimeRange(range)}
                    className={selectedTimeRange === range ? 'bg-yellow-500 hover:bg-yellow-600' : ''}
                  >
                    {range === '7d' ? '7H' : range === '30d' ? '30H' : range === '90d' ? '3B' : '1T'}
                  </Button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={electabilityTrend}>
                  <defs>
                    <linearGradient id="colorGolkar" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#eab308" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#eab308" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[15, 25]} />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="golkar" 
                    name="Golkar" 
                    stroke="#eab308" 
                    fillOpacity={1} 
                    fill="url(#colorGolkar)" 
                    strokeWidth={2}
                  />
                  <Line type="monotone" dataKey="competitor1" name="Pesaing 1" stroke="#3b82f6" strokeWidth={2} />
                  <Line type="monotone" dataKey="competitor2" name="Pesaing 2" stroke="#ef4444" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Progress Ringkasan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {quickStats.map((stat, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">{stat.label}</span>
                    <span className="font-medium">{stat.value} / {stat.target}</span>
                  </div>
                  <Progress value={stat.progress} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">{stat.progress}% tercapai</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* AI Alerts */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Brain className="w-5 h-5 text-yellow-600" />
              AI Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {aiAlerts.map((alert, index) => (
                <div 
                  key={index} 
                  className={cn(
                    "p-4 rounded-xl border-l-4",
                    alert.type === 'warning' ? 'bg-yellow-50 border-yellow-500' :
                    alert.type === 'success' ? 'bg-green-50 border-green-500' :
                    'bg-blue-50 border-blue-500'
                  )}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
                        alert.type === 'warning' ? 'bg-yellow-500' :
                        alert.type === 'success' ? 'bg-green-500' :
                        'bg-blue-500'
                      )}>
                        {alert.type === 'warning' ? (
                          <AlertTriangle className="w-4 h-4 text-white" />
                        ) : alert.type === 'success' ? (
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        ) : (
                          <Eye className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">{alert.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                      </div>
                    </div>
                    <Badge 
                      className={alert.priority === 'high' ? 'bg-red-500' : alert.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'}
                    >
                      {alert.priority}
                    </Badge>
                  </div>
                  <div className="mt-3 ml-11">
                    <Button variant="link" size="sm" className="text-yellow-600 p-0 h-auto">
                      {alert.action} <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Issues */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-yellow-600" />
              Isu Terpopuler
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topIssues.map((issue, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{issue.issue}</p>
                    <p className="text-xs text-gray-500">{issue.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">{issue.mentions.toLocaleString()}</p>
                    <Badge 
                      className={issue.sentiment === 'positif' ? 'bg-green-500' : 'bg-red-500'}
                    >
                      {issue.sentiment}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-600" />
            Aktivitas Terbaru
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-5 gap-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className={cn(
                  "w-2 h-2 rounded-full mt-2 flex-shrink-0",
                  activity.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                )} />
                <div>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                  <p className="text-sm font-medium">{activity.activity}</p>
                  <Badge variant="outline" className="mt-1 text-xs">
                    {activity.type}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
