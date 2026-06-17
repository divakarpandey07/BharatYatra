"use client";

import { useState } from 'react';
import { Search } from 'lucide-react';
import { indiaData } from '../../src/data/indiaData';
import Link from 'next/link';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    
    if (val.length < 2) {
      setResults([]);
      return;
    }

    const lowerVal = val.toLowerCase();
    const found: any[] = [];
    
    // Search States and Districts
    indiaData.forEach(state => {
      if (state.name.toLowerCase().includes(lowerVal)) {
        found.push({ type: 'State', name: state.name, link: `/states/${state.id}` });
      }
      state.districts.forEach((district: any) => {
        if (district.name.toLowerCase().includes(lowerVal)) {
          found.push({ type: 'District', name: `${district.name}, ${state.name}`, link: `/district/${state.id}/${district.id}` });
        }
      });
    });

    setResults(found.slice(0, 8)); // Top 8 results
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="flex items-center bg-gray-50 border border-gray-200/80 rounded-2xl px-4 py-2.5 focus-within:border-accent-primary transition-colors">
        <Search className="text-gray-400 mr-2" size={18} />
        <input 
          type="text" 
          placeholder="Search states, districts, places..." 
          className="bg-transparent border-none outline-none text-gray-700 w-full placeholder-gray-400 text-sm font-semibold"
          value={query}
          onChange={handleSearch}
        />
      </div>
      
      {results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl overflow-hidden z-50 shadow-xl">
          {results.map((res, idx) => (
            <Link href={res.link} key={idx} onClick={() => setQuery('')}>
              <div className="px-4 py-3.5 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0 flex justify-between items-center transition-colors">
                <span className="font-bold text-sm text-gray-700">{res.name}</span>
                <span className="text-[10px] uppercase font-bold text-accent-secondary bg-accent-secondary/10 px-2 py-0.5 rounded-md border border-accent-secondary/15">{res.type}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

