/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-disable react/no-multi-comp */

import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import keycode from 'keycode';
import Table, {
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
} from 'material-ui/Table';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import DeleteIcon from 'material-ui-icons/Delete';
import EditIcon from 'material-ui-icons/Edit';
import ViewIcon from 'material-ui-icons/RemoveRedEye';
import SearchIcon from 'material-ui-icons/Search';
import FilterListIcon from 'material-ui-icons/FilterList';

// let counter = 0;
// function createData(value, index) {
//     console.log('VALUE: ', value, 'INDEX: ', index);
//     counter += 1;
//     if (typeof index !== 'number') {
//         // console.log('No es un array, saliendo...');
//         return
//     }
//     let arrayDatos = Object.assign();
//     // console.log('Llamando a createData, VALUE:',value);
//     // console.log('Llamando a createData, INDEX:',index);
//     let { fiscal, tlf, activo, llamadas, email } = value;
//     return { id: counter, fiscal, tlf, activo, llamadas, email };
// }

// const columnData = [
//     { id: 'nombre', numeric: false, disablePadding: true, label: 'Nombre ' },
//     { id: 'telefono', numeric: true, disablePadding: false, label: 'Teléfono' },
//     { id: 'activo', numeric: false, disablePadding: false, label: 'Activo' },
//     { id: 'pedidos', numeric: false, disablePadding: false, label: 'Pedidos' },
//     { id: 'tareas', numeric: false, disablePadding: false, label: 'Tareas' },
// ];

class EnhancedTableHead extends React.Component {
    static propTypes = {
        numSelected: PropTypes.number.isRequired,
        onRequestSort: PropTypes.func.isRequired,
        onSelectAllClick: PropTypes.func.isRequired,
        order: PropTypes.string.isRequired,
        orderBy: PropTypes.string.isRequired,
        rowCount: PropTypes.number.isRequired,
    };

    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const { order, orderBy, columnData } = this.props;

        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                        {/*<Checkbox*/}
                            {/*indeterminate={numSelected > 0 && numSelected < rowCount}*/}
                            {/*checked={numSelected === rowCount}*/}
                            {/*onChange={onSelectAllClick}*/}
                        {/*/>*/}
                    </TableCell>
                    {columnData.map(column => {
                        return (
                            <TableCell
                                key={column.id}
                                numeric={column.numeric}
                                padding={column.disablePadding ? 'none' : 'default'}
                            >
                                <Tooltip title="Ordenar" placement="bottom-start" enterDelay={300}>
                                    <TableSortLabel
                                        active={orderBy === column.id}
                                        direction={order}
                                        onClick={this.createSortHandler(column.id)}
                                    >
                                        {column.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        );
                    }, this)}
                </TableRow>
            </TableHead>
        );
    }
}

const toolbarStyles = theme => ({
    root: {
        paddingRight: 2,
    },
    highlight:
        theme.palette.type === 'light'
            ? {
            color: theme.palette.secondary.A700,
            backgroundColor: theme.palette.secondary.A100,
        }
            : {
            color: theme.palette.secondary.A100,
            backgroundColor: theme.palette.secondary.A700,
        },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    },
});

let EnhancedTableToolbar = props => {
    // console.log(props);
    const { numSelected, classes, itemClicked } = props;

    function selectItemClicked(item) {
        itemClicked(item)
        // view(e)
    }

    return (
        <Toolbar
            className={classNames(classes.root, {
                [classes.highlight]: numSelected > -1,
            })}
        >
            <div className={classes.title}>
                {numSelected > -1 ? (
                    <Typography type="subheading">{props.title} seleccionado</Typography>
                ) : (
                    <Typography type="title">Lista de {props.title}s</Typography>
                )}
            </div>
            <div className={classes.spacer} />
            <div className={classes.actions}>
                {numSelected > -1 ? (
                    <div style={{display: 'flex'}}>
                        <Tooltip title="Ver">
                            <IconButton aria-label="Ver" onClick={() => selectItemClicked(numSelected)}>
                                <ViewIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Editar">
                            <IconButton aria-label="Editar">
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Borrar">
                            <IconButton aria-label="Borrar">
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                ) : (
                    <div style={{display: 'flex'}}>
                        <Tooltip title="Buscar">
                            <IconButton aria-label="Buscar">
                                <SearchIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Filtrar Lista">
                            <IconButton aria-label="Filtrar Lista">
                                <FilterListIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                )}
            </div>
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,

};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
});


