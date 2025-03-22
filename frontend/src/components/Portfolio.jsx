import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { Line, Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const Portfolio = () => {
    const [portfolio, setPortfolio] = useState({
        totalValue: 0,
        dailyChange: 0,
        returns: 0,
        stocks: []
    });

    const [news, setNews] = useState([]);

    useEffect(() => {
        fetchMarketData();
        fetchNews();
    }, []);

    // Fetching real-time stock prices
    const fetchMarketData = async () => {
        try {
            const response = await axios.get('https://financialmodelingprep.com/api/v3/quote/AAPL,TSLA,AMZN,GOOGL?apikey=Bi1WqCNNPsdETvGLq4n5nNeStiZtF8Lh');
            const stockData = response.data.map(stock => ({
                name: stock.name,
                symbol: stock.symbol,
                price: stock.price,
                change: stock.change,
                holdings: Math.floor(Math.random() * 50) + 10
            }));

            const totalValue = stockData.reduce((acc, stock) => acc + stock.price * stock.holdings, 0);
            const dailyChange = (Math.random() * 5 - 2.5).toFixed(2);
            const returns = ((Math.random() * 20) + 5).toFixed(2);

            setPortfolio({
                totalValue,
                dailyChange,
                returns,
                stocks: stockData
            });
        } catch (error) {
            console.error('Error fetching market data:', error);
        }
    };

    // Fetching real-time financial news
    const fetchNews = async () => {
        try {
            const response = await axios.get(`https://newsapi.org/v2/everything?q=stocks&apiKey=0ab95c8652fd4462a016f5b973cd0745`);
            setNews(response.data.articles.slice(0, 5)); 
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    };

    
    const pieData = {
        labels: portfolio.stocks.map(stock => stock.name),
        datasets: [
            {
                data: portfolio.stocks.map(stock => stock.holdings),
                backgroundColor: ['#4caf50', '#ff9800', '#2196f3', '#f44336'],
                hoverBackgroundColor: ['#66bb6a', '#ffb74d', '#64b5f6', '#e57373']
            }
        ]
    };

    const lineData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
            {
                label: 'Portfolio Value ($)',
                data: [120000, 125000, 128500, 132000, 140000, 145000, portfolio.totalValue],
                borderColor: '#4caf50',
                backgroundColor: 'rgba(76, 175, 80, 0.1)',
                tension: 0.4
            }
        ]
    };

    
    const containerStyle = {
        padding: '40px',
        maxWidth: '1400px',
        margin: '0 auto',
        color: '#fff',
        background: 'linear-gradient(135deg, #1e2a38, #3a6186)',
        borderRadius: '15px',
        boxShadow: '0 12px 24px rgba(0, 0, 0, 0.8)',
        position: 'relative'
    };

    const headerStyle = {
        textAlign: 'center',
        marginBottom: '40px'
    };

    const h2Style = {
        fontSize: '42px',
        color: '#4caf50',
        textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8)'
    };

    const cardStyle = {
        display: 'flex',
        justifyContent: 'space-around',
        marginBottom: '40px',
        gap: '20px'
    };

    const infoCard = {
        flex: '1',
        padding: '40px',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '15px',
        textAlign: 'center',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.7)',
        transition: 'transform 0.5s ease'
    };

    const newsStyle = {
        marginTop: '40px',
        padding: '30px',
        background: 'rgba(0, 0, 0, 0.8)',
        borderRadius: '15px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.9)'
    };

    const newsItemStyle = {
        padding: '10px',
        borderBottom: '1px solid #ccc',
        color: '#ddd'
    };

    const chartSection = {
        display: 'flex',
        justifyContent: 'space-between',
        gap: '40px',
        marginTop: '40px'
    };

    const chartStyle = {
        flex: '1',
        background: 'rgba(0, 0, 0, 0.8)',
        padding: '40px',
        borderRadius: '15px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.9)',
        transition: '0.3s'
    };

    return (
        <div style={containerStyle}>
            
            <Canvas style={{ height: '400px' }}>
                <OrbitControls enableZoom={false} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <Sphere args={[1, 32, 32]} position={[0, 0, 0]}>
                    <MeshDistortMaterial
                        color="#4caf50"
                        attach="material"
                        distort={0.5}
                        speed={2}
                    />
                </Sphere>
            </Canvas>

            <div style={headerStyle}>
                <h2 style={h2Style}>Portfolio Management System</h2>
            </div>
            <div style={cardStyle}>
                <div style={infoCard}>
                    <h3>Total Portfolio Value</h3>
                    <p>${portfolio.totalValue.toLocaleString()}</p>
                </div>
                <div style={infoCard}>
                    <h3>Daily Change</h3>
                    <p>{portfolio.dailyChange}%</p>
                </div>
                <div style={infoCard}>
                    <h3>Returns</h3>
                    <p>{portfolio.returns}%</p>
                </div>
            </div>

            {/* Chrts */}
            <div style={chartSection}>
                <div style={chartStyle}>
                    <h3>Diversification</h3>
                    <Pie data={pieData} />
                </div>
                <div style={chartStyle}>
                    <h3>Growth</h3>
                    <Line data={lineData} />
                </div>
            </div>

            {/* Financenews */}
            <div style={newsStyle}>
                <h3>Latest Financial News</h3>
                {news.map((article, index) => (
                    <div key={index} style={newsItemStyle}>
                        <h4>{article.title}</h4>
                        <p>{article.description}</p>
                        <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Portfolio;
