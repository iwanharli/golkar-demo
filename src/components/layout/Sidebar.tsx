import { 
  LayoutDashboard, 
  Map, 
  Users, 
  Share2, 
  Shield, 
  Wallet, 
  ChevronRight 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Executive Summary', icon: LayoutDashboard },
  { id: 'electability', label: 'Peta Elektabilitas', icon: Map },
  { id: 'canvasing', label: 'Kanvasing & Mesin Partai', icon: Users },
  { id: 'social', label: 'Social Media & Youth', icon: Share2 },
  { id: 'saksi', label: 'Database Saksi', icon: Shield },
  { id: 'financial', label: 'Financial Compliance', icon: Wallet },
];

export function Sidebar({ activeTab, onTabChange, isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 h-full bg-gradient-to-b from-yellow-500 to-yellow-600 z-50 transition-transform duration-300 ease-in-out",
        "w-72 shadow-2xl",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* Logo Section */}
        <div className="p-6 border-b border-yellow-400/30">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
              <span className="text-2xl font-bold text-yellow-600">G</span>
            </div>
            <div>
              <h1 className="text-white font-bold text-lg leading-tight">WAR ROOM</h1>
              <p className="text-yellow-100 text-xs">DIGITAL POLITIK</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id);
                  onClose();
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                  isActive 
                    ? "bg-white text-yellow-600 shadow-lg" 
                    : "text-white hover:bg-yellow-400/30"
                )}
              >
                <Icon className={cn(
                  "w-5 h-5 transition-transform",
                  isActive ? "scale-110" : "group-hover:scale-110"
                )} />
                <span className="font-medium text-sm flex-1 text-left">{item.label}</span>
                <ChevronRight className={cn(
                  "w-4 h-4 transition-transform",
                  isActive ? "translate-x-1" : "opacity-0 group-hover:opacity-100"
                )} />
              </button>
            );
          })}
        </nav>

        {/* Data Sources Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="bg-yellow-400/20 rounded-xl p-4">
            <p className="text-yellow-100 text-xs font-medium mb-2">SUMBER DATA:</p>
            <div className="space-y-1">
              {['Database Internal', 'Laporan Relawan', 'Social Media', 'Media Online', 'AI Analysis'].map((source, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-white rounded-full" />
                  <span className="text-white text-xs">{source}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
