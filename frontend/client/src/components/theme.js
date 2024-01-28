import {
    createTheme,
    responsiveFontSizes
  } from '@mui/material'
  
  let theme = createTheme({
    typography: {
      fontFamily: [
                    "Roboto",
                  ],
      fontSize:   18,
    }
  })
  
  // To use responsive font sizes, include the following line
  theme     = responsiveFontSizes(theme)
  
  export default theme