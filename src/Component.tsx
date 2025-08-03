import { useEffect, useState } from "react"
import type { ComponentConfig } from "./types"
import { RadioGroup, TextField, FormControl, FormLabel, FormControlLabel, Radio, Paper} from "@mui/material";
/**
 * Component, takes a component object which is manipulated by the user through forms.
 * This object can be exported later as a blueprint for rendering an array of components
 */
const Component = ({component} : ComponentConfig) => {

    // State
    // Here we store the compnents objects structure
    const [componentObject, setComponentObject] = useState<ComponentConfig>(component)
    // components type (eg. accordion, card...)
    const [type, setType] = useState<string>('')
    // components 'data' attribute, gets assigned once type is selected
    // data is the key/value pairs that make the content of the component
    const [data, setData] = useState<Record<string, string>>({});

    // UseEffects
    // When type or data state is changed, update object state to reflect 
    useEffect(() => {
        setComponentObject({
            id : component.id,
            type : type,
            data : data
        })
    },
    [type, data])

    // When type is updated, update the data field for the component
    useEffect(() => {
    assignDataBody(type)
    },
    [type])

    // Variables
    const types = ['accordion', 'card'];

    // Functions

    // when Type is chosen, we know the strucutre of data
    const assignDataBody = (type : string) => {
        if (type === "accordion") {
            const newData = {
                title : '',
                body : ''
            }
            setData(newData)
        } else if (type === 'card') {
                const newData = {
                title : '',
                rating : ''
            }
            setData(newData)
        }
    }

    const handleDataFieldChange = (e : string, key : string) => {
        setData(prev => ({...prev, [key] : e}))
    }

    const handleTypeChange = (e : string, setType) => {
        setType(e);
    }



    // Main JSX return 
    return (
        <>
        <Paper
            elevation={3}
            sx={{ 
                p: 3,           // padding inside the paper
                maxWidth: 600,  // optional max width
                margin: "20px auto" // centers paper horizontally with margin top/bottom
            }}
        >
            <p>Component id: {component.id}</p>
            <div>
                <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">Type:</FormLabel>
                    <RadioGroup
                        name="radio-buttons-group"
                        onChange={(e) => handleTypeChange(e.target.value, setType)}
                    >
                        {types.map((type) => <FormControlLabel value={type} control={<Radio />} label={type} />)}
                    </RadioGroup>
                </FormControl>
            </div>
            <p>Component data: </p>
            {Object.entries(data).map(([key, value]) => 
                <div className='dataKeyValueContainer'>
                    <p>{key}</p>
                    <TextField 
                    defaultValue={value}
                    onChange={(e) => handleDataFieldChange(e.target.value, key)}/>
                </div>
                )
            }
        </Paper>
        </>
    )
}
    



export default Component