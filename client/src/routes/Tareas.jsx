import React, { Component } from 'react';
import Header from '../components/Header';
import Crear from '../components/Crear';
import Table from '../components/material/Table';
import Button from 'material-ui/Button';
import CloseIcon from 'material-ui-icons/Close';
// pues no parece que falte na


class Tareas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tareas: [],
            tabla:[],
            editando: false,
            selected: '',
            columnData: []
        }
    }

    componentWillMount() {
        let newArray = [], datos;
        let columnData = [
            { id: 'cliente', numeric: false, disablePadding: true, label: 'Cliente' },
            { id: 'fecha_venta', numeric: false, disablePadding: false, label: 'Fecha Venta' },
            { id: 'asunto', numeric: false, disablePadding: false, label: 'Asunto' },
            { id: 'propietario', numeric: false, disablePadding: false, label: 'Propietario' },
            { id: 'descripcion', numeric: false, disablePadding: false, label: 'Descripción' },
        ];
        fetch('/tareas')
            .then(res => res.json())
            .then(tareas => {
                datos = tareas.map((tarea, index) => {
                    let data = {
                        id: index,
                        cliente: tarea.cliente,
                        fecha_venta: tarea.fecha_venta,
                        asunto: tarea.asunto,
                        propietario: tarea.propietario,
                        descripcion: tarea.descripcion
                    };
                    newArray.push(data);
                    return newArray
                });
                this.setState({ tareas, tabla: datos, columnData })
            });
    }

    addAction(action) {
        console.log('action:',action);
        this.setState({ editando: action })
    }

    itemSelected(value) {
        this.setState({ selected: value, editando: true })
    }

    render() {

        let { tareas, selected, tabla, columnData } = this.state;
        let tarea;
        if (!tareas) { return } else {
            tarea = tareas[selected];
        }
        return (
            <div>
                <Header title="Tareas"/>
                {
                    this.state.selected !== 'undefined' && tarea ? (
                        <ul>
                            <Button style={{float: 'right'}} raised color="accent" onClick={() => this.setState({ editando: false, selected: -1 })} >
                                <CloseIcon />
                            </Button>
                            {/*<Button style={{marginBottom: '1em'}} raised onClick={() => this.setState({ selected: -1 })}>Cerrar</Button>*/}
                            <li>{tarea.cliente} </li>
                            <li>{tarea.fecha_venta} </li>
                            <li>{tarea.asunto} </li>
                            <li>{tarea.propietario} </li>
                            <li>{tarea.cuenta} </li>
                            <li>{tarea.descripcion} </li>
                        </ul>
                    ) :
                        ''
                }

                {
                    this.state.tareas.length > 0 && columnData
                        ? <div style={{margin: 10}}>
                        <Table
                            data={tabla}
                            columnData={columnData}
                            title="Tareas"
                            itemSelected={this.itemSelected.bind(this)} // para poder elegir
                        />
                    </div>
                        : ''
                }
                {
                    !this.state.editando ? (
                        <Crear onclick={this.addAction.bind(this)} route="Tarea" />
                    ) : (
                        <Button style={{float: 'right'}} raised color="accent" onClick={this.addAction.bind(this, false)} >
                            <CloseIcon />
                        </Button>
                    )
                }

            </div>
        )
    }
}

export default Tareas;