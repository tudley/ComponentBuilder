import { useState } from "react";
import "./App.css";
import Component from "./Component";

function App() {
  // States
  const [components, setComponents] = useState([]);
  const [count, setCount] = useState(0);

  // Adds new component to components state
  const createNewComponent = (count, setCount) => {
    const newComponent = {
      id: count,
      type: "null",
      data: {},
    };
    setCount(count + 1);
    setComponents([...components, newComponent]);
  };

  const removeComponent = (index) => {
    const updated = [...components];
    updated.splice(index, 1);
    setComponents(updated);
  };
  // Maint JSX return
  return (
    <>
      <button onClick={() => createNewComponent(count, setCount)}>
        Add new component
      </button>
      <div className="componentContainer">
        {components.map((component, index) => (
          <div>
            <Component
              component={component}
              removeComponent={() => removeComponent(index)}
              key={component.id}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
