import type { TabFormProps } from "./TabForm";

const Interests = ({ data, setData, errors }: TabFormProps) => {
  const { interests } = data;

  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({
      ...prev,
      interests: e.target.checked
        ? [...prev.interests, e.target.name]
        : prev.interests.filter((interest) => interest !== e.target.name),
    }));
  };

  return (
    <>
      <span>Choose your interests:</span>
      <div className="form-input-container">
        <div>
          <label>
            <input
              type="checkbox"
              name="coding"
              checked={interests.includes("coding")}
              onChange={handleChecked}
            />
            Coding
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="music"
              checked={interests.includes("music")}
              onChange={handleChecked}
            />
            Music
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="reading"
              checked={interests.includes("reading")}
              onChange={handleChecked}
            />
            Reading
          </label>
        </div>
        {errors.interests && <span className="error">{errors.interests}</span>}
      </div>
    </>
  );
};

export default Interests;
