import React, { Component } from 'react';
import Header from '../components/Header';
import Crear from '../components/Crear';
import Table from '../components/material/Table';
import Button from 'material-ui/Button';
import CloseIcon from 'material-ui-icons/Close';

class Pedidos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            negocios: [],
            editando: false,
            selected: ''
        }
    }

    componentWillMount() {
        let newArray= [], datos;
        let columnData = [
            { id: 'nombre', numeric: false, disablePadding: true, label: 'Nombre' },
            { id: 'tlf', numeric: false, disablePadding: false, label: 'Teléfono' },
            { id: 'web', numeric: false, disablePadding: false, label: 'Sitio Web' },
            { id: 'cliente', numeric: false, disablePadding: false, label: 'Código de Cliente' },
            { id: 'ciudad', numeric: false, disablePadding: false, label: 'Ciudad' },
        ];
        fetch('/negocios')
            .then(res => res.json())
            .then(negocios => {
                datos = negocios.map((negocio, index) => {
                    let data = {
                        id: index,
                        nombre: negocio.nombre,
                        telf: negocio.tlf,
                        activo: negocio.web,
                        negocios: negocio.cliente,
                        tareas: negocio.ciudad
                    };
                    newArray.push(data);
                    return newArray
                });
                this.setState({ negocios: datos, columnData })
            })

    }

    addAction(action) {
        console.log('action:',action);
        this.setState({ editando: action })
    }

    itemSelected(value) {
        this.setState({ selected: value, editando: true })
    }

    render() {

        let { negocios, selected, columnData } = this.state;
        let negocio;
        if (!negocios) { return } else {
            negocio = negocios[selected];
        }
        return (
            <div>
                <Header title="Negocios"/>
                {
                    this.state.selected !== 'undefined' && negocio ? (
                        <ul>
                            <Button style={{float: 'right'}} raised color="accent" onClick={() => this.setState({ editando: false, selected: -1 })} >
                                <CloseIcon />
                            </Button>
                            {/*<Button style={{marginBottom: '1em'}} raised onClick={() => this.setState({ selected: -1 })}>Cerrar</Button>*/}
                            <li>{negocio.alta} </li>
                            <li>{negocio.nombre} </li>
                            <li>{negocio.pais} </li>
                            <li>{negocio.ciudad} </li>
                            <li>{negocio.tlf} </li>
                            { negocio.categoria ? <li>{negocio.categoria} </li> : <li>No hay categoria</li> }
                            <li>{negocio.direccion} </li>
                            <li>{negocio.provincia} </li>
                            <li>{negocio.postal} </li>
                            <li>{negocio.web} </li>
                            <li>{negocio.horario} </li>
                        </ul>
                    ) :
                        ''
                }
                {
                    this.state.negocios.length > 0 && columnData
                    ? <div style={{margin: 10}} >
                        {
                            this.state.editando ?
                                <div></div>
                                :
                                <Table // no se por qué no funsiona el boton + en tareas
                                    datos={this.state.negocios}
                                    columnData={columnData}
                                    title="Negocios"
                                    itemSelected={this.itemSelected.bind(this)} // para recuperar el item seleccionado
                                />
                        }
                    </div>
                    : '' // sino una mierda
                }
                {
                    !this.state.editando ? (
                        <Crear onclick={this.addAction.bind(this)} route="Negocio" />
                    ) : ''
                }
            </div>
        )
    }
}

export default Pedidos;