import { create } from "zustand"; // ✅ Correct import
import axios from "axios";

const useStore = create((set) => ({
  balance: 10000,
  stocks: [],
  portfolio: {},

  fetchStockPrices: async () => {
    try {
      const response = await axios.get(
        "https://api.twelvedata.com/time_series?symbol=AAPL,TSLA,GOOGL&interval=1min&apikey=YOUR_API_KEY"
      );
      const data = response.data;

      const stockData = Object.keys(data).map((symbol) => ({
        symbol,
        price: parseFloat(data[symbol].values[0].close),
      }));

      set({ stocks: stockData });
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  },

  buyStock: (stock) =>
    set((state) => {
      if (state.balance >= stock.price) {
        return {
          balance: state.balance - stock.price,
          portfolio: {
            ...state.portfolio,
            [stock.symbol]: (state.portfolio[stock.symbol] || 0) + 1,
          },
        };
      }
      return state;
    }),

  sellStock: (stock) =>
    set((state) => {
      if (state.portfolio[stock.symbol] > 0) {
        return {
          balance: state.balance + stock.price,
          portfolio: {
            ...state.portfolio,
            [stock.symbol]: state.portfolio[stock.symbol] - 1,
          },
        };
      }
      return state;
    }),
}));

export default useStore;
