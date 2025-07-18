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
export type FormDataErrors = {
  name: string;
  age: string;
  email: string;
  interests: string;
  theme: string;
};

export type TabFormProps = {
  data: FormData;
  setData: React.Dispatch<React.SetStateAction<FormData>>;
  errors: FormDataErrors;
};

const TabForm = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    age: "",
    email: "",
    interests: [],
    theme: "dark",
  });
  const [errors, setErrors] = useState<FormDataErrors>({
    name: "",
    age: "",
    email: "",
    interests: "",
    theme: "",
  });

  const tabs = [
    {
      name: "Profile",
      component: Profile,
      validate: () => {
        const err = {} as FormDataErrors;
        if (!formData.name || formData.name.length < 2) {
          err.name = "Name is not valid";
        }
        if (!formData.age || Number(formData.age) < 18) {
          err.age = "Age is not valid";
        }
        if (!formData.email || formData.email.length < 2) {
          err.email = "Email is not valid";
        }
        setErrors(err);
        return err.name || err.age || err.email ? false : true;
      },
    },
    {
      name: "Interests",
      component: Interests,
      validate: () => {
        const err = {} as FormDataErrors;
        if (formData.interests.length < 1) {
          err.interests = "Select atleast one interest";
        }

        setErrors(err);
        return err.interests ? false : true;
      },
    },
    {
      name: "Settings",
      component: Settings,
      validate: () => {
        return true;
      },
    },
  ];

  const ActiveTabComponent = tabs[activeTab].component;

  const isDataValidated = () => {
    return tabs[activeTab].validate();
  };

  const handleNextClick = () => {
    if (isDataValidated()) {
      setActiveTab((prev) => prev + 1);
    }
  };

  const handlePrevClick = () => {
    if (isDataValidated()) {
      setActiveTab((prev) => prev - 1);
    }
  };

  const handleSubmitClick = () => {
    console.log("Submitted Data: ", formData);
  };

  return (
    <div>
      <div className="heading-container">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`${activeTab === index ? "bg-color" : ""} heading`}
            onClick={() => setActiveTab(index)}
          >
            {tab.name}
          </div>
        ))}
      </div>
      <div className="tab-body">
        <ActiveTabComponent
          data={formData}
          setData={setFormData}
          errors={errors}
        />
      </div>
      <div className="action-btns">
        {activeTab > 0 && (
          <button onClick={handlePrevClick} className="action-btn">
            Previous
          </button>
        )}
        {activeTab < tabs.length - 1 && (
          <button onClick={handleNextClick} className="action-btn">
            Next
          </button>
        )}
        {activeTab === tabs.length - 1 && (
          <button onClick={handleSubmitClick} className="action-btn">
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default TabForm;
