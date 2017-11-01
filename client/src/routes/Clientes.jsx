import React, { Component } from 'react';
import Header from '../components/Header';
import Table from '../components/material/Table';
import Button from 'material-ui/Button';
import CloseIcon from 'material-ui-icons/Close';
// import Tareas from "./Tareas";
import Crear from '../components/Crear';
// import { Redirect } from 'react-router-dom';

class Usuarios extends Component {
    constructor() {
        super();
        this.state = {
            usuarios: [],
            editando: false,
            selected: '',
        };
        // this.obtenerDatos = this.obtenerDatos.bind(this);
    }

    componentWillMount() {
        let newArray = [], datos;
        let columnData = [
            { id: 'nombre', numeric: false, disablePadding: true, label: 'Nombre ' },
            { id: 'telf', numeric: true, disablePadding: false, label: 'Teléfono' },
            { id: 'activo', numeric: false, disablePadding: false, label: 'Activo' },
            { id: 'negocios', numeric: false, disablePadding: false, label: 'Negocios' },
            { id: 'tareas', numeric: false, disablePadding: false, label: 'Tareas' }
        ];
        fetch('/clientes')
            .then(res => res.json())
            .then(usuarios => {
                datos = usuarios.map((usuario, index) => {
                    let data = {
                        id: index,
                        nombre: usuario.nombre,
                        telf: usuario.telf,
                        activo: usuario.activo,
                        negocios: usuario.negocios,
                        tareas: usuario.tareas
                    };
                    newArray.push(data);
                    return newArray
                });
                this.setState({ usuarios: datos, columnData })
            });
    }


    addAction(action) {
        console.log('action:',action);
        this.setState({ editando: action })
    }

    clientSelected(client) {
        this.setState({ selected: client, editando: true })
    }

    render() {
        // console.log(this.props);
        let { usuarios, selected, columnData } = this.state;
        let cliente;

        if (!usuarios) { return } else {
            cliente = usuarios[selected];
        }

        return (
            <div>
                <Header title="Clientes" />
                {
                    !this.props.route
                        ? ''
                        : console.log(this.props.route)//<Redirect to="/login" />
                }
                {
                    this.state.selected !== 'undefined' && cliente ? (
                        <ul>
                            <Button style={{float: 'right'}} raised color="accent" onClick={() => this.setState({ editando: false, selected: -1 })} >
                                <CloseIcon />
                            </Button>
                            {/*<Button style={{marginBottom: '1em'}} raised onClick={() => this.setState({ selected: -1 })}>Cerrar</Button>*/}
                            <li>{cliente.alta} </li>
                            <li>{cliente.nombre} </li>
                            <li>{cliente.apellidos} </li>
                            <li>{cliente.fiscal} </li>
                            <li>{cliente.telf} </li>
                            <li>{cliente.email} </li>
                            <li>{cliente.direccion} </li>
                            <li>{cliente.provincia} </li>
                            <li>{cliente.postal} </li>
                            <li>{cliente.alta} </li>
                            <li>{cliente.dni} </li>
                            <li>{cliente.observaciones} </li>
                            <li>{cliente.buser} </li>
                            <li>{cliente.bpasw} </li>
                        </ul>
                    ) :
                        ''
                }
                {
                    this.state.usuarios.length > 0 && columnData
                    ? <div style={{margin: 10}}>
                            {
                                this.state.editando ?
                                    <div> </div>
                                    : (
                                    <Table
                                        data={this.state.usuarios}
                                        columnData={columnData}
                                        title="Cliente"
                                        itemSelected={this.clientSelected.bind(this)}
                                    />
                                )
                            }
                            {
                                !this.state.editando ? (
                                    <Crear onclick={this.addAction.bind(this)} route="Cliente" />
                                ) : ''
                            }
                        </div>
                    : 'Cargando...'
                }

            </div>
        )
    }
}

export default Usuarios;