import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Cpu, 
  Brain, 
  BarChart3, 
  MessageSquare, 
  Globe, 
  Shield, 
  Zap,
  CheckCircle2,
  TrendingUp,
  Eye,
  Database,
  Network,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';

const aiFeatures = [
  {
    icon: Brain,
    title: 'AI Sentiment Analysis',
    description: 'Analisis sentimen real-time dari media sosial dan berita menggunakan Natural Language Processing (NLP) untuk memahami opini publik.',
    accuracy: 94.5,
    status: 'active'
  },
  {
    icon: BarChart3,
    title: 'Predictive Analytics',
    description: 'Prediksi elektabilitas dan hasil pemilu menggunakan machine learning berdasarkan data historis dan tren saat ini.',
    accuracy: 89.2,
    status: 'active'
  },
  {
    icon: Globe,
    title: 'Geo-Political Mapping',
    description: 'Pemetaan kekuatan politik per wilayah dengan analisis spasial untuk strategi kampanye yang terarah.',
    accuracy: 96.8,
    status: 'active'
  },
  {
    icon: MessageSquare,
    title: 'Chatbot Assistant',
    description: 'Asisten virtual berbasis AI untuk menjawab pertanyaan relawan dan kader 24/7.',
    accuracy: 91.5,
    status: 'active'
  },
  {
    icon: Eye,
    title: 'Image Recognition',
    description: 'Deteksi dan analisis visual dari baliho, spanduk, dan materi kampanye untuk monitoring.',
    accuracy: 93.7,
    status: 'beta'
  },
  {
    icon: Database,
    title: 'Smart Data Integration',
    description: 'Integrasi otomatis dari berbagai sumber data: internal, relawan, media sosial, dan media online.',
    accuracy: 98.2,
    status: 'active'
  },
];

const howItWorks = [
  {
    step: 1,
    title: 'Data Collection',
    description: 'AI mengumpulkan data dari 5 sumber utama: Database Internal, Laporan Relawan, Social Media Monitoring, Media Online, dan Input Manual.',
    icon: Database
  },
  {
    step: 2,
    title: 'Data Processing',
    description: 'Data diproses menggunakan algoritma Machine Learning untuk membersihkan, mengkategorikan, dan menganalisis informasi.',
    icon: Cpu
  },
  {
    step: 3,
    title: 'Pattern Recognition',
    description: 'AI mengidentifikasi pola, tren, dan anomali dalam data untuk menghasilkan insight yang actionable.',
    icon: Brain
  },
  {
    step: 4,
    title: 'Prediction & Recommendation',
    description: 'Berdasarkan analisis, AI memberikan prediksi dan rekomendasi strategis untuk pengambilan keputusan.',
    icon: Sparkles
  },
  {
    step: 5,
    title: 'Real-time Dashboard',
    description: 'Semua informasi ditampilkan dalam dashboard interaktif yang diperbarui secara real-time.',
    icon: BarChart3
  },
];

const advantages = [
  {
    title: 'Real-time Insights',
    description: 'Dapatkan informasi terkini tentang elektabilitas, sentimen, dan aktivitas kampanye dalam hitungan detik.',
    icon: Zap
  },
  {
    title: 'Data-driven Decisions',
    description: 'Pengambilan keputusan berdasarkan data dan analisis, bukan hanya intuisi atau perkiraan.',
    icon: BarChart3
  },
  {
    title: 'Predictive Power',
    description: 'Prediksi hasil pemilu dan tren dengan akurasi tinggi menggunakan algoritma machine learning.',
    icon: TrendingUp
  },
  {
    title: 'Comprehensive Monitoring',
    description: 'Pantau semua aspek kampanye dari satu dashboard: kanvasing, sosial media, saksi, dan keuangan.',
    icon: Eye
  },
  {
    title: 'Automated Reporting',
    description: 'Laporan otomatis yang menghemat waktu tim untuk fokus pada strategi dan eksekusi.',
    icon: CheckCircle2
  },
  {
    title: 'Secure & Scalable',
    description: 'Sistem yang aman dengan enkripsi end-to-end dan dapat diskalakan sesuai kebutuhan.',
    icon: Shield
  },
];

const dataSources = [
  { name: 'Database Internal', status: 'connected', lastUpdate: '2 menit lalu', records: 2850000 },
  { name: 'Laporan Relawan', status: 'connected', lastUpdate: '5 menit lalu', records: 125000 },
  { name: 'Social Media', status: 'connected', lastUpdate: 'Realtime', records: 4200000 },
  { name: 'Media Online', status: 'connected', lastUpdate: '10 menit lalu', records: 85000 },
  { name: 'AI Analysis', status: 'processing', lastUpdate: 'Realtime', records: 0 },
];

