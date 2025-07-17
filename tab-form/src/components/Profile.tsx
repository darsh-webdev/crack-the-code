import type { TabFormProps } from "./TabForm";

const Profile = ({ data, setData }: TabFormProps) => {
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
    <div>
      <div>
        <label>Name: </label>
        <input
          type="text"
          placeholder="Enter name..."
          value={name}
          onChange={(e) => handleDataChange(e, "name")}
        />
      </div>
      <div>
        <label>Age: </label>
        <input
          type="number"
          placeholder="Enter age..."
          value={age}
          onChange={(e) => handleDataChange(e, "age")}
        />
      </div>
      <div>
        <label>Email: </label>
        <input
          type="email"
          placeholder="Enter email..."
          value={email}
          onChange={(e) => handleDataChange(e, "email")}
        />
      </div>
    </div>
  );
};

export default Profile;
