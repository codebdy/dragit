import React, { Fragment, useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import { ListViewHead } from './ListViewHead';
import ListViewToolbar from './ListViewToolbar';
import { ILabelItem } from '../../base/Model/ILabelItem';
import intl from 'react-intl-universal';
import { OPEN_PAGE_ACTION, PageActionHandle } from 'base/PageAction';
import { Skeleton } from '@material-ui/lab';
import { Tooltip, IconButton, Paper } from '@material-ui/core';
import MdiIcon from '../common/MdiIcon';
import { IPageJumper } from 'base/Model/IPageJumper';
import { IQueryParam } from 'components/ListView/IQueryParam';
import { IPaginate } from 'base/Model/IPaginate';
import ConfirmDialog from 'base/Widgets/ConfirmDialog';
import { ICommand } from 'base/Model/ICommand';
import { gql, useLazyQuery, useMutation } from '@apollo/react-hooks';
import { useAppStore } from 'store/helpers/useAppStore';
import { ID } from 'base/Model/graphqlTypes';
import { useQueryGQL } from './useQueryGQL';
import { useMutationGQL } from './useMutationGQL';
import { IMeta } from 'base/Model/IMeta';
import { RXNode } from 'base/RXNode/RXNode';
import ComponentRender from 'base/ComponentRender';
import { ModelStore } from 'base/ModelTree/ModelStore';
import { ModelProvider } from 'base/ModelTree/ModelProvider';
import {observer} from "mobx-react-lite";

export const COMMAND_QUERY = "query";

export interface Row{
  id:any,
  [key:string]:any,
}

interface ConfirmCommand{
  command:ICommand,
  ids:ID[],
}

function creatEmpertyRows(length:number){
  let rows = []
  for(var i = 0; i < length; i++){
    rows.push({id:i+1});
  }

  return rows;
}


//const MUTATION = gql`
//`
interface IListQuery{
  //Query Name
  name:string;
  where:any;
  orderBy:[any];
}

function transferQueryParams(params:IQueryParam):any{
  return {first:params.first, page:params.page}
}


const ListViewInner = observer((
    props: {
      className:string, 
      filters:Array<ILabelItem>,
      batchCommands:Array<ICommand>,
      rowsPerPageOptions:string,
      defalutRowsPerPage:number,
      onAction: PageActionHandle,
      query?:string,
      mutation?:string,
      variant?:'elevation' | 'outlined',
      elevation:number,
      childrenNodes?:Array<RXNode<IMeta>>,
      isDeisgning?:boolean,
      children?:any,
    } 
  )=>{

  const {
    filters = [], 
    batchCommands = [], 
    rowsPerPageOptions = "10,25,50", 
    defalutRowsPerPage = 10,
    onAction,
    query,
    mutation,
    variant,
    elevation,
    childrenNodes = [],
    isDeisgning,
    children,
  } = props
  
  const [queryParam, setQueryParam] = useState<IQueryParam>({
    page : 0,
    first: defalutRowsPerPage,
  });
  const [selected, setSelected] = useState<ID[]>([]);
  const [rowSchemaStore]  = useState(new ModelStore());
  const appStore = useAppStore();
  const queryGQL = useQueryGQL( rowSchemaStore.toFieldsGQL(), query, queryParam );
  const mutationGQL = useMutationGQL(mutation, selected);
  const [excuteQuery, { called, loading:queryLoading, error, data, refetch }] = useLazyQuery(gql`${queryGQL.gql}`, {
    variables: { ...queryParam },
    notifyOnNetworkStatusChange: true,
    fetchPolicy:'no-cache'
  });

  const [excuteMutation, { loading:mutationLoading, error:mutationsError, data:mutationResult }] = useMutation(gql`${mutationGQL.gql}`,
    {onCompleted:()=>{appStore.setSuccessAlert(true)}}
  );

  const loading = queryLoading || mutationLoading;
  useEffect(()=>{
    if(!query){
      return;
    }
    if(!called){
      excuteQuery({variables:{...transferQueryParams(queryParam)}});
    }
    else{
      refetch && refetch({...transferQueryParams(queryParam)});
    }
    setSelected([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[queryParam, mutationResult])

  useEffect(()=>{
    let realError = error || mutationsError
    if(realError){
      console.log(realError, data)
      appStore.infoError(intl.get('server-error'), realError?.message)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[error, mutationsError])

  const [confirmCommand, setConfirmCommand] = useState<ConfirmCommand>();

  const updateQueryParam = (field:string, value:any, showAlert = false)=>{
    setQueryParam({...queryParam, [field]:value});
  }

  const queryedData = (data && query) ? data[query] : {} as any;
  const rows = loading ? creatEmpertyRows(queryParam.first) : (queryedData?.data || []);
  const paginatorInfo = (queryedData?.paginatorInfo ||{}) as IPaginate

  const parseRowsPerPageOptions = ()=>{
    let ret: number[] = [];
    rowsPerPageOptions?.replace('，',',').split(',').forEach(i=>{
      ret.push(parseInt(i));
    })
    return ret;
  }

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows?.map((n:Row) => n.id);
      setSelected(newSelecteds||[]);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id:ID) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: ID[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const jumpToPage = (pageParams:IPageJumper, row:any)=>{
    onAction({name:OPEN_PAGE_ACTION, page:{...pageParams, dataId:row.id}})
  }

  const handleBatchAction = (command:ICommand)=>{
    if(command.confirmMessage){
      setConfirmCommand({command:command, ids:selected})
    }
    else{
      excuteMutation({variables:{
        command:command.slug,
        ids:selected
      }})
      //updateOperateParam('command', command.slug, true);      
    }
  }
  const handleRowAction = (command:ICommand, rowId:ID)=>{
    if(command.confirmMessage){
      setConfirmCommand({command:command, ids:[rowId]});
    }
    else{
      excuteMutation({variables:{
        command:command.slug,
        ids:[rowId]
      }})
    }
  }

  const handleConfirm = ()=>{
    if(confirmCommand){
      excuteMutation({variables:{
        command:confirmCommand.command.slug,
        ids:confirmCommand.ids
      }})
    }
    setConfirmCommand(undefined);
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateQueryParam('rowsPerPage', parseInt(event.target.value, 10));
  };

  const isSelected = (id: ID) => selected.indexOf(id) !== -1;

  return (
    <Fragment>
      <Table style={{display:'none'}}>
        <TableBody>
          <TableRow>
            <ModelProvider value={rowSchemaStore}>
              {
                childrenNodes?.map((column, colIndex) => {
                  return(
                    <ComponentRender key={colIndex} component = {column} />
                  )
                })
              }
              </ModelProvider>
            </TableRow>
        </TableBody>
      </Table>
      <Paper variant = {variant} elevation = {elevation}>
        <ListViewToolbar
          keyword = {queryParam.keywords}
          numSelected={selected.length}
          filters = {filters}
          batchCommands = {batchCommands}
          filterValues = {queryParam.filterValues}
          onFilterChange = {values=>updateQueryParam('filterValues', values)}
          onKeywordChange = {keywords =>updateQueryParam('keywords', keywords)}
          onBatchAction = {handleBatchAction}
        />
        <TableContainer>
          <Table
            aria-labelledby="tableTitle"
            size={'medium'}
            aria-label="enhanced table"
            style={{marginTop:'1px'}}
          >
            {
              isDeisgning?
              <TableBody>
                <TableRow>
                  {children}
                </TableRow>
              </TableBody>
              :
              <Fragment>
                <ListViewHead
                  numSelected={selected.length}
                  orders = {queryParam.orders}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={orders=>updateQueryParam('orders', orders)}
                  rowCount={rows?.length || 0}
                  columns = {childrenNodes}
                />
                <TableBody>
                  {rows?.map((row:Row, index: any) => {
                      const isItemSelected = isSelected(row.id);
                      const labelId = `listview-${index}`;
                      return (
                        <TableRow
                          hover
                          id={row.id}
                          onClick={(event) => handleClick(event, row.id)}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.id}
                          selected={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            {
                              loading ? 
                              <Skeleton animation="wave" height={50} width="60%" />
                              :
                              <Checkbox
                                id = {row.id.toString()}
                                checked={isItemSelected}
                                inputProps={{ 'aria-labelledby': labelId }}
                              />
                            }
                          </TableCell>
                          <ModelProvider value={new ModelStore(row)}>
                            {
                              childrenNodes?.map((column, colIndex) => {
                                return(
                                  loading ? 
                                  <TableCell key={row.id + '-' + colIndex} >
                                    <Skeleton animation="wave" height={50} width="50%" />
                                  </TableCell>
                                  :
                                  <ComponentRender key={colIndex} component = {column} />
                                )
                              })
                            }
                          </ModelProvider>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Fragment>
            }
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={parseRowsPerPageOptions()}
          component="div"
          labelRowsPerPage = {intl.get('rows-per-page') + ':'}
          count={paginatorInfo.total||0}
          rowsPerPage={queryParam.first||0}
          page={paginatorInfo.currentPage||0}
          onChangePage={(event, newPage)=>updateQueryParam('page', newPage)}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          SelectProps={{
            inputProps: { 'aria-label': 'rows per page' },
          }}
        />
      </Paper>
      <ConfirmDialog 
        message = {confirmCommand?.command.confirmMessage||'Confirm message'}
        open = {!!confirmCommand}
        onCancel ={()=>{setConfirmCommand(undefined)}}
        onConfirm = {handleConfirm}
      /> 
    </Fragment>
  );
})

export default ListViewInner;

