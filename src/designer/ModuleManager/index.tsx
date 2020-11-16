import { Button, Container, Grid, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import Spacer from "components/common/Spacer";
import DesignerLayout from "designer/Layout";
import React, { Fragment } from "react";
import LeftContent from "./LeftContent";
import intl from "react-intl-universal";
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles({
  table: {
    widht: '100%',
  },
});

function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const ModuleManager = (props:{children?: any, history:any})=>{
  const{history} = props;
  const classes = useStyles();

  const handleReturn = ()=>{
    history.goBack();
  }

  return (
    <DesignerLayout
      leftArea={
        <LeftContent />
      }
      toolbar = {
        <Fragment>
          <Spacer></Spacer>
          <Button variant="contained" color="primary" onClick={handleReturn} size="large">
            {intl.get('go-back')}
          </Button>          
        </Fragment>
      }      
    >
      <Container>
        <Grid container spacing={2} justify="space-between" alignItems="center">
          <Grid item>
            <h2>模块页面列表：文章管理</h2>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" size="large">
              {intl.get('add-new')}
            </Button>   
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>标题</TableCell>
                    <TableCell align="right">API</TableCell>
                    <TableCell align="right">表单页</TableCell>
                    <TableCell align="right">索引页</TableCell>
                    <TableCell align="right">操作</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.calories}</TableCell>
                      <TableCell align="right">{row.fat}</TableCell>
                      <TableCell align="right">{row.carbs}</TableCell>
                      <TableCell align="right">{row.protein}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>        
      </Container>
    </DesignerLayout>
  )
}

export default  withRouter(ModuleManager)