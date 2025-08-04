import { useState } from "react";
import {
  RadioGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  Paper,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

// Templates for DataFields
const dataTemplates = {
  CustomerData: {
    type: "CustomerData",
    firstName: "",
    lastName: "",
    email: "",
  },
  ItemData: {
    type: "ItemData",
    itemNumber: "",
    itemValue: "",
    itemAgeRestriction: "",
  },
};

// Component types
const componentTypes = ["Accordion", "Card"];

const Component = ({ component, removeComponent }) => {
  // States
  const [componentType, setComponentType] = useState("");
  const [forms, setForms] = useState([]);

  const key = component.id;

  // Add a new blank data form
  const handleAddForm = () => {
    setForms((prev) => [...prev, {}]);
  };

  // Change type of a specific data form
  const handleFormTypeChange = (index, newType) => {
    const template = dataTemplates[newType];
    const updated = [...forms];
    updated[index] = { ...template };
    setForms(updated);
  };

  // Update a field in a specific data form
  const handleFieldChange = (index, key, value) => {
    const updated = [...forms];
    updated[index][key] = value;
    setForms(updated);
  };

  const handleRemoveForm = (index) => {
    const updated = [...forms];
    updated.splice(index, 1);
    setForms(updated);
  };

  return (
    <Paper
      sx={{ p: 3, maxWidth: 600, margin: "20px auto", position: "relative" }}
    >
      <button
        onClick={removeComponent}
        style={{
          position: "absolute",
          top: 8,
          right: 8,
        }}
      >
        &times;
      </button>
      <TextField label="Title..." variant="outlined" />

      {/* Component Type Selector */}
      <div>
        <FormControl>
          <FormLabel>Component Type</FormLabel>
          <RadioGroup
            value={componentType}
            onChange={(e) => setComponentType(e.target.value)}
          >
            {componentTypes.map((type) => (
              <FormControlLabel
                key={type}
                value={type}
                control={<Radio />}
                label={type}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </div>
      <p>Data:</p>
      <div>
        {forms.map((form, index) => (
          <Paper
            key={index}
            elevation={2}
            sx={{
              p: 2,
              mb: 2,
              backgroundColor: "#f9f9f9", // light background
              borderRadius: 2,
              border: "1px solid #ddd",
              position: "relative",
            }}
          >
            {/* Delete "x" button */}
            <button
              onClick={() => handleRemoveForm(index)}
              style={{
                position: "absolute",
                top: 8,
                right: 8,
                background: "transparent",
                border: "none",
                fontSize: "16px",
                cursor: "pointer",
                color: "#999",
              }}
            >
              &times;
            </button>
            <div key={index} style={{ marginTop: "20px" }}>
              <FormControl fullWidth>
                <InputLabel>Choose Data Type</InputLabel>
                <Select
                  value={form.type || ""}
                  onChange={(e) => handleFormTypeChange(index, e.target.value)}
                  label="Choose Data Type"
                >
                  {Object.keys(dataTemplates).map((key) => (
                    <MenuItem key={key} value={key}>
                      {key}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Render Fields */}
              {form.type &&
                Object.entries(form).map(([key, val]) => {
                  if (key === "type") return null;
                  return (
                    <TextField
                      key={key}
                      label={key}
                      value={val}
                      fullWidth
                      sx={{ mt: 2 }}
                      onChange={(e) =>
                        handleFieldChange(index, key, e.target.value)
                      }
                    />
                  );
                })}
            </div>
          </Paper>
        ))}
        <div className="buttonDiv">
          <button onClick={handleAddForm}>+ Add Data Form</button>
          <button>+ Add Button</button>
        </div>
      </div>
    </Paper>
  );
};

export default Component;
