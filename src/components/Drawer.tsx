import { Drawer } from "@mui/material"

const PermanentDrawerLeft = () => {

    const drawerWidth = 100

    return (
        <>
           <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      />
        </>
    )
}

export default PermanentDrawerLeft