import { useState, useMemo } from "react";
import "./App.css";

type Country = {
  name: string;
  states: {
    name: string;
    cities: string[];
  }[];
};

const data: Country[] = [
  {
    name: "India",
    states: [
      { name: "Maharashtra", cities: ["Mumbai", "Pune", "Nagpur"] },
      { name: "Karnataka", cities: ["Bangalore", "Mysore"] },
    ],
  },
  {
    name: "USA",
    states: [
      { name: "California", cities: ["Los Angeles", "San Francisco"] },
      { name: "Texas", cities: ["Houston", "Dallas"] },
    ],
  },
];

function App() {
  const [country, setCountry] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [city, setCity] = useState<string>("");

  const [errors, setErrors] = useState({
    country: "",
    state: "",
    city: "",
  });

  // 🔹 Derived states list
  const states = useMemo(() => {
    return data.find((c) => c.name === country)?.states || [];
  }, [country]);

  // 🔹 Derived cities list
  const cities = useMemo(() => {
    return states.find((s) => s.name === state)?.cities || [];
  }, [state, states]);

  const handleCountryChange = (value: string) => {
    setCountry(value);
    setState("");
    setCity("");
  };

  const handleStateChange = (value: string) => {
    setState(value);
    setCity("");
  };

  const validate = () => {
    const newErrors = {
      country: country ? "" : "Country is required",
      state: state ? "" : "State is required",
      city: city ? "" : "City is required",
    };

    setErrors(newErrors);

    return !newErrors.country && !newErrors.state && !newErrors.city;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    alert(`Selected: ${country} → ${state} → ${city}`);
  };

  return (
    <div className="container">
      <h1>Dependent Form</h1>

      <form onSubmit={handleSubmit} className="form">
        {/* Country */}
        <div className="field">
          <label>Country</label>
          <select
            value={country}
            onChange={(e) => handleCountryChange(e.target.value)}
          >
            <option value="">Select Country</option>
            {data.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
          {errors.country && <p className="error">{errors.country}</p>}
        </div>

        {/* State */}
        <div className="field">
          <label>State</label>
          <select
            value={state}
            onChange={(e) => handleStateChange(e.target.value)}
            disabled={!country}
          >
            <option value="">Select State</option>
            {states.map((s) => (
              <option key={s.name} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
          {errors.state && <p className="error">{errors.state}</p>}
        </div>

        {/* City */}
        <div className="field">
          <label>City</label>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            disabled={!state}
          >
            <option value="">Select City</option>
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {errors.city && <p className="error">{errors.city}</p>}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