export function AITechnology() {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl p-8 text-white">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
            <Brain className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">AI-Powered Dashboard</h1>
            <p className="text-yellow-100">Teknologi Artificial Intelligence untuk Pemenangan Pemilu</p>
          </div>
        </div>
        <p className="text-lg text-yellow-50 max-w-3xl">
          Dashboard ini menggunakan teknologi AI canggih untuk menganalisis data dari berbagai sumber, 
          memberikan prediksi akurat, dan membantu pengambilan keputusan strategis berbasis data.
        </p>
      </div>

      {/* AI Features */}
      <div>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Cpu className="w-6 h-6 text-yellow-600" />
          Fitur AI
        </h2>
        <div className="grid lg:grid-cols-2 gap-4">
          {aiFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold">{feature.title}</h3>
                        <Badge variant={feature.status === 'active' ? 'default' : 'secondary'}>
                          {feature.status === 'active' ? 'Aktif' : 'Beta'}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{feature.description}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">Akurasi:</span>
                        <Progress value={feature.accuracy} className="w-24 h-2" />
                        <span className="text-sm font-medium text-green-600">{feature.accuracy}%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* How It Works */}
      <div>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Network className="w-6 h-6 text-yellow-600" />
          Cara Kerja AI
        </h2>
        <div className="relative">
          {/* Connection Line */}
          <div className="absolute left-8 top-16 bottom-16 w-0.5 bg-yellow-200 hidden lg:block" />
          
          <div className="space-y-4">
            {howItWorks.map((step, index) => {
              const Icon = step.icon;
              return (
                <Card key={index} className="relative">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-yellow-500 rounded-xl flex items-center justify-center flex-shrink-0 z-10">
                        <div className="text-center text-white">
                          <Icon className="w-6 h-6 mx-auto" />
                          <span className="text-xs font-bold">Step {step.step}</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                        <p className="text-gray-600">{step.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Data Sources */}
      <div>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Database className="w-6 h-6 text-yellow-600" />
          Sumber Data
        </h2>
        <div className="grid lg:grid-cols-5 gap-4">
          {dataSources.map((source, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-4">
                <div className={cn(
                  "w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center",
                  source.status === 'connected' ? 'bg-green-100' : 'bg-yellow-100'
                )}>
                  <div className={cn(
                    "w-3 h-3 rounded-full",
                    source.status === 'connected' ? 'bg-green-500' : 'bg-yellow-500'
                  )} />
                </div>
                <h4 className="font-medium text-sm">{source.name}</h4>
                <p className="text-xs text-gray-500 mt-1">{source.lastUpdate}</p>
                {source.records > 0 && (
                  <p className="text-lg font-bold mt-2">
                    {source.records >= 1000000 
                      ? (source.records / 1000000).toFixed(1) + 'M' 
                      : (source.records / 1000).toFixed(0) + 'K'}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Advantages */}
      <div>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-yellow-600" />
          Keunggulan Teknologi
        </h2>
        <div className="grid lg:grid-cols-3 gap-4">
          {advantages.map((advantage, index) => {
            const Icon = advantage.icon;
            return (
              <Card key={index} className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
                <CardContent className="p-5">
                  <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold mb-2">{advantage.title}</h3>
                  <p className="text-sm text-gray-600">{advantage.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-4">Siap Mengoptimalkan Kampanye Anda?</h2>
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
          Dashboard AI ini dirancang untuk membantu tim pemenangan membuat keputusan yang lebih baik, 
          lebih cepat, dan berbasis data. Dengan teknologi AI, setiap langkah kampanye menjadi lebih terukur dan efektif.
        </p>
        <div className="flex justify-center gap-4">
          <div className="bg-white/10 rounded-lg px-6 py-3">
            <p className="text-3xl font-bold text-yellow-400">94.5%</p>
            <p className="text-sm text-gray-400">Rata-rata Akurasi AI</p>
          </div>
          <div className="bg-white/10 rounded-lg px-6 py-3">
            <p className="text-3xl font-bold text-yellow-400">5</p>
            <p className="text-sm text-gray-400">Sumber Data Terintegrasi</p>
          </div>
          <div className="bg-white/10 rounded-lg px-6 py-3">
            <p className="text-3xl font-bold text-yellow-400">Realtime</p>
            <p className="text-sm text-gray-400">Update Dashboard</p>
          </div>
        </div>
      </div>
    </div>
  );
}
