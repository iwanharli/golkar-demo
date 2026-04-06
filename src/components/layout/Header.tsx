import { Menu, Bell, Settings, User, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    const days = ['MINGGU', 'SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT', 'SABTU'];
    const months = ['JANUARI', 'FEBRUARI', 'MARET', 'APRIL', 'MEI', 'JUNI', 'JULI', 'AGUSTUS', 'SEPTEMBER', 'OKTOBER', 'NOVEMBER', 'DESEMBER'];
    
    const day = days[date.getDay()];
    const dateNum = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    
    return `${day}, ${dateNum} ${month} ${year}`;
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('id-ID', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <header className="bg-gradient-to-r from-yellow-500 to-yellow-600 shadow-lg">
      <div className="px-4 lg:px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onMenuClick}
              className="lg:hidden text-white hover:bg-yellow-400/30"
            >
              <Menu className="w-6 h-6" />
            </Button>
            
            {/* Logo & Title */}
            <div className="hidden sm:flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
                <span className="text-xl font-bold text-yellow-600">G</span>
              </div>
              <div>
                <h1 className="text-white font-bold text-sm lg:text-base">
                  WAR ROOM DIGITAL
                </h1>
                <p className="text-yellow-100 text-xs">DPW PARTAI GOLKAR JAWA TIMUR</p>
              </div>
            </div>
          </div>

          {/* Center - Date & Time */}
          <div className="hidden md:flex items-center gap-6 bg-yellow-400/20 rounded-full px-6 py-2">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-white" />
              <span className="text-white font-medium text-sm">
                {formatDate(currentTime)}
              </span>
            </div>
            <div className="w-px h-4 bg-yellow-300/50" />
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-white" />
              <span className="text-white font-medium text-sm">
                {formatTime(currentTime)} WIB
              </span>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            {/* User Profile */}
            <div className="hidden sm:flex items-center gap-3 mr-4">
              <div className="text-right">
                <p className="text-white font-medium text-sm">KETUA UMUM</p>
                <p className="text-yellow-100 text-xs">DPW JATIM</p>
              </div>
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
                <User className="w-5 h-5 text-yellow-600" />
              </div>
            </div>

            <Button 
              variant="ghost" 
              size="icon"
              className="text-white hover:bg-yellow-400/30 relative"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center text-white font-bold">
                3
              </span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon"
              className="text-white hover:bg-yellow-400/30"
            >
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
