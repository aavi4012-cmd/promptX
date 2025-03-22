import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider, keyframes } from 'styled-components';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { FiMinimize, FiMaximize, FiSun, FiMoon } from 'react-icons/fi';

const themes = {
  light: {
    background: '#fff',
    text: '#222',
    card: '#f4f4f4',
    chartGrid: '#ddd',
  },
  dark: {
    background: '#222',
    text: '#fff',
    card: '#333',
    chartGrid: '#555',
  },
};

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Container = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  font-family: 'Poppins', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px 20px;
  animation: ${fadeIn} 0.8s ease-in-out;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 30px;
`;

const ChartContainer = styled.div`
  width: 90%;
  max-width: 1000px;
  background: ${({ theme }) => theme.card};
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  padding: 20px;
  transition: height 0.3s;
  height: ${({ minimized }) => (minimized ? '80px' : '400px')};
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
  font-size: 1.5rem;
  cursor: pointer;
`;

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [minimized, setMinimized] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana,cardano&order=market_cap_desc&per_page=4&page=1&sparkline=true');
        const result = await response.json();
        if (!result.length) throw new Error('No data available');

        const formattedData = result[0].sparkline_in_7d.price.map((_, i) => ({
          date: new Date(Date.now() - (7 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
          btc: result[0].sparkline_in_7d.price[i],
          eth: result[1]?.sparkline_in_7d.price[i] || 0,
          sol: result[2]?.sparkline_in_7d.price[i] || 0,
          ada: result[3]?.sparkline_in_7d.price[i] || 0,
        }));
        
        setData(formattedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  return (
    <ThemeProvider theme={darkMode ? themes.dark : themes.light}>
      <Container>
        <Controls>
          <div onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <FiSun /> : <FiMoon />}
          </div>
          <div onClick={() => setMinimized(!minimized)}>
            {minimized ? <FiMaximize /> : <FiMinimize />}
          </div>
        </Controls>
        <Title>MetaFunds Overview</Title>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <ChartContainer minimized={minimized}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#555' : '#ddd'} />
                <XAxis dataKey="date" stroke={darkMode ? '#fff' : '#000'} />
                <YAxis stroke={darkMode ? '#fff' : '#000'} />
                <Tooltip contentStyle={{ background: darkMode ? '#555' : '#fff', borderRadius: '5px' }} />
                <Legend verticalAlign="top" align="right" />
                <Line type="monotone" dataKey="btc" stroke="#f39c12" strokeWidth={2} />
                <Line type="monotone" dataKey="eth" stroke="#3498db" strokeWidth={2} />
                <Line type="monotone" dataKey="sol" stroke="#ff5733" strokeWidth={2} />
                <Line type="monotone" dataKey="ada" stroke="#8e44ad" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default Dashboard;