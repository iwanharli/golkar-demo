import { ShieldAlert, ArrowLeft, Construction, Globe, Lock } from 'lucide-react';

interface NotFoundProps {
  onBack: () => void;
  title?: string;
}

export function NotFound({ onBack, title = "Halaman Tidak Ditemukan" }: NotFoundProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 text-center animate-in fade-in zoom-in duration-500">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      
      {/* Icon with Ring */}
      <div className="relative mb-8">
        <div className="w-24 h-24 rounded-full border border-yellow-500/20 flex items-center justify-center bg-[#0f0f12] shadow-2xl shadow-yellow-500/10 relative z-10">
          <ShieldAlert className="w-10 h-10 text-yellow-500 animate-pulse" />
        </div>
        <div className="absolute -inset-4 border border-dashed border-white/5 rounded-full animate-[spin_20s_linear_infinite]"></div>
      </div>

      {/* Text Content */}
      <div className="max-w-md relative z-10">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="px-2 py-0.5 rounded bg-yellow-500/10 border border-yellow-500/20 text-[10px] font-mono text-yellow-500 font-bold uppercase tracking-widest">
            Error Code: 404_UNAVAILABLE
          </span>
        </div>
        
        <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">
          {title}
        </h2>
        
        <p className="text-slate-400 text-sm leading-relaxed mb-10">
          Maaf, akses ke modul ini sedang dibatasi atau modul masih dalam tahap pengembangan sistem kedaulatan data. Silakan hubungi administrator War Room untuk informasi lebih lanjut.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={onBack}
            className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-yellow-500 text-[#0a0a0c] font-bold text-sm hover:bg-yellow-400 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-yellow-500/20"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Kembali ke Dashboard
          </button>
          
          <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-300 font-bold text-sm hover:bg-white/10 transition-all cursor-not-allowed opacity-50">
            <Lock className="w-4 h-4" />
            Lapor Masalah
          </button>
        </div>
      </div>

      {/* Bottom Tactical Info */}
      <div className="mt-20 grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16 opacity-30 group grayscale hover:grayscale-0 transition-all duration-700">
        <TacticalStat icon={Globe} label="Server Status" value="Online" />
        <TacticalStat icon={Construction} label="Development" value="92%" />
        <TacticalStat icon={ShieldAlert} label="Access" value="Restricted" className="hidden md:flex" />
      </div>
    </div>
  );
}

function TacticalStat({ icon: Icon, label, value, className = "" }: { icon: any, label: string, value: string, className?: string }) {
  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <Icon className="w-4 h-4 text-slate-500" />
      <div className="text-center">
        <p className="text-[10px] font-mono text-slate-600 uppercase tracking-tighter">{label}</p>
        <p className="text-xs font-bold text-slate-400 font-mono tracking-widest">{value}</p>
      </div>
    </div>
  );
}
