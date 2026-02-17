import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BiSearchAlt2 } from 'react-icons/bi';
import { GoLocation } from 'react-icons/go';
import { cities } from '../cities';

const CitySelector = ({ selectedCity, onSelectCity }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCities = cities.filter(city =>
        city.toLocaleLowerCase('tr').includes(searchTerm.toLocaleLowerCase('tr'))
    );

    return (
        <div className="relative w-full max-w-md mx-auto z-50">
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 flex items-center justify-between cursor-pointer hover:bg-white/15 transition-all shadow-lg"
            >
                <div className="flex items-center gap-3">
                    <GoLocation className="text-ramadan-gold text-xl" />
                    <span className="text-lg font-medium">{selectedCity}</span>
                </div>
                <span className="text-ramadan-light text-sm">Şehir Değiştir</span>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl"
                    >
                        <div className="p-3 border-b border-white/10 relative">
                            <BiSearchAlt2 className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Şehir ara..."
                                className="w-full bg-slate-800 rounded-lg py-2 pl-10 pr-4 text-white focus:outline-none focus:ring-1 focus:ring-ramadan-gold"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                autoFocus
                            />
                        </div>
                        <div className="max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-ramadan-gold/30">
                            {filteredCities.map(city => (
                                <button
                                    key={city}
                                    onClick={() => {
                                        onSelectCity(city);
                                        setIsOpen(false);
                                        setSearchTerm('');
                                    }}
                                    className={`w-full text-left px-4 py-3 hover:bg-white/5 transition-colors flex items-center justify-between ${selectedCity === city ? 'text-ramadan-gold' : 'text-gray-300'}`}
                                >
                                    {city}
                                    {selectedCity === city && <div className="w-2 h-2 rounded-full bg-ramadan-gold" />}
                                </button>
                            ))}
                            {filteredCities.length === 0 && (
                                <div className="p-4 text-center text-gray-500">Şehir bulunamadı</div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CitySelector;
