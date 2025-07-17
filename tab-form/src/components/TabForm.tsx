import { useState } from "react";
import Interests from "./Interests";
import Profile from "./Profile";
import Settings from "./Settings";

export interface FormData {
  name: string;
  age: string;
  email: string;
  interests: string[];
  theme: string;
}

export type TabFormProps = {
  data: FormData;
  setData: React.Dispatch<React.SetStateAction<FormData>>;
};

const tabs = [
  {
    name: "Profile",
    component: Profile,
  },
  {
    name: "Interests",
    component: Interests,
  },
  {
    name: "Settings",
    component: Settings,
  },
];

const TabForm = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    age: "",
    email: "",
    interests: [],
    theme: "dark",
  });

  const ActiveTabComponent = tabs[activeTab].component;

  const handleNextClick = () => {
    setActiveTab((prev) => prev + 1);
  };

  const handlePrevClick = () => {
    setActiveTab((prev) => prev - 1);
  };

  const handleSubmitClick = () => {
    console.log("Data", formData);
  };

  return (
    <div>
      <div className="heading-container">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className="heading"
            onClick={() => setActiveTab(index)}
          >
            {tab.name}
          </div>
        ))}
      </div>
      <div className="tab-body">
        <ActiveTabComponent data={formData} setData={setFormData} />
      </div>
      <div className="action-btns">
        {activeTab > 0 && <button onClick={handlePrevClick}>Previous</button>}
        {activeTab < tabs.length - 1 && (
          <button onClick={handleNextClick}>Next</button>
        )}
        {activeTab === tabs.length - 1 && (
          <button onClick={handleSubmitClick}>Submit</button>
        )}
      </div>
    </div>
  );
};

export default TabForm;
