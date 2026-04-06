import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { MapPin, TrendingUp, Users, Target } from 'lucide-react';

interface RegionData {
  id: string;
  name: string;
  strength: number;
  votes: number;
  target: number;
  lat: number;
  lng: number;
}

const regions: RegionData[] = [
  { id: 'surabaya', name: 'Surabaya', lat: -7.2575, lng: 112.7521, strength: 85, votes: 450000, target: 500000 },
  { id: 'malang', name: 'Malang', lat: -7.9666, lng: 112.6326, strength: 78, votes: 280000, target: 320000 },
  { id: 'sidoarjo', name: 'Sidoarjo', lat: -7.4478, lng: 112.7183, strength: 82, votes: 320000, target: 350000 },
  { id: 'gresik', name: 'Gresik', lat: -7.1650, lng: 112.6211, strength: 75, votes: 250000, target: 280000 },
  { id: 'mojokerto', name: 'Mojokerto', lat: -7.4706, lng: 112.4405, strength: 70, votes: 180000, target: 220000 },
  { id: 'pasuruan', name: 'Pasuruan', lat: -7.6469, lng: 112.9043, strength: 72, votes: 200000, target: 240000 },
  { id: 'jember', name: 'Jember', lat: -8.1720, lng: 113.6995, strength: 68, votes: 220000, target: 280000 },
  { id: 'banyuwangi', name: 'Banyuwangi', lat: -8.2192, lng: 114.3692, strength: 65, votes: 150000, target: 200000 },
  { id: 'kediri', name: 'Kediri', lat: -7.8167, lng: 112.0111, strength: 74, votes: 190000, target: 230000 },
  { id: 'blitar', name: 'Blitar', lat: -8.0950, lng: 112.1606, strength: 71, votes: 140000, target: 170000 },
  { id: 'tulungagung', name: 'Tulungagung', lat: -8.0657, lng: 111.9026, strength: 69, votes: 130000, target: 160000 },
  { id: 'trenggalek', name: 'Trenggalek', lat: -8.0500, lng: 111.7167, strength: 66, votes: 110000, target: 140000 },
  { id: 'ponorogo', name: 'Ponorogo', lat: -7.8684, lng: 111.4620, strength: 64, votes: 100000, target: 130000 },
  { id: 'madiun', name: 'Madiun', lat: -7.6298, lng: 111.5239, strength: 73, votes: 120000, target: 150000 },
  { id: 'nganjuk', name: 'Nganjuk', lat: -7.6059, lng: 111.9046, strength: 67, votes: 115000, target: 145000 },
  { id: 'jombang', name: 'Jombang', lat: -7.5468, lng: 112.2265, strength: 76, votes: 170000, target: 200000 },
  { id: 'lamongan', name: 'Lamongan', lat: -7.1124, lng: 112.4275, strength: 79, votes: 210000, target: 240000 },
  { id: 'tuban', name: 'Tuban', lat: -6.8984, lng: 112.0630, strength: 62, votes: 160000, target: 210000 },
  { id: 'bojonegoro', name: 'Bojonegoro', lat: -7.1500, lng: 111.8833, strength: 60, votes: 140000, target: 190000 },
  { id: 'ngawi', name: 'Ngawi', lat: -7.4733, lng: 111.3341, strength: 63, votes: 95000, target: 125000 },
  { id: 'magetan', name: 'Magetan', lat: -7.6497, lng: 111.3380, strength: 68, votes: 85000, target: 110000 },
  { id: 'pacitan', name: 'Pacitan', lat: -8.1905, lng: 111.0893, strength: 58, votes: 70000, target: 95000 },
  { id: 'sumenep', name: 'Sumenep', lat: -7.0167, lng: 113.8333, strength: 61, votes: 125000, target: 165000 },
  { id: 'pamekasan', name: 'Pamekasan', lat: -7.1667, lng: 113.4667, strength: 64, votes: 105000, target: 135000 },
  { id: 'sampang', name: 'Sampang', lat: -7.0500, lng: 113.2500, strength: 59, votes: 95000, target: 130000 },
  { id: 'bangkalan', name: 'Bangkalan', lat: -7.0333, lng: 112.7500, strength: 66, votes: 135000, target: 170000 },
];

const quickFilters = [
  { id: 'all', label: 'SEMUA' },
  { id: 'surabaya', label: 'SURABAYA' },
  { id: 'malang', label: 'MALANG RAYA' },
  { id: 'tapal', label: 'TAPAL KUDA' },
  { id: 'madura', label: 'MADURA' },
];

function getStrengthColor(strength: number): string {
  if (strength >= 80) return 'bg-green-500';
  if (strength >= 70) return 'bg-lime-500';
  if (strength >= 60) return 'bg-yellow-500';
  if (strength >= 50) return 'bg-orange-500';
  return 'bg-red-500';
}

function getStrengthTextColor(strength: number): string {
  if (strength >= 80) return 'text-green-600';
  if (strength >= 70) return 'text-lime-600';
  if (strength >= 60) return 'text-yellow-600';
  if (strength >= 50) return 'text-orange-600';
  return 'text-red-600';
}

