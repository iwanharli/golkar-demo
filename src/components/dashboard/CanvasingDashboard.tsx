import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Target, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  UserPlus,
  Building2,
  Vote
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ktaData = {
  total: 2850000,
  target: 3500000,
  newThisMonth: 45000,
  growth: 12.5,
  byRegion: [
    { region: 'Surabaya', count: 520000, target: 600000 },
    { region: 'Malang', count: 380000, target: 450000 },
    { region: 'Sidoarjo', count: 320000, target: 380000 },
    { region: 'Gresik', count: 280000, target: 320000 },
    { region: 'Jember', count: 250000, target: 320000 },
    { region: 'Lainnya', count: 1100000, target: 1430000 },
  ]
};

const canvasingProgress = [
  { 
    id: 1, 
    name: 'Door to Door Surabaya', 
    type: 'door',
    target: 50000, 
    achieved: 42500, 
    volunteers: 250,
    status: 'on_track',
    deadline: '30 Jun 2026'
  },
  { 
    id: 2, 
    name: 'Kampanye Malang Raya', 
    type: 'campaign',
    target: 35000, 
    achieved: 28000, 
    volunteers: 180,
    status: 'at_risk',
    deadline: '25 Jun 2026'
  },
  { 
    id: 3, 
    name: 'Sosialisasi Program', 
    type: 'education',
    target: 25000, 
    achieved: 22000, 
    volunteers: 120,
    status: 'on_track',
    deadline: '28 Jun 2026'
  },
  { 
    id: 4, 
    name: 'Rekrutmen KTA Gen Z', 
    type: 'recruitment',
    target: 15000, 
    achieved: 18500, 
    volunteers: 80,
    status: 'exceeded',
    deadline: '30 Jun 2026'
  },
];

const volunteerActivity = [
  { day: 'Sen', visits: 12500, calls: 8500 },
  { day: 'Sel', visits: 14200, calls: 9200 },
  { day: 'Rab', visits: 11800, calls: 7800 },
  { day: 'Kam', visits: 16500, calls: 11200 },
  { day: 'Jum', visits: 15800, calls: 10500 },
  { day: 'Sab', visits: 22100, calls: 4500 },
  { day: 'Min', visits: 18500, calls: 3200 },
];

const partyMachines = [
  { 
    name: 'PAC (Pengurus Anak Cabang)', 
    total: 1425, 
    active: 1380, 
    inactive: 45,
    performance: 96.8 
  },
  { 
    name: 'PR (Pengurus Ranting)', 
    total: 8750, 
    active: 8200, 
    inactive: 550,
    performance: 93.7 
  },
  { 
    name: 'KTA (Kader Terdaftar)', 
    total: 2850000, 
    active: 2450000, 
    inactive: 400000,
    performance: 85.9 
  },
  { 
    name: 'Relawan Aktif', 
    total: 125000, 
    active: 112500, 
    inactive: 12500,
    performance: 90.0 
  },
];

const logisticDistribution = [
  { item: 'Baliho', distributed: 850, total: 1000, unit: 'unit' },
  { item: 'Kaos', distributed: 12500, total: 15000, unit: 'pcs' },
  { item: 'Sticker', distributed: 45000, total: 50000, unit: 'pcs' },
  { item: 'Brosur', distributed: 280000, total: 350000, unit: 'lembar' },
  { item: 'Spanduk', distributed: 3200, total: 4000, unit: 'unit' },
];

