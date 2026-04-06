import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, MessageCircle, Share2, Eye, ThumbsUp, AlertTriangle } from 'lucide-react';

const sentimentData = [
  { name: 'Positif', value: 72, color: '#22c55e' },
  { name: 'Netral', value: 18, color: '#9ca3af' },
  { name: 'Negatif', value: 10, color: '#ef4444' },
];

const platformData = [
  { platform: 'TikTok', positif: 78, netral: 15, negatif: 7, engagement: 1250000 },
  { platform: 'Instagram', positif: 75, netral: 18, negatif: 7, engagement: 980000 },
  { platform: 'Twitter/X', positif: 68, netral: 22, negatif: 10, engagement: 650000 },
  { platform: 'Facebook', positif: 71, netral: 19, negatif: 10, engagement: 820000 },
  { platform: 'YouTube', positif: 74, netral: 16, negatif: 10, engagement: 450000 },
];

const trendingTopics = [
  { topic: 'Kelangkaan Pupuk', mentions: 45200, sentiment: 'negatif', location: 'Jember/Banyuwangi' },
  { topic: 'Banjir Rob', mentions: 38900, sentiment: 'negatif', location: 'Gresik/Surabaya' },
  { topic: 'Lapangan Kerja', mentions: 32500, sentiment: 'positif', location: 'Malang' },
  { topic: 'Infrastruktur Jalan', mentions: 28100, sentiment: 'positif', location: 'Jatim' },
  { topic: 'Program KTA', mentions: 24500, sentiment: 'positif', location: 'Jatim' },
];

const youthEngagementData = [
  { month: 'Jan', followers: 45000, engagement: 12.5 },
  { month: 'Feb', followers: 52000, engagement: 13.2 },
  { month: 'Mar', followers: 61000, engagement: 14.1 },
  { month: 'Apr', followers: 78000, engagement: 15.3 },
  { month: 'Mei', followers: 95000, engagement: 16.8 },
  { month: 'Jun', followers: 112000, engagement: 18.2 },
];

const aiRecommendations = [
  {
    title: 'Fokus Kunjungan',
    description: 'Tuban & Bojonegoro membutuhkan perhatian khusus. Amankan 3% Swing Voters.',
    priority: 'high',
    action: 'Jadwalkan kunjungan Ketua Umum'
  },
  {
    title: 'Respons Cepat Isu',
    description: 'Kelangkaan pupuk di Jember perlu respons dalam 24 jam.',
    priority: 'high',
    action: 'Koordinasi dengan Dinas Pertanian'
  },
  {
    title: 'Konten Youth',
    description: 'Tingkatkan konten tentang lapangan kerja untuk anak muda.',
    priority: 'medium',
    action: 'Buat video series #KerjaDiJatim'
  },
];

export function SocialMediaDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs">TOTAL MENTION</p>
                <p className="text-2xl font-bold">4.2M</p>
                <p className="text-green-600 text-xs flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> +12.5%
                </p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs">ENGAGEMENT</p>
                <p className="text-2xl font-bold">16.8%</p>
                <p className="text-green-600 text-xs flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> +2.3%
                </p>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Share2 className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs">REACH</p>
                <p className="text-2xl font-bold">12.5M</p>
                <p className="text-green-600 text-xs flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> +8.7%
                </p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Eye className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs">YOUTH FOLLOWERS</p>
                <p className="text-2xl font-bold">112K</p>
                <p className="text-green-600 text-xs flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> +18.2%
                </p>
              </div>
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <ThumbsUp className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Sentimen Overview</TabsTrigger>
          <TabsTrigger value="platform">Platform Breakdown</TabsTrigger>
          <TabsTrigger value="youth">Youth Engagement</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid lg:grid-cols-2 gap-4">
            {/* Sentiment Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Sentimen Media Sosial</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sentimentData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {sentimentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-6 mt-4">
                  {sentimentData.map((item) => (
                    <div key={item.name} className="text-center">
                      <p className="text-2xl font-bold" style={{ color: item.color }}>{item.value}%</p>
                      <p className="text-xs text-gray-500">{item.name}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Trending Topics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Isu Lokal Terpopuler</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {trendingTopics.map((topic, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                          {index + 1}
                        </span>
                        <div>
                          <p className="font-medium text-sm">{topic.topic}</p>
                          <p className="text-xs text-gray-500">{topic.location}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-sm">{topic.mentions.toLocaleString()}</p>
                        <Badge 
                          className={topic.sentiment === 'positif' ? 'bg-green-500' : 'bg-red-500'}
                        >
                          {topic.sentiment}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="platform" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Sentimen per Platform</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={platformData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="platform" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="positif" name="Positif" fill="#22c55e" />
                    <Bar dataKey="netral" name="Netral" fill="#9ca3af" />
                    <Bar dataKey="negatif" name="Negatif" fill="#ef4444" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            {platformData.map((platform) => (
              <Card key={platform.platform}>
                <CardContent className="p-4">
                  <p className="text-gray-500 text-xs">{platform.platform}</p>
                  <p className="text-xl font-bold">{(platform.engagement / 1000).toFixed(0)}K</p>
                  <p className="text-xs text-gray-500">engagement</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="youth" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Pertumbuhan Youth Engagement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={youthEngagementData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="followers" name="Followers" stroke="#eab308" strokeWidth={2} />
                    <Line yAxisId="right" type="monotone" dataKey="engagement" name="Engagement Rate %" stroke="#22c55e" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* AI Recommendations */}
      <Card className="border-yellow-300 bg-gradient-to-r from-yellow-50 to-orange-50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
            AI Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-3 gap-4">
            {aiRecommendations.map((rec, index) => (
              <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-sm">{rec.title}</h4>
                  <Badge 
                    className={rec.priority === 'high' ? 'bg-red-500' : 'bg-yellow-500'}
                  >
                    {rec.priority}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3">{rec.description}</p>
                <p className="text-xs text-yellow-600 font-medium">{rec.action}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
