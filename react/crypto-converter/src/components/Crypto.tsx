import { useEffect, useState } from "react";

const CURRENCY_OPTIONS = ["USD", "EUR", "GBP", "CNY"] as const;

type Currency = (typeof CURRENCY_OPTIONS)[number];

const Crypto = () => {
  const [amount, setAmount] = useState<number | "">("");
  const [conversionRate, setConversionRate] = useState(0);
  const [previousConversionRate, setPreviousConversionRate] = useState(0);
  const [currency, setCurrency] = useState<Currency>("USD");

  useEffect(() => {
    async function fetchConversionRate() {
      try {
        const apiUrl = `https://api.coingecko.com/api/v3/simple/price?vs_currencies=${currency}&ids=ethereum`;

        const resp = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": import.meta.env.VITE_API_KEY,
          },
        });

        if (!resp.ok) {
          throw new Error(`HTTP error: ${resp.status}`);
        }

        const data = await resp.json();

        const newRate = data.ethereum[currency.toLowerCase()];

        setPreviousConversionRate((prevRate) => {
          // Don't treat the initial 0 as a price change.
          return prevRate === 0 ? newRate : conversionRate;
        });

        setConversionRate(newRate);
      } catch (err) {
        console.error(err);
      }
    }

    fetchConversionRate();

    const timer = setInterval(fetchConversionRate, 500000);

    return () => {
      clearInterval(timer);
    };
  }, [currency]);

  const convertedAmount =
    typeof amount === "number" && conversionRate > 0
      ? amount / conversionRate
      : 0;

  const priceChange = conversionRate - previousConversionRate;

  return (
    <div className="container">
      <div className="inputs-container">
        <label htmlFor="amountToConvert">
          Amount to Convert:
          <input
            type="number"
            id="amountToConvert"
            value={amount}
            onChange={(e) => {
              const value = e.target.value;

              setAmount(value === "" ? "" : Number(value));
            }}
          />
        </label>

        <label htmlFor="currency">
          Currency:
          <select
            id="currency"
            value={currency}
            onChange={(e) => {
              setCurrency(e.target.value as Currency);
            }}
          >
            {CURRENCY_OPTIONS.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div>
        <p>ETH Crypto Equivalent: {convertedAmount}</p>

        <p
          aria-live="polite"
          style={{
            color:
              priceChange > 0 ? "green" : priceChange < 0 ? "red" : "black",
          }}
        >
          Change: {priceChange > 0 ? "⬆️" : priceChange < 0 ? "🔻" : "—"}{" "}
          {priceChange.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default Crypto;
