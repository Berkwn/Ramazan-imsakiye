import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { formatDistanceStrict } from 'date-fns';
import { tr } from 'date-fns/locale';

const CurrentTimeCard = ({ prayerTimes, nextPrayer, timeToNextPrayer }) => {
    if (!prayerTimes) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-4xl mx-auto mt-8 px-4"
        >
            <div className="relative bg-gradient-to-br from-ramadan-accent/80 to-ramadan-dark/80 backdrop-blur-lg border border-white/10 rounded-3xl p-8 md:p-12 text-center shadow-2xl overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-ramadan-gold/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-48 h-48 bg-ramadan-light/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

                <h2 className="text-ramadan-light uppercase tracking-widest text-sm md:text-base mb-2">Sıradaki Vakit</h2>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
                    {nextPrayer?.name}
                </h1>

                <div className="text-6xl md:text-8xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-ramadan-gold to-white mb-6">
                    {timeToNextPrayer}
                </div>

                <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-6 py-2 border border-white/5">
                    <span className="text-ramadan-light">Vakit Saati:</span>
                    <span className="text-white font-semibold text-xl">{nextPrayer?.time}</span>
                </div>

                <div className="mt-8 grid grid-cols-2 md:grid-cols-6 gap-4 border-t border-white/10 pt-8">
                    {Object.entries(prayerTimes).map(([name, time]) => (
                        ['Imsak', 'Gunes', 'Ogle', 'Ikindi', 'Aksam', 'Yatsi'].includes(name) && (
                            <div key={name} className={`flex flex-col items-center ${name === nextPrayer?.key ? 'scale-110 text-ramadan-gold' : 'text-gray-400'}`}>
                                <span className="text-xs uppercase tracking-wider mb-1">{name === 'Gunes' ? 'Güneş' : name === 'Ogle' ? 'Öğle' : name === 'Ikindi' ? 'İkindi' : name === 'Aksam' ? 'Akşam' : name === 'Yatsi' ? 'Yatsı' : name === 'Imsak' ? 'İmsak' : name}</span>
                                <span className="font-semibold text-lg">{time}</span>
                            </div>
                        )
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default CurrentTimeCard;
