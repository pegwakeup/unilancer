import React from 'react';
import { Search } from 'lucide-react';

interface FreelancerFiltersProps {
  filters: {
    search: string;
    status: string;
    expertise: string;
    location: string;
    workPreference: string;
  };
  onFilterChange: (key: string, value: string) => void;
  expertiseOptions: string[];
  locationOptions: string[];
}

const FreelancerFilters = ({
  filters,
  onFilterChange,
  expertiseOptions,
  locationOptions
}: FreelancerFiltersProps) => {
  return (
    <div className="bg-dark-light border border-white/10 rounded-xl p-4 lg:p-6 mb-8">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="İsim veya e-posta ile ara..."
            value={filters.search}
            onChange={(e) => onFilterChange('search', e.target.value)}
            className="w-full bg-dark border border-white/10 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-primary"
          />
        </div>

        <select
          value={filters.status}
          onChange={(e) => onFilterChange('status', e.target.value)}
          className="bg-dark border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary"
        >
          <option value="">Tüm Durumlar</option>
          <option value="pending">Bekleyen</option>
          <option value="reviewing">İnceleniyor</option>
          <option value="accepted">Kabul Edilen</option>
          <option value="rejected">Reddedilen</option>
        </select>

        <select
          value={filters.expertise}
          onChange={(e) => onFilterChange('expertise', e.target.value)}
          className="bg-dark border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary"
        >
          <option value="">Tüm Uzmanlıklar</option>
          {expertiseOptions.map(expertise => (
            <option key={expertise} value={expertise}>{expertise}</option>
          ))}
        </select>

        <select
          value={filters.location}
          onChange={(e) => onFilterChange('location', e.target.value)}
          className="bg-dark border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary"
        >
          <option value="">Tüm Konumlar</option>
          {locationOptions.map(location => (
            <option key={location} value={location}>{location}</option>
          ))}
        </select>

        <select
          value={filters.workPreference}
          onChange={(e) => onFilterChange('workPreference', e.target.value)}
          className="bg-dark border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary"
        >
          <option value="">Tüm Çalışma Tercihleri</option>
          <option value="remote">Uzaktan</option>
          <option value="hybrid">Hibrit</option>
        </select>
      </div>
    </div>
  );
};

export default FreelancerFilters;