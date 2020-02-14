import {makeStyles} from '@material-ui/core/styles'

const ModalStyles = makeStyles(theme=>({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      paper: {
        backgroundColor: 'rgb(248, 248, 248)',
        border: 'none',
        borderRadius: 6,
        boxShadow: theme.shadows[5],
        width: "50%"
      },
      destab: {
          display: "flex",
          flexDirection: "row", 
          width: "100%",
          position: "auto"
      },
      tabSection: {
          position: "relative", 
          flexGrow: 1,
          backgroundColor: theme.palette.background.paper
      },
      descriptionSection: {
          position: "relative",
          backgroundColor: theme.palette.background.paper,
          marginRight: "2%",
          width: `30%`,
          padding: '45px 30px'
      },
      formStyle:{
          padding: "0 10% 10% 10%"
      },
      textDescription: {
        textAlign: "justify"
      }
}))

export default ModalStyles