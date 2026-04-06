import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Shield, 
  Users, 
  MapPin, 
  CheckCircle2, 
  Clock,
  Search,
  Filter,
  Download,
  Eye
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const saksiStats = {
  total: 87500,
  confirmed: 83125,
  pending: 3125,
  rejected: 1250,
  byTPS: {
    totalTPS: 87500,
    covered: 83125,
    uncovered: 4375,
  }
};

const readinessData = [
  { name: 'Terverifikasi', value: 95, color: '#22c55e' },
  { name: 'Menunggu', value: 3.5, color: '#eab308' },
  { name: 'Ditolak', value: 1.5, color: '#ef4444' },
];

const regionData = [
  { region: 'Surabaya', saksi: 12500, confirmed: 12100, tps: 12500 },
  { region: 'Malang', saksi: 9800, confirmed: 9500, tps: 9800 },
  { region: 'Sidoarjo', saksi: 8200, confirmed: 8000, tps: 8200 },
  { region: 'Gresik', saksi: 7500, confirmed: 7200, tps: 7500 },
  { region: 'Jember', saksi: 6800, confirmed: 6500, tps: 6800 },
  { region: 'Lainnya', saksi: 42700, confirmed: 39825, tps: 42700 },
];

const recentSaksi = [
  { id: 1, name: 'Ahmad Sudirman', region: 'Surabaya', tps: 'TPS 001', status: 'confirmed', phone: '0812****1234', registered: '2 jam lalu' },
  { id: 2, name: 'Siti Rahayu', region: 'Malang', tps: 'TPS 015', status: 'confirmed', phone: '0813****5678', registered: '3 jam lalu' },
  { id: 3, name: 'Budi Santoso', region: 'Sidoarjo', tps: 'TPS 008', status: 'pending', phone: '0812****9012', registered: '5 jam lalu' },
  { id: 4, name: 'Dewi Kusuma', region: 'Gresik', tps: 'TPS 022', status: 'confirmed', phone: '0815****3456', registered: '6 jam lalu' },
  { id: 5, name: 'Eko Prasetyo', region: 'Jember', tps: 'TPS 011', status: 'pending', phone: '0812****7890', registered: '8 jam lalu' },
];

const pengamananSuara = [
  { 
    wilayah: 'Surabaya', 
    tps: 12500, 
    saksi: 12500, 
    koordinator: 125,
    quickCount: true,
    cctv: 8500
  },
  { 
    wilayah: 'Malang Raya', 
    tps: 9800, 
    saksi: 9800, 
    koordinator: 98,
    quickCount: true,
    cctv: 7200
  },
  { 
    wilayah: 'Sidoarjo', 
    tps: 8200, 
    saksi: 8200, 
    koordinator: 82,
    quickCount: true,
    cctv: 6100
  },
  { 
    wilayah: 'Gresik', 
    tps: 7500, 
    saksi: 7500, 
    koordinator: 75,
    quickCount: false,
    cctv: 5200
  },
  { 
    wilayah: 'Jember', 
    tps: 6800, 
    saksi: 6800, 
    koordinator: 68,
    quickCount: false,
    cctv: 4800
  },
];

export function SaksiDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  const getStatusBadge = (status: string) => {
    const styles = {
      confirmed: 'bg-green-500',
      pending: 'bg-yellow-500',
      rejected: 'bg-red-500',
    };
    const labels = {
      confirmed: 'Terverifikasi',
      pending: 'Menunggu',
      rejected: 'Ditolak',
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
                <p className="text-gray-500 text-xs">TOTAL SAKSI</p>
                <p className="text-2xl font-bold">{saksiStats.total.toLocaleString()}</p>
                <p className="text-green-600 text-xs flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> 100% TPS
                </p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs">TERVERIFIKASI</p>
                <p className="text-2xl font-bold text-green-600">{saksiStats.confirmed.toLocaleString()}</p>
                <p className="text-gray-500 text-xs">
                  {Math.round((saksiStats.confirmed / saksiStats.total) * 100)}% dari total
                </p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs">MENUNGGU</p>
                <p className="text-2xl font-bold text-yellow-600">{saksiStats.pending.toLocaleString()}</p>
                <p className="text-gray-500 text-xs">
                  {Math.round((saksiStats.pending / saksiStats.total) * 100)}% dari total
                </p>
              </div>
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs">TPS TERTUTUP</p>
                <p className="text-2xl font-bold text-green-600">{saksiStats.byTPS.covered.toLocaleString()}</p>
                <p className="text-gray-500 text-xs">
                  {Math.round((saksiStats.byTPS.covered / saksiStats.byTPS.totalTPS) * 100)}% tercakup
                </p>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="regions">Per Wilayah</TabsTrigger>
          <TabsTrigger value="pengamanan">Pengamanan Suara</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid lg:grid-cols-2 gap-4">
            {/* Readiness Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Kesiapan Saksi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={readinessData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {readinessData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-center mt-4">
                  <p className="text-3xl font-bold text-green-600">95%</p>
                  <p className="text-sm text-gray-500">Tingkat Kesiapan</p>
                </div>
              </CardContent>
            </Card>

            {/* Recent Saksi */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Saksi Terbaru</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentSaksi.map((saksi) => (
                    <div key={saksi.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                          <span className="text-yellow-600 font-bold text-sm">
                            {saksi.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-sm">{saksi.name}</p>
                          <p className="text-xs text-gray-500">{saksi.region} • {saksi.tps}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        {getStatusBadge(saksi.status)}
                        <p className="text-xs text-gray-500 mt-1">{saksi.registered}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="regions" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Distribusi Saksi per Wilayah</CardTitle>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <Input 
                      placeholder="Cari wilayah..." 
                      className="pl-9 w-48"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={regionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="region" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="saksi" name="Total Saksi" fill="#3b82f6" />
                    <Bar dataKey="confirmed" name="Terverifikasi" fill="#22c55e" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4">
            {regionData.map((region, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-yellow-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">{region.region}</h4>
                        <p className="text-sm text-gray-500">{region.tps} TPS</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="text-right">
                        <p className="text-xl font-bold">{region.saksi.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">Total Saksi</p>
                      </div>
                      <div className="text-right">
                        <p className={cn(
                          "text-xl font-bold",
                          (region.confirmed / region.saksi) >= 0.95 ? 'text-green-600' : 'text-yellow-600'
                        )}>
                          {Math.round((region.confirmed / region.saksi) * 100)}%
                        </p>
                        <p className="text-xs text-gray-500">Terverifikasi</p>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pengamanan" className="space-y-4">
          <div className="grid gap-4">
            {pengamananSuara.map((wilayah, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <Shield className="w-5 h-5 text-yellow-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">{wilayah.wilayah}</h4>
                        <p className="text-sm text-gray-500">{wilayah.koordinator} Koordinator</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={wilayah.quickCount ? 'bg-green-500' : 'bg-yellow-500'}>
                        Quick Count {wilayah.quickCount ? 'Ready' : 'Pending'}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4">
                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                      <p className="text-lg font-bold">{wilayah.tps.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">TPS</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                      <p className="text-lg font-bold">{wilayah.saksi.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">Saksi</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                      <p className="text-lg font-bold">{wilayah.cctv.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">CCTV</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                      <p className="text-lg font-bold text-green-600">
                        {Math.round((wilayah.cctv / wilayah.tps) * 100)}%
                      </p>
                      <p className="text-xs text-gray-500">Cakupan</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
