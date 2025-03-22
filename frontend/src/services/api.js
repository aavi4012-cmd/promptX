// Simulated API for real-time market data
export const fetchMarketData = async () => {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching market data:', error);
        return [];
    }
};
