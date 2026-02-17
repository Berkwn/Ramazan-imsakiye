import { useState, useEffect } from 'react';
import { usePrayerTimes } from './hooks/usePrayerTimes';
import CitySelector from './components/CitySelector';
import CurrentTimeCard from './components/CurrentTimeCard';
import MonthlyTable from './components/MonthlyTable';
import { format, differenceInSeconds, parse, addDays } from 'date-fns';

function App() {
  const [selectedCity, setSelectedCity] = useState(localStorage.getItem('selectedCity') || 'İstanbul');
  const { data, loading, error } = usePrayerTimes(selectedCity);

  const [nextPrayer, setNextPrayer] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState('');
  const [todayData, setTodayData] = useState(null);

  useEffect(() => {
    localStorage.setItem('selectedCity', selectedCity);
  }, [selectedCity]);

  useEffect(() => {
    if (!data || data.length === 0) return;

    const updateTimer = () => {
      const now = new Date();
      const todayStr = format(now, 'dd-MM-yyyy');

      // Find today's data from the monthly array
      // Date in API response is like "17-02-2026" in gregorian.date
      const todayRecord = data.find(d => d.date.gregorian.date === todayStr);

      if (todayRecord) {
        setTodayData(todayRecord);
        calculateNextPrayer(todayRecord.timings);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [data, selectedCity]);

  const calculateNextPrayer = (timings) => {
    const now = new Date();
    const prayerNames = {
      Imsak: 'İmsak',
      Sunrise: 'Güneş',
      Dhuhr: 'Öğle',
      Asr: 'İkindi',
      Maghrib: 'Akşam',
      Isha: 'Yatsı'
    };

    const orderedPrayers = ['Imsak', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
    let next = null;

    for (let key of orderedPrayers) {
      const timeStr = timings[key].split(' ')[0]; // "05:43 (EET)" -> "05:43"
      const prayerDate = parse(timeStr, 'HH:mm', now);

      if (prayerDate > now) {
        next = { key, name: prayerNames[key], time: timeStr, date: prayerDate };
        break;
      }
    }

    // If all prayers for today passed, next is Imsak of tomorrow
    if (!next) {
      // Find tomorrow's date string
      const tomorrow = addDays(now, 1);
      const tomorrowStr = format(tomorrow, 'dd-MM-yyyy');
      const tomorrowRecord = data.find(d => d.date.gregorian.date === tomorrowStr);

      if (tomorrowRecord) {
        const timeStr = tomorrowRecord.timings.Imsak.split(' ')[0];
        const prayerDate = parse(timeStr, 'HH:mm', tomorrow);
        next = { key: 'Imsak', name: 'Yarın İmsak', time: timeStr, date: prayerDate };
      } else {
        // Fallback if end of month/data not available
        next = { key: 'Imsak', name: 'Yarın İmsak', time: '??:??', date: null };
      }
    }

    setNextPrayer(next);

    if (next && next.date) {
      const diff = differenceInSeconds(next.date, now);
      // Handle negative diff if something is wrong, though usually won't be
      if (diff < 0) {
        setTimeRemaining("Vakit girdi");
      } else {
        const hours = Math.floor(diff / 3600);
        const minutes = Math.floor((diff % 3600) / 60);
        const seconds = diff % 60;
        setTimeRemaining(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
      }
    } else {
      setTimeRemaining("--:--:--");
    }
  };

  return (
    <div className="min-h-screen pb-12 relative">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0B2447] to-[#000000] z-[-1]" />

      {/* Header */}
      <header className="p-6 flex flex-col md:flex-row items-center justify-between gap-4 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-ramadan-gold tracking-widest uppercase">Ramazan İmsakiye</h1>
        <CitySelector selectedCity={selectedCity} onSelectCity={setSelectedCity} />
      </header>

      <main className="container mx-auto px-4 z-10 relative">
        {loading && (
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-ramadan-gold"></div>
          </div>
        )}

        {error && (
          <div className="text-center text-red-400 mt-10 p-4 bg-red-900/20 rounded-xl">
            Hata oluştu: {error}
          </div>
        )}

        {!loading && !error && todayData && (
          <>
            <CurrentTimeCard
              prayerTimes={todayData.timings}
              nextPrayer={nextPrayer}
              timeToNextPrayer={timeRemaining}
            />

            <MonthlyTable data={data} />
          </>
        )}
      </main>

      <footer className="text-center text-gray-500 text-sm py-8 mt-12 border-t border-white/5">
        <p>© 2026 Ramazan İmsakiye - Tüm hakları saklıdır.</p>
        <p className="mt-1 text-xs">Veriler Diyanet İşleri Başkanlığı hesaplama yöntemine (Method 13) göre alınmaktadır.</p>
      </footer>
    </div>
  );
}

export default App;
