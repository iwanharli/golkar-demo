import { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { ExecutiveSummary } from './components/dashboard/ExecutiveSummary';
import { ElectabilityMap } from './components/dashboard/ElectabilityMap';
import { CanvasingDashboard } from './components/dashboard/CanvasingDashboard';
import { SocialMediaDashboard } from './components/dashboard/SocialMediaDashboard';
import { SaksiDashboard } from './components/dashboard/SaksiDashboard';
import { FinancialDashboard } from './components/dashboard/FinancialDashboard';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <ExecutiveSummary />;
      case 'electability':
        return <ElectabilityMap />;
      case 'canvasing':
        return <CanvasingDashboard />;
      case 'social':
        return <SocialMediaDashboard />;
      case 'saksi':
        return <SaksiDashboard />;
      case 'financial':
        return <FinancialDashboard />;
      default:
        return <ExecutiveSummary />;
    }
  };

  const getPageTitle = () => {
    const titles: Record<string, string> = {
      'dashboard': 'Executive Summary',
      'electability': 'Peta Elektabilitas & Geo Politik',
      'canvasing': 'Monitoring Kanvasing & Mesin Partai',
      'social': 'Social Media Sentimen & Youth Engagement',
      'saksi': 'Database Saksi & Pengaman Suara',
      'financial': 'Financial Compliance & Fund Tracking',
    };
    return titles[activeTab] || 'Dashboard';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="lg:ml-72">
        {/* Header */}
        <Header onMenuClick={() => setSidebarOpen(true)} />

        {/* Page Content */}
        <main className="p-4 lg:p-6">
          {/* Page Title */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">{getPageTitle()}</h1>
            <p className="text-gray-500 text-sm mt-1">
              Terakhir diperbarui: {new Date().toLocaleString('id-ID', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>

          {/* Content */}
          {renderContent()}
        </main>

        {/* Footer */}
        <footer className="border-t bg-white p-4 lg:p-6 lg:ml-0">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="text-center lg:text-left">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">War Room Digital</span> - DPW Partai Golkar Jawa Timur
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Pemilu 2029 • Powered by AI Technology
              </p>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>Data Sources:</span>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Internal</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">Relawan</span>
                <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">Social</span>
                <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs">Media</span>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs">AI</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
