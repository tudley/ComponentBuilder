import { useState, type Dispatch } from 'react'
import './App.css'
import Component from './Component'
import type  { ComponentConfig } from './types';
import PermanentDrawerLeft from './components/Drawer';
function App() {


  // States
  const [components, setComponents] = useState<ComponentConfig[]>([]);
  const [count, setCount] = useState<number>(0);

  // Adds new component to components state
  const createNewComponent = (
    count : number, 
    setCount : Dispatch<React.SetStateAction<number>>
  ) => {
    const newComponent : ComponentConfig= {
      id : count,
      type : 'null',
      data : {},
    }
    setCount(count + 1)
    setComponents([...components, newComponent])
  }

  // Maint JSX return
  return (
    <>
    <PermanentDrawerLeft />
    <button onClick={() => createNewComponent(count, setCount)} >Add new component</button>
    <div className="componentContainer" >
      {components.map((component) => (
        <div>
          <Component component={component} key={component.id}/>
        </div>
      ))}
    </div>
    </>
  )
}

export default App