export function CanvasingDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const getStatusBadge = (status: string) => {
    const styles = {
      on_track: 'bg-green-500',
      at_risk: 'bg-yellow-500',
      exceeded: 'bg-blue-500',
      delayed: 'bg-red-500',
    };
    const labels = {
      on_track: 'On Track',
      at_risk: 'At Risk',
      exceeded: 'Exceeded',
      delayed: 'Delayed',
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
                <p className="text-gray-500 text-xs">TOTAL KTA</p>
                <p className="text-2xl font-bold">{(ktaData.total / 1000000).toFixed(1)}M</p>
                <p className="text-green-600 text-xs flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> +{ktaData.growth}%
                </p>
              </div>
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs">TARGET KTA</p>
                <p className="text-2xl font-bold">{(ktaData.target / 1000000).toFixed(1)}M</p>
                <p className="text-gray-500 text-xs">
                  {Math.round((ktaData.total / ktaData.target) * 100)}% tercapai
                </p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs">RELAWAN AKTIF</p>
                <p className="text-2xl font-bold">112.5K</p>
                <p className="text-green-600 text-xs flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> +8.2%
                </p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <UserPlus className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs">MESIN PARTAI</p>
                <p className="text-2xl font-bold">91.4%</p>
                <p className="text-green-600 text-xs flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Aktif
                </p>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Kanvasing Progress</TabsTrigger>
          <TabsTrigger value="machine">Mesin Partai</TabsTrigger>
          <TabsTrigger value="logistic">Distribusi Logistik</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Canvasing Progress */}
          <div className="grid gap-4">
            {canvasingProgress.map((program) => (
              <Card key={program.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{program.name}</h4>
                        {getStatusBadge(program.status)}
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" /> {program.volunteers} relawan
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" /> {program.deadline}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">
                        {Math.round((program.achieved / program.target) * 100)}%
                      </p>
                      <p className="text-xs text-gray-500">
                        {program.achieved.toLocaleString()} / {program.target.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <Progress 
                    value={(program.achieved / program.target) * 100} 
                    className={cn(
                      "h-2",
                      program.status === 'exceeded' ? 'bg-blue-500' :
                      program.status === 'on_track' ? 'bg-green-500' :
                      program.status === 'at_risk' ? 'bg-yellow-500' : 'bg-red-500'
                    )}
                  />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Volunteer Activity Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Aktivitas Relawan Minggu Ini</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={volunteerActivity}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="visits" name="Kunjungan" fill="#eab308" />
                    <Bar dataKey="calls" name="Telepon" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="machine" className="space-y-4">
          {/* Party Machine Status */}
          <div className="grid gap-4">
            {partyMachines.map((machine, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-medium">{machine.name}</h4>
                      <p className="text-sm text-gray-500">
                        {machine.active.toLocaleString()} aktif dari {machine.total.toLocaleString()} total
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={cn(
                        "text-2xl font-bold",
                        machine.performance >= 90 ? 'text-green-600' :
                        machine.performance >= 80 ? 'text-yellow-600' : 'text-red-600'
                      )}>
                        {machine.performance}%
                      </p>
                      <p className="text-xs text-gray-500">performa</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Progress value={machine.performance} className="h-2" />
                    </div>
                  </div>
                  <div className="flex gap-4 mt-3 text-sm">
                    <span className="flex items-center gap-1 text-green-600">
                      <CheckCircle2 className="w-4 h-4" /> {machine.active.toLocaleString()} Aktif
                    </span>
                    <span className="flex items-center gap-1 text-red-600">
                      <AlertCircle className="w-4 h-4" /> {machine.inactive.toLocaleString()} Nonaktif
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* KTA Growth Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Pertumbuhan KTA per Wilayah</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ktaData.byRegion} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="region" type="category" width={100} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" name="Saat Ini" fill="#eab308" />
                    <Bar dataKey="target" name="Target" fill="#e5e7eb" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logistic" className="space-y-4">
          {/* Logistic Distribution */}
          <div className="grid gap-4">
            {logisticDistribution.map((item, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <Vote className="w-5 h-5 text-yellow-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">{item.item}</h4>
                        <p className="text-sm text-gray-500">
                          {item.distributed.toLocaleString()} {item.unit} terdistribusi
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">
                        {Math.round((item.distributed / item.total) * 100)}%
                      </p>
                    </div>
                  </div>
                  <Progress 
                    value={(item.distributed / item.total) * 100} 
                    className="h-2"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Target: {item.total.toLocaleString()} {item.unit}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
