import React, { useEffect, useState } from 'react';

export const SportsColumn = ({ title, theme, sport }) => {
  const [latest, setLatest] = useState([]);
  const [upcoming, setUpcoming] = useState([]);

  const getApiKey = () => {
    const env = import.meta.env;
    if (sport === 'soccer') {
      return env.VITE_FOOTBALL_API_KEY || '';
    } else if (sport === 'cricket') {
      return env.VITE_CRICKET_API_KEY || '';
    }
    return '';
  };

  useEffect(() => {
    const apiKey = getApiKey();

    if (!apiKey) {
      console.warn(`Missing API key for ${sport}`);
      return;
    }

  const fetchLatest = async () => {
  try {
    let url = '';
    let headers = {};

    if (sport === 'soccer') {
      url = 'https://api-football-v1.p.rapidapi.com/v3/fixtures?league=39&season=2023';
      headers = {
        'x-rapidapi-key': import.meta.env.VITE_FOOTBALL_API_KEY,
        'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
      };
    } else if (sport === 'cricket') {
      url = `https://api.cricapi.com/v1/currentMatches?apikey=${import.meta.env.VITE_CRICKET_API_KEY}`;
    } else if (sport === 'f1') {
      url = 'https://ergast.com/api/f1/current.json';
    }

    const res = await fetch(url, { headers });
    const data = await res.json();

    if (sport === 'soccer') {
      setLatest(data.response || []);
    } else if (sport === 'cricket') {
      setLatest(data.data || []);
    } else if (sport === 'f1') {
      setLatest(data.MRData?.RaceTable?.Races || []);
    }
  } catch (error) {
    console.error('Error fetching latest data:', error);
    setLatest([]);
  }
};


    const fetchUpcoming = async () => {
      try {
        const res = await fetch(`/api/${sport}/upcoming?key=${apiKey}`);
        const data = await res.json();
        setUpcoming(data.events || []);
      } catch (error) {
        console.error('Error fetching upcoming data:', error);
        setUpcoming([]);
      }
    };

    fetchLatest();
    fetchUpcoming();
  }, [sport]);

  return (
    <div className={`border-2 border-${theme}-500 rounded-2xl p-4 shadow-md`}>
      <h2 className={`text-xl font-semibold text-${theme}-600 mb-2`}>{title}</h2>

      <div>
        <h3 className="font-medium mb-1">Latest Results</h3>
        <ul className="text-sm space-y-1">
          {latest.length > 0 ? (
            latest.map((item, idx) => <li key={idx}>{item.name || 'Match Result'}</li>)
          ) : (
            <li>No data</li>
          )}
        </ul>
      </div>

      <div className="mt-4">
        <h3 className="font-medium mb-1">Upcoming Matches</h3>
        <ul className="text-sm space-y-1">
          {upcoming.length > 0 ? (
            upcoming.map((item, idx) => <li key={idx}>{item.name || 'Upcoming Match'}</li>)
          ) : (
            <li>No data</li>
          )}
        </ul>
      </div>
    </div>
  );
};
