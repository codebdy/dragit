import React, { useEffect, useState } from 'react';
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
import { ListViewCell } from './ListViewCell';
import ConfirmDialog from 'base/Widgets/ConfirmDialog';
import { ICommand } from 'base/Model/ICommand';
import gql from 'graphql-tag';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { IColumn } from 'components/ListView/IColumn';
import { useAppStore } from 'store/helpers/useAppStore';
import { resolveFieldGQL } from './CellRenders';

export const COMMAND_QUERY = "query";

export interface Row{
  id:any,
  [key:string]:any,
}

interface ConfirmCommand{
  command:ICommand,
  ids:number[],
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

const ListView = React.forwardRef((
    props: {
      className:string, 
      columns:Array<IColumn>, 
      filters:Array<ILabelItem>,
      batchCommands:Array<ICommand>,
      rowCommands:Array<ICommand>,
      rowsPerPageOptions:string,
      defalutRowsPerPage:number,
      onAction: PageActionHandle,
      query?:IListQuery,
      mutation?:string,
      variant?:'elevation' | 'outlined',
      elevation:number,
    }, 
    ref:any
  )=>{

  const {
    className, 
    //value, 
    columns = [], 
    filters = [], 
    rowCommands = [], 
    batchCommands = [], 
    rowsPerPageOptions = "10,25,50", 
    defalutRowsPerPage = 10,
    onAction,
    query,
    mutation,
    variant,
    elevation,
    ...rest
  } = props
  
  const [queryParam, setQueryParam] = useState<IQueryParam>({
    page : 0,
    first: defalutRowsPerPage,
  });
  const appStore = useAppStore();

  const createQueryGQL = ()=>{
    let fields = ''
    columns?.forEach((colum)=>{
      fields = fields + ' ' + resolveFieldGQL(colum);
    })
    const QUERY_GQL = gql`
      query ($first:Int, $page:Int, $where: JSON, $orderBy: JSON){
        ${query?.name}(first:$first, page:$page, where:$where, orderBy:$orderBy){
          data {
              id
              ${fields}
            }
            paginatorInfo {
              count
              currentPage
              hasMorePages
              lastPage
              perPage
              total
            }
        }
      }
    `;
    return QUERY_GQL;
  }

  const createMutationGQL = ()=>{
    const MUTATION_GQL = gql`
      mutation ($command:String!, $ids:[String!]!){
        ${mutation}(command:$command, ids:$ids){
          id
        }
      }
    `;

    return MUTATION_GQL;
  }

  const [excuteQuery, { called, loading:queryLoading, error, data, refetch }] = useLazyQuery(createQueryGQL(), {
    variables: { ...queryParam },
    notifyOnNetworkStatusChange: true
  });

  const [excuteMutation, { loading:mutationLoading, error:mutationsError, data:mutationResult }] = useMutation(createMutationGQL(),
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

  //const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [confirmCommand, setConfirmCommand] = useState<ConfirmCommand>();

  const updateQueryParam = (field:string, value:any, showAlert = false)=>{
    //setShowSuccessAlert(showAlert);
    setQueryParam({...queryParam, [field]:value});
  }

  const [selected, setSelected] = React.useState<number[]>([]);
  const queryedData = (data && query?.name) ? data[query?.name] : {} as any;
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

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: number[] = [];

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
  const handleRowAction = (command:ICommand, rowId:number)=>{
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

  const hasRowCommands = rowCommands && rowCommands.length > 0;
  

  const isSelected = (name: number) => selected.indexOf(name) !== -1;

  return (
    <div className={className} {...rest} ref={ref}>
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
          >
            <ListViewHead
              numSelected={selected.length}
              orders = {queryParam.orders}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={orders=>updateQueryParam('orders', orders)}
              rowCount={rows?.length || 0}
              columns = {columns}
              rowCommandsCount = {rowCommands?.length}
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
                      {
                        columns.map((column, colIndex) => {
                          return(
                            loading ? 
                            <TableCell key={row.id + '-' + colIndex + '-' + column.field} {... column.props} >
                              <Skeleton animation="wave" height={50} width="50%" />
                            </TableCell>
                            :
                            <ListViewCell
                              key = {row.id + '-' + colIndex + '-' + column.field} 
                              row={row} 
                              columns = {columns} 
                              colIndex = {colIndex} 
                            />
                          )
                        })
                      }
                      {
                        hasRowCommands&&
                        (
                          loading ? 
                            <TableCell key={row.id + '-command'} align="right">
                              <Skeleton animation="wave" height={50} width="50%" />
                            </TableCell>
                          :
                            <TableCell key={row.id + '-command'} align="right">
                              {
                                rowCommands?.map((command, index)=>{
                                  return(
                                    <Tooltip title={command.label} key={command.slug}>
                                      <IconButton aria-label={command.label} name={'row-action-' + command.slug}
                                        onClick = {(e)=>{
                                          command.jumpToPage ? jumpToPage(command.jumpToPage as IPageJumper, row) : handleRowAction(command, row.id);
                                          e.stopPropagation();
                                        }}
                                        size = "medium"
                                      >
                                        <MdiIcon iconClass = {command.icon} size="16" />
                                      </IconButton>
                                    </Tooltip>
                                  )
                                })
                              }                              
                            </TableCell>
                        )
                      }
                    </TableRow>
                  );
                })}
            </TableBody>
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
    </div>
  );
})

export default ListView;