export function ElectabilityMap() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState<RegionData | null>(null);

  const filteredRegions = regions.filter(region => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'surabaya') return region.id === 'surabaya';
    if (activeFilter === 'malang') return ['malang', 'blitar', 'kediri'].includes(region.id);
    if (activeFilter === 'tapal') return ['banyuwangi', 'jember', 'bondowoso', 'situbondo'].includes(region.id);
    if (activeFilter === 'madura') return ['sumenep', 'pamekasan', 'sampang', 'bangkalan'].includes(region.id);
    return true;
  });

  const totalVotes = filteredRegions.reduce((sum, r) => sum + r.votes, 0);
  const totalTarget = filteredRegions.reduce((sum, r) => sum + r.target, 0);
  const avgStrength = Math.round(filteredRegions.reduce((sum, r) => sum + r.strength, 0) / filteredRegions.length);

  return (
    <div className="space-y-4">
      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-500 text-xs">TOTAL SUARA</p>
                <p className="text-xl font-bold text-gray-900">{totalVotes.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-gray-500 text-xs">TARGET</p>
                <p className="text-xl font-bold text-gray-900">{totalTarget.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-gray-500 text-xs">KEKUATAN RATA-RATA</p>
                <p className={cn(
                  "text-xl font-bold",
                  getStrengthTextColor(avgStrength)
                )}>{avgStrength}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-2">
        {quickFilters.map((filter) => (
          <Button
            key={filter.id}
            variant={activeFilter === filter.id ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveFilter(filter.id)}
            className={activeFilter === filter.id ? 'bg-yellow-500 hover:bg-yellow-600 text-white' : ''}
          >
            {filter.label}
          </Button>
        ))}
      </div>

      {/* Map Visualization */}
      <Card>
        <CardContent className="p-6">
          <div className="relative bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-8 min-h-[400px]">
            {/* Jawa Timur Map Representation */}
            <div className="grid grid-cols-5 gap-3">
              {filteredRegions.map((region) => (
                <button
                  key={region.id}
                  onClick={() => setSelectedRegion(region)}
                  className={cn(
                    "relative p-4 rounded-xl transition-all duration-200 hover:scale-105",
                    selectedRegion?.id === region.id 
                      ? "ring-2 ring-yellow-500 ring-offset-2" 
                      : "",
                    "bg-white shadow-sm hover:shadow-md"
                  )}
                >
                  <div className="flex flex-col items-center">
                    <div className={cn(
                      "w-4 h-4 rounded-full mb-2",
                      getStrengthColor(region.strength)
                    )} />
                    <p className="text-xs font-medium text-center">{region.name}</p>
                    <p className={cn(
                      "text-lg font-bold",
                      getStrengthTextColor(region.strength)
                    )}>
                      {region.strength}%
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur rounded-lg p-3 shadow-lg">
              <p className="text-xs font-medium text-gray-700 mb-2">KEKUATAN PARTAI</p>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-xs text-gray-600">Sangat Kuat (80%+)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-lime-500" />
                  <span className="text-xs text-gray-600">Kuat (70-79%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <span className="text-xs text-gray-600">Cukup (60-69%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-orange-500" />
                  <span className="text-xs text-gray-600">Lemah (50-59%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="text-xs text-gray-600">Sangat Lemah (&lt;50%)</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Region Detail */}
      {selectedRegion && (
        <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl p-4 border border-yellow-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-lg text-gray-900">{selectedRegion.name}</h4>
                <p className="text-sm text-gray-600">Detail Kekuatan Wilayah</p>
              </div>
            </div>
            <div className="text-right">
              <p className={cn(
                "text-3xl font-bold",
                getStrengthTextColor(selectedRegion.strength)
              )}>{selectedRegion.strength}%</p>
              <p className="text-sm text-gray-600">Kekuatan</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-3">
              <p className="text-xs text-gray-500">Suara Saat Ini</p>
              <p className="font-bold text-gray-900">{selectedRegion.votes.toLocaleString()}</p>
            </div>
            <div className="bg-white rounded-lg p-3">
              <p className="text-xs text-gray-500">Target</p>
              <p className="font-bold text-gray-900">{selectedRegion.target.toLocaleString()}</p>
            </div>
            <div className="bg-white rounded-lg p-3">
              <p className="text-xs text-gray-500">Gap</p>
              <p className={cn(
                "font-bold",
                (selectedRegion.target - selectedRegion.votes) > 0 ? 'text-red-600' : 'text-green-600'
              )}>
                {(selectedRegion.target - selectedRegion.votes) > 0 ? '+' : ''}
                {(selectedRegion.target - selectedRegion.votes).toLocaleString()}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xs text-gray-500 mb-1">Progress ke Target</p>
            <Progress 
              value={(selectedRegion.votes / selectedRegion.target) * 100} 
              className="h-2"
            />
            <p className="text-sm text-gray-600 mt-1">
              {Math.round((selectedRegion.votes / selectedRegion.target) * 100)}% tercapai
            </p>
          </div>
        </div>
      )}

      {/* Region List */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-bold mb-4">Daftar Wilayah ({filteredRegions.length})</h3>
          <div className="grid lg:grid-cols-2 gap-3">
            {filteredRegions.map((region) => (
              <div 
                key={region.id}
                onClick={() => setSelectedRegion(region)}
                className={cn(
                  "flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all",
                  selectedRegion?.id === region.id 
                    ? "bg-yellow-100 border border-yellow-300" 
                    : "bg-gray-50 hover:bg-gray-100"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-3 h-3 rounded-full",
                    getStrengthColor(region.strength)
                  )} />
                  <span className="font-medium text-sm">{region.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500">
                    {region.votes.toLocaleString()} / {region.target.toLocaleString()}
                  </span>
                  <span className={cn(
                    "font-bold text-sm",
                    getStrengthTextColor(region.strength)
                  )}>
                    {region.strength}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