class EnhancedTable extends React.Component {
    constructor(props) {
        super(props);
        let { datos, columnData } = props;

        this.state = {
            order: 'asc',
            orderBy: 'fiscal',
            selected: -1,
            data: datos,
            page: 0,
            rowsPerPage: 5,
            columnData,
        };
        this.itemClicked = this.itemClicked.bind(this)
    }

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        const data =
            order === 'desc'
                ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
                : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

        this.setState({ data, order, orderBy });
    };

    handleSelectAllClick = (event, checked) => {
        // if (checked) {
        //     this.setState({ selected: this.state.data.map(n => n.id) });
        //     return;
        // }
        // this.setState({ selected: [] });
    };

    handleKeyDown = (event, id, i) => {
        if (keycode(event) === 'space') {
            this.handleClick(event, id, i);
        }
    };

    handleClick = (event, id, i) => {

        if (event.target.checked === false) {
            this.setState({ selected: -1 })
        } else {
            this.setState({ selected: i });
        }
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    // isSelected = id => this.state.selected.indexOf(id) !== -1;
    isSelected = id => this.state.selected === id ;

    // viewData(e) {
    //     this.props.itemSelected(e)
    // }

    itemClicked(item) {
        this.props.itemSelected(item)
    }

    render() {
        // console.log(this.state.data[this.state.selected]);
        const { classes, title} = this.props;
        const { data, order, orderBy, selected, rowsPerPage, page, columnData } = this.state;
        if (this.state.data.length <= 0) { return <div> </div> } else {
            return (
                <Paper className={classes.root}>
                    <EnhancedTableToolbar numSelected={selected} title={title} data={data} itemClicked={this.itemClicked} />
                    <div className={classes.tableWrapper}>
                        <Table>
                            <EnhancedTableHead
                                numSelected={selected}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={this.handleSelectAllClick}
                                onRequestSort={this.handleRequestSort}
                                rowCount={data ? data.length : []}
                                columnData={columnData}
                            />
                            <TableBody>
                                {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((n,i) => {
                                    const isSelected = this.isSelected(i);
                                    return (
                                        <TableRow
                                            hover
                                            onClick={event => this.handleClick(event, n._id, i)}
                                            onKeyDown={event => this.handleKeyDown(event, n._id, i)}
                                            role="checkbox"
                                            aria-checked={isSelected}
                                            tabIndex={-1}
                                            key={n._id}
                                            selected={isSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox checked={isSelected} />
                                            </TableCell>
                                            <TableCell padding="none">{n.fiscal || n.nombre || n.agente}</TableCell>
                                            <TableCell numeric>{ n.telf || n.tlf }</TableCell>
                                            <TableCell padding="none">{ !n.cliente ? n.web ? n.web : n.objetivo ? n.objetivo : '' : n._id }</TableCell>
                                            <TableCell numeric>{ (n.negocios ? n.negocios.length : n.cliente ) }</TableCell>
                                            <TableCell numeric>{ (n.tareas ? n.tareas.length : n.ciudad ) }</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                            <TableFooter>
                                <TablePagination
                                    count={data.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onChangePage={this.handleChangePage}
                                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                />
                            </TableFooter>
                        </Table>
                    </div>
                </Paper>
            );
        }
    }
}

EnhancedTable.propTypes = {
    classes: PropTypes.object.isRequired,
    datos: PropTypes.array.isRequired,
    columnData: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired
};

export default withStyles(styles)(EnhancedTable);