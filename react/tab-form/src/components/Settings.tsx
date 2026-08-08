import type { TabFormProps } from "./TabForm";

const Settings = ({ data, setData }: TabFormProps) => {
  const { theme } = data;

  const handleDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ ...prev, theme: e.target.name }));
  };

  return (
    <>
      <span>Choose your theme: </span>
      <div className="form-input-container">
        <div>
          <label>
            <input
              type="radio"
              name="dark"
              checked={theme === "dark"}
              onChange={handleDataChange}
            />
            Dark
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              name="light"
              checked={theme === "light"}
              onChange={handleDataChange}
            />
            Light
          </label>
        </div>
      </div>
    </>
  );
};

export default Settings;
