import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Map as MapIcon, 
  ShieldAlert, 
  BarChart3, 
  Bell, 
  Settings, 
  ChevronRight,
  TrendingUp,
  Activity,
  UserCheck,
  MapPin
} from 'lucide-react';
import { NotFound } from './components/NotFound';

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const stats = [
    { label: 'Relawan Aktif', value: '12,482', change: '+12%', icon: Users, color: 'text-blue-500' },
    { label: 'Cakupan Wilayah', value: '38/38', change: '100%', icon: MapPin, color: 'text-emerald-500' },
    { label: 'Sentimen Positif', value: '68.4%', change: '+5.2%', icon: TrendingUp, color: 'text-amber-500' },
    { label: 'Total Pemilih', value: '2.4M', change: '+2.1%', icon: UserCheck, color: 'text-purple-500' },
  ];

  const menuItems = [
    { id: 'dashboard', label: 'Ringkasan Utama', icon: LayoutDashboard },
    { id: 'relawan', label: 'Manajemen Relawan', icon: Users },
    { id: 'peta', label: 'Peta Elektabilitas', icon: MapIcon },
    { id: 'analisis', label: 'Analisis Data', icon: BarChart3 },
    { id: 'monitoring', label: 'Monitoring Medsos', icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-slate-200 font-sans selection:bg-yellow-500/30">
      {/* Sidebar Overlay (Mobile) */}
      
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-[#0f0f12] border-r border-white/5 z-40 hidden md:block">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-500/20">
              <ShieldAlert className="text-[#0a0a0c] w-6 h-6" />
            </div>
            <div>
              <h1 className="font-bold text-white leading-none">WAR ROOM</h1>
              <p className="text-[10px] text-yellow-500 font-mono tracking-tighter uppercase mt-1">Golkar Jawa Timur</p>
            </div>
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => (
              <NavItem 
                key={item.id}
                icon={item.icon} 
                label={item.label} 
                active={activeTab === item.id} 
                onClick={() => setActiveTab(item.id)}
              />
            ))}
          </nav>

          <div className="mt-12">
            <p className="px-4 text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-4">Sistem</p>
            <nav className="space-y-1">
              <NavItem 
                icon={Settings} 
                label="Pengaturan" 
                active={activeTab === 'settings'} 
                onClick={() => setActiveTab('settings')}
              />
              <NavItem 
                icon={Bell} 
                label="Notifikasi" 
                badge="3" 
                active={activeTab === 'notifications'} 
                onClick={() => setActiveTab('notifications')}
              />
            </nav>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#0a0a0c] to-transparent pt-12">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
            <div className="w-8 h-8 rounded-full bg-slate-700"></div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-white truncate">Admin Operator</p>
              <p className="text-[10px] text-slate-500 truncate">Sesi Aktif: 2j 4m</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="md:ml-64 min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-30 h-16 border-b border-white/5 bg-[#0a0a0c]/80 backdrop-blur-md px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-400">
            <span className="text-xs">Halaman</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-xs text-white font-medium">
              {activeTab === 'dashboard' ? 'Ringkasan Utama' : menuItems.find(i => i.id === activeTab)?.label || 'Akses Terbatas'}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-[10px] font-medium text-emerald-500 uppercase tracking-wider">Live Monitoring</span>
            </div>
            <button className="p-2 rounded-lg hover:bg-white/5 transition-colors text-slate-400">
              <Bell className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className={`p-6 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {activeTab === 'dashboard' ? (
            <>
              {/* Welcome Banner */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-yellow-600/20 to-yellow-900/10 border border-yellow-500/20 p-8 mb-8">
                <div className="relative z-10">
                  <h2 className="text-2xl font-bold text-white mb-2">Pusat Kendali Digital Golkar Jatim</h2>
                  <p className="text-slate-400 max-w-2xl text-sm leading-relaxed">
                    Selamat datang kembali. Sistem saat ini sedang memproses data real-time dari 38 kabupaten/kota untuk memberikan analisis pergerakan elektabilitas terkini.
                  </p>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-[80px] -mr-32 -mt-32"></div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, i) => (
                  <div key={i} className="bg-[#0f0f12] border border-white/5 p-6 rounded-2xl hover:border-white/10 transition-colors group">
                    <div className="flex justify-between items-start mb-4">
                      <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform`}>
                        <stat.icon className="w-5 h-5" />
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-1 rounded bg-white/5 ${stat.change.startsWith('+') ? 'text-emerald-500' : 'text-slate-400'}`}>
                        {stat.change}
                      </span>
                    </div>
                    <p className="text-slate-500 text-xs mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-white tracking-tight">{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Main Activity Area */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Chart Placeholder */}
                <div className="lg:col-span-2 bg-[#0f0f12] border border-white/5 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h3 className="font-bold text-white">Grafik Elektabilitas</h3>
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider">Perbandingan per minggu</p>
                    </div>
                    <select className="bg-white/5 border border-white/10 text-xs rounded-lg px-3 py-1 text-slate-300 outline-none">
                      <option>7 Hari Terakhir</option>
                      <option>30 Hari Terakhir</option>
                    </select>
                  </div>
                  <div className="h-[300px] flex items-end gap-1 px-2">
                    {[40, 60, 45, 80, 90, 70, 85, 95, 65, 55, 75, 45, 30].map((h, i) => (
                      <div key={i} className="flex-1 bg-gradient-to-t from-yellow-500/20 to-yellow-500/40 rounded-t-sm group relative" style={{ height: `${h}%` }}>
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-yellow-500 text-[#0a0a0c] text-[8px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                          {h}%
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-6 px-2 text-[10px] text-slate-600 font-mono">
                    <span>01 MAR</span>
                    <span>08 MAR</span>
                    <span>15 MAR</span>
                    <span>22 MAR</span>
                    <span>29 MAR</span>
                  </div>
                </div>

                {/* Recent Alerts */}
                <div className="bg-[#0f0f12] border border-white/5 rounded-2xl p-6">
                  <h3 className="font-bold text-white mb-6">Aktivitas Wilayah</h3>
                  <div className="space-y-6">
                    <ActivityItem 
                      city="Surabaya" 
                      desc="Kenaikan pendaftaran relawan baru di wilayah Wonokromo."
                      time="2 menit lalu"
                      type="up"
                    />
                    <ActivityItem 
                      city="Malang City" 
                      desc="Diskusi publik sentimen positif mencapai puncak 30 hari."
                      time="15 menit lalu"
                      type="trending"
                    />
                    <ActivityItem 
                      city="Gresik" 
                      desc="Distribusi logistik kampanye selesai untuk zona A."
                      time="1 jam lalu"
                      type="check"
                    />
                    <ActivityItem 
                      city="Sidoarjo" 
                      desc="Rapat koordinasi tingkat ranting dijadwalkan ulang."
                      time="3 jam lalu"
                      type="alert"
                    />
                  </div>
                  <button className="w-full mt-8 py-3 rounded-xl bg-white/5 border border-white/5 text-xs font-semibold text-slate-400 hover:bg-white/10 hover:text-white transition-all">
                    Lihat Semua Laporan
                  </button>
                </div>
              </div>
            </>
          ) : (
            <NotFound 
              onBack={() => setActiveTab('dashboard')} 
              title={menuItems.find(i => i.id === activeTab)?.label || 'Akses Terbatas'} 
            />
          )}
        </div>
      </main>


      {/* Footer Info */}
      <footer className="md:ml-64 border-t border-white/5 p-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[10px] text-slate-600 font-mono">© 2026 DIGITAL WAR ROOM | GOLKAR JAWA TIMUR v1.0.4-BETA</p>
        <div className="flex items-center gap-4 text-[10px] text-slate-600">
          <span className="flex items-center gap-1.5">
            <div className="w-1 h-1 rounded-full bg-emerald-500"></div>
            System Online
          </span>
          <span>Latensi: 42ms</span>
          <span>Sesi ID: {Math.random().toString(36).substring(7).toUpperCase()}</span>
        </div>
      </footer>
    </div>
  );
}

function NavItem({ 
  icon: Icon, 
  label, 
  active = false, 
  badge = null, 
  onClick 
}: { 
  icon: any; 
  label: string; 
  active?: boolean; 
  badge?: string | null; 
  onClick?: () => void; 
}) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${active ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/10' : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'}`}
    >
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5" />
        <span className="text-sm font-medium">{label}</span>
      </div>
      {badge && (
        <span className="w-5 h-5 flex items-center justify-center bg-yellow-500 text-[#0a0a0c] text-[10px] font-bold rounded-lg leading-none">
          {badge}
        </span>
      )}
    </button>
  );
}

function ActivityItem({ 
  city, 
  desc, 
  time, 
  type 
}: { 
  city: string; 
  desc: string; 
  time: string; 
  type: 'up' | 'trending' | 'check' | 'alert'; 
}) {
  const icons = {
    up: { icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    trending: { icon: Activity, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    check: { icon: UserCheck, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    alert: { icon: ShieldAlert, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  };

  const config = icons[type];

  return (
    <div className="flex gap-4">
      <div className={`shrink-0 w-10 h-10 rounded-xl ${config.bg} flex items-center justify-center ${config.color}`}>
        <config.icon className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-1">
          <p className="text-sm font-bold text-white truncate">{city}</p>
          <span className="text-[10px] text-slate-600 shrink-0">{time}</span>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
          {desc}
        </p>
      </div>
    </div>
  );
}

