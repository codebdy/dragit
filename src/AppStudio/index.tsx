import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import intl from 'react-intl-universal';
import { useQuery } from '@apollo/react-hooks';
import { GET_RX_APP_LIST } from 'Base/GraphQL/GQLs';
import { useShowAppoloError } from 'Store/Helpers/useInfoError';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    logoIcon: {
      marginRight: theme.spacing(2),
      backgroundColor: theme.palette.primary.main,
      letterSpacing:'1px',
      fontWeight:'bold',
      fontSize:'20px',
    },
    titleArea:{
      padding:theme.spacing(4,0),
    },
    title:{
      fontSize:'1.6rem',
    },

    addButton:{
      marginLeft:theme.spacing(2),
    },
    githubLink:{
      color: theme.palette.text.secondary,
      marginRight:theme.spacing(1),
    },
  }),
);

export const AppStudio = observer(() => {
  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_RX_APP_LIST);
  useShowAppoloError(error);
  const apps = data ? data.rxApps :[];

  return (
    <div className={classes.root}>
      AppStudio
    </div>
  );
})
