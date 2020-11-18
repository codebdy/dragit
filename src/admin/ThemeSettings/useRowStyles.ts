import { makeStyles, Theme, createStyles } from "@material-ui/core";

const useRowStyles = makeStyles((theme: Theme) =>
  createStyles({
    title:{
      marginTop:theme.spacing(2),
    },
    content:{
      padding:theme.spacing(1),
      display:'flex',
      justifyContent:"space-around",
    }
  }),
);

export default useRowStyles;