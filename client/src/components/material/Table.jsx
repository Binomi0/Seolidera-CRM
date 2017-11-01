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

// function createData(id, nombre, telf, activo, negocios,tareas) {
//     return { id, nombre, telf, activo, negocios, tareas };
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
        console.log(columnData);

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
        let { data, columnData } = props;
        this.state = {
            order: 'asc',
            orderBy: 'fiscal',
            selected: -1,
            data: [],
            page: 0,
            rowsPerPage: 5,
        };
        this.itemClicked = this.itemClicked.bind(this)
    }

    componentWillMount() {
        let { data, columnData } = this.props;
        let newArray = [];
        for (let i = 0; i < data.length; i++) {
            let datos = { id: data[0][i]['id'], [columnData[0]['id']]: data[0][i][columnData[0]['id']], [columnData[1]['id']]: data[0][i][columnData[1]['id']], [columnData[2]['id']]: data[0][i][columnData[2]['id']] === true ? 'Si' : 'No', [columnData[3]['id']]: data[0][i][columnData[3]['id']].length, [columnData[4]['id']]: data[0][i][columnData[4]['id']].length }
            newArray.push(datos);
        }
        this.setState({ data: newArray })
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
        const { classes, title, columnData} = this.props;
        const { data,  order, orderBy, selected, rowsPerPage, page } = this.state;
        console.log(data);
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
                                    let newLabel = columnData[0].id;
                                    console.log(n);
                                    // console.log(columnData[0].id);
                                    return (
                                        <TableRow
                                            hover
                                            onClick={event => this.handleClick(event, n['id'], i)}
                                            onKeyDown={event => this.handleKeyDown(event, n['id'], i)}
                                            role="checkbox"
                                            aria-checked={isSelected}
                                            tabIndex={-1}
                                            key={i}
                                            selected={isSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox checked={isSelected} />
                                            </TableCell>
                                            <TableCell padding="none">{n[columnData[0].id]} </TableCell>
                                            <TableCell numeric>{n[columnData[1].id]}</TableCell>
                                            <TableCell padding="none">{n[columnData[2].id]}</TableCell>
                                            <TableCell numeric>{n[columnData[3].id]}</TableCell>
                                            <TableCell numeric>{n[columnData[4].id]}</TableCell>
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
    data: PropTypes.array.isRequired,
    columnData: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired
};

export default withStyles(styles)(EnhancedTable);