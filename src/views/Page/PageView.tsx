import React, { Fragment, useEffect } from "react";
import ElementRender from "./ElementRender";
import { RXElement } from "./RXElement";
import { Container, makeStyles } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import { RootState } from "store";
import { useSelector, useDispatch } from "react-redux";
import { thunkPageSchema } from "store/page/thunks";
const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 345,
    margin: theme.spacing(2),
  },
  media: {
    height: 'calc(100vh - 150px)',
  },
}));

export default function PageView(props:{match: any }) {
  const classes = useStyles();
  const selectPage = (state: RootState) => state.page;
  const pageInStore = useSelector(selectPage);
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('PageView useEffect:', props.match.params.id);
    dispatch(thunkPageSchema(props.match.params.id));
    return () => {
      
    };
  },[dispatch, props.match.params.id]);
  
  return (
    <Fragment>
      { pageInStore.schemaLoading &&
        <Container>
          <Skeleton animation="wave" height={50} width="30%" style={{ marginTop: 6 }} />
          <Skeleton animation="wave" variant="rect" className={classes.media} />
        </Container>
      }
      {/*props.children?.map((child:RXElement, index : number)=>{
        return (
          <ElementRender key={child.id} element={child} />
        )
      })*/}
    </Fragment>
  )
}