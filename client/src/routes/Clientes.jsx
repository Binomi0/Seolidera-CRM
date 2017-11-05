import React, { Component } from 'react';
// import Header from '../components/Header';
import Table from '../components/material/Table';
import Button from 'material-ui/Button';
import CloseIcon from 'material-ui-icons/Close';
import Detalles from '../components/Detalles';
// import Tareas from "./Tareas";
import Crear from '../components/Crear';
import Formulario from "../components/Formulario";
import { LinearProgress } from 'material-ui/Progress';
// import Typography from 'material-ui/Typography';

// import { Redirect } from 'react-router-dom';


const columnData = [
    { id: 'nombre', numeric: false, disablePadding: true, label: 'Nombre ' },
    { id: 'telf', numeric: true, disablePadding: false, label: 'Teléfono' },
    { id: 'activo', numeric: false, disablePadding: false, label: 'Activo' },
    { id: 'negocios', numeric: false, disablePadding: false, label: 'Negocios' },
    { id: 'tareas', numeric: false, disablePadding: false, label: 'Tareas' }
];

class Clientes extends Component {
    constructor() {
        super();
        this.state = {
            usuarios: [],
            tabla: [],
            selected: '',
            text: '',
            viewDetails: false,
            newClient: false,
            editClient: false
        };
        this.loadResources = this.loadResources.bind(this);
    }

    componentWillMount() {
        console.log('Montando clientes, tabla: ', this.state.tabla);
        if (!this.state.tabla.length > 0) {
            this.loadResources()
        }
    }

    loadResources() {
        let newArray = [], datos;
        fetch('/api/clientes'
            // { origin: 'http://crm.seolidera.com', 'Access-Control-Allow-Origin': '*' }
        )
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
                console.log(datos);
                this.setState({ usuarios, tabla: newArray, columnData })
            });
    }

    itemSelected(client, action) {
        switch (action) {
            case 'ver':
                this.setState({ selected: client, viewDetails: true, newClient: false, editClient: false });
                break;
            case 'editar':
                this.setState({ selected: client, viewDetails: false, newClient: false, editClient: true })  ;
                break;
            default:
                break;
        }
    }

    changeText(text) {
        this.setState({ text })
    }

    nuevoCliente(usuario) {
        console.log('RESPUESTA:', usuario);
        let data = {
            id: this.state.tabla.length,
            nombre: usuario.result.nombre,
            telf: usuario.result.telf,
            activo: usuario.result.activo,
            negocios: usuario.result.negocios,
            tareas: usuario.result.tareas
        };
        let newArray = this.state.tabla;
        newArray.push(data);
        this.setState({ editClient: false, newClient: false, viewDetails: false, tabla: newArray });
    }

    editarCliente(cliente) {
        let { tabla, usuarios, selected } = this.state;
        tabla[selected] = cliente.result;
        usuarios[selected] = cliente.result;
        this.setState({ editClient: false, newClient: false, viewDetails: false, tabla, usuarios });

    }

    mostrarDetalles = cliente =>  <Detalles cliente={cliente} />;

    render() {
        let { usuarios, selected, tabla } = this.state;
        let cliente = usuarios[selected] || null;

        return (
            <div>
                {
                    this.state.newClient || this.state.editClient || this.state.viewDetails
                        ? <Button style={{float: 'right'}} raised color="accent" onClick={() => this.setState({ newClient: false, viewDetails: false, editClient: false })} >
                        <CloseIcon />
                    </Button>
                        :  ''
                }
                {
                    this.state.selected !== 'undefined' && cliente && this.state.viewDetails
                        ?  this.mostrarDetalles(cliente)
                        :  ''
                }
                {
                    this.state.tabla.length > 0 && columnData
                        ? <div style={{margin: 10}}>
                            {
                                this.state.editClient || this.state.viewDetails || this.state.newClient
                                    ? ''
                                    : <Table
                                        data={tabla}
                                        columnData={columnData}
                                        title="Cliente"
                                        itemSelected={this.itemSelected.bind(this)}
                                        changeText={this.changeText.bind(this)}
                                />
                            }
                    </div>
                    : <LinearProgress />
                }

                {
                    !this.state.newClient
                    ?   ''
                    :   <Formulario
                            nuevoCliente={this.nuevoCliente.bind(this)}
                            // cliente={cliente}
                            action={'ver'}
                        />
                }

                {
                    this.state.editClient
                    ?   <Formulario
                            editarCliente={this.editarCliente.bind(this)}
                            cliente={cliente}
                            action={'editar'}
                        />
                    : ''
                }
                {
                    this.state.newClient || this.state.editClient || this.state.viewDetails
                        ? ''
                        :  <Crear
                        addClient={() => this.setState({ newClient: true, viewDetails: false, editClient: false })}
                        route="Cliente"
                    />
                }
            </div>
        )
    }
}

export default Clientes;