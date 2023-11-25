import React, { useState } from "react";
import "./WebsiteForm.css";
import { useNavigate } from "react-router-dom";

const WebsiteForm = () => {
  const navigate = useNavigate();

  const navigateHandler = () => {
    navigate("/websiteData");
  };

  const [websiteUrl, setWebsiteUrl] = useState("");
  const [websitePage, setWebsitePage] = useState("");
  const [fields, setFields] = useState([{ name: null, description: null }]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "websiteUrl") {
      setWebsiteUrl(value);
    } else {
      const updatedFields = [...fields];
      const fieldIndex = parseInt(name);
      updatedFields[fieldIndex] = {
        ...updatedFields[fieldIndex],
        [event.target.name]: value,
      };
      setFields(updatedFields);
    }
  };

  const handleAddField = () => {
    setFields([...fields, { name: null, description: null }]);
  };

  const handleRemoveField = (index) => {
    const updatedFields = [...fields];
    updatedFields.splice(index, 1);
    setFields(updatedFields);
  };

  return (
    <div className="form-container">
      <label className="input-label">Target Website URL:</label>
      <input
        type="text"
        className="input-field"
        name="websiteUrl"
        value={websiteUrl}
        onChange={handleInputChange}
      />
      <label className="input-label">No of Pages:</label>
      <input
        type="text"
        className="input-field"
        name="websitePage"
        value={websitePage}
        onChange={handleInputChange}
      />

      {fields.map((field, index) => (
        <div key={index}>
          <label className="input-label">Target Field Name:</label>
          <input
            type="text"
            className="input-field"
            name={`${index}.name`}
            value={field.name}
            onChange={handleInputChange}
          />

          {/* <label className="input-label">Field Description:</label>
          <input
            type="text"
            className="input-field"
            name={`${index}.description`}
            value={field.description}
            onChange={handleInputChange}
          /> */}

          <button
            className="remove-field-button"
            onClick={() => handleRemoveField(index)}
          >
            Remove Field
          </button>
        </div>
      ))}

      <button className="add-field-button" onClick={handleAddField}>
        Add Field
      </button>

      <button className="submit-button" type="submit" onClick={navigateHandler}>
        Submit
      </button>
    </div>
  );
};

export default WebsiteForm;
