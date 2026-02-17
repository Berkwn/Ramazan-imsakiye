import { useState, useEffect } from 'react';
import axios from 'axios';

export const usePrayerTimes = (city) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTimes = async () => {
            setLoading(true);
            setError(null);
            try {
                const date = new Date();
                const year = date.getFullYear();
                const month = date.getMonth() + 1;

                const response = await axios.get('https://api.aladhan.com/v1/calendarByCity', {
                    params: {
                        city: city,
                        country: 'Turkey',
                        method: 13, // Diyanet
                        month: month,
                        year: year
                    }
                });

                setData(response.data.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTimes();
    }, [city]);

    return { data, loading, error };
};
