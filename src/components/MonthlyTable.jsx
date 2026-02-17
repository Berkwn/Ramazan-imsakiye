import React from 'react';
import { motion } from 'framer-motion';

const MonthlyTable = ({ data }) => {
    if (!data || data.length === 0) return null;

    const today = new Date().getDate();

    return (
        <div className="w-full max-w-4xl mx-auto mt-8 px-4 pb-12">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Ramazan İmsakiyesi</h3>
            <div className="overflow-x-auto rounded-xl shadow-2xl border border-white/10">
                <table className="w-full text-sm text-center">
                    <thead className="bg-ramadan-accent text-ramadan-gold uppercase tracking-wider text-xs">
                        <tr>
                            <th className="px-4 py-4">Gün</th>
                            <th className="px-4 py-4">İmsak</th>
                            <th className="px-4 py-4">Güneş</th>
                            <th className="px-4 py-4">Öğle</th>
                            <th className="px-4 py-4">İKİNDİ</th>
                            <th className="px-4 py-4">Akşam</th>
                            <th className="px-4 py-4">Yatsı</th>
                        </tr>
                    </thead>
                    <tbody className="bg-slate-900/50 backdrop-blur-sm divide-y divide-white/5">
                        {data.map((day, index) => {
                            const isToday = index + 1 === today;
                            const hijriDate = day.date.hijri;
                            const gregorianDate = day.date.gregorian;
                            const timings = day.timings;



                            return (
                                <motion.tr
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className={`hover:bg-white/5 transition-colors ${isToday ? 'bg-ramadan-gold/10 border-l-4 border-ramadan-gold' : ''}`}
                                >
                                    <td className="px-4 py-3 font-medium text-gray-300">
                                        <div className="flex flex-col">
                                            <span>{gregorianDate.day} {trMonths[gregorianDate.month.number - 1]}</span>
                                            <span className="text-xs text-gray-500">{hijriDate.day} {hijriDate.month.en}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 font-semibold text-white">{timings.Imsak.split(' ')[0]}</td>
                                    <td className="px-4 py-3 text-gray-400">{timings.Sunrise.split(' ')[0]}</td>
                                    <td className="px-4 py-3 text-gray-300">{timings.Dhuhr.split(' ')[0]}</td>
                                    <td className="px-4 py-3 text-gray-300">{timings.Asr.split(' ')[0]}</td>
                                    <td className="px-4 py-3 font-bold text-ramadan-gold">{timings.Maghrib.split(' ')[0]}</td>
                                    <td className="px-4 py-3 text-gray-400">{timings.Isha.split(' ')[0]}</td>
                                </motion.tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const trMonths = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];

export default MonthlyTable;
