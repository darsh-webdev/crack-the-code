import type { TabFormProps } from "./TabForm";

const Profile = ({ data, setData, errors }: TabFormProps) => {
  const { name, email, age } = data;

  const handleDataChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    item: string
  ) => {
    setData((prev) => ({
      ...prev,
      [item]: e.target.value,
    }));
  };

  return (
    <div className="form-input-container">
      <div className="form-input">
        <label>Name: </label>
        <input
          type="text"
          placeholder="Enter name..."
          value={name}
          onChange={(e) => handleDataChange(e, "name")}
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>
      <div className="form-input">
        <label>Age: </label>
        <input
          type="number"
          placeholder="Enter age..."
          value={age}
          onChange={(e) => handleDataChange(e, "age")}
        />
        {errors.age && <span className="error">{errors.age}</span>}
      </div>
      <div className="form-input">
        <label>Email: </label>
        <input
          type="email"
          placeholder="Enter email..."
          value={email}
          onChange={(e) => handleDataChange(e, "email")}
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>
    </div>
  );
};

export default Profile;
