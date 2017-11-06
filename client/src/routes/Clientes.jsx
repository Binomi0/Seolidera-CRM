// import { Redirect } from 'react-router-dom';
// import Header from '../components/Header';
// import Tareas from "./Tareas";
// import Typography from 'material-ui/Typography';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Table from '../components/material/Table';
import Button from 'material-ui/Button';
import CloseIcon from 'material-ui-icons/Close';
import Detalles from '../components/Detalles';
import Crear from '../components/Crear';
import FormClientes from "../components/forms/FormClientes";
import { LinearProgress } from 'material-ui/Progress';
import FormLlamadas from '../components/forms/FormLlamadas';
import FormNegocios from '../components/forms/FormNegocios';
import FormTareas from '../components/forms/FormTareas';
import FullScreenDialog from '../components/material/FullScreenDialog';


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
            viewClient: false,
            newClient: false,
            editClient: false,
            dialogOpen: false,
            newCall: false,
            editCall: false,
            nuevoNegocio: false,
            editarNegocio: false,
            nuevaTarea: false,
            editarTarea: false
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
                    return data
                });
                // console.log(datos);
                // console.log(newArray);
                this.setState({ usuarios, tabla: datos, columnData })
            });
    }

    itemSelected(client, action) {
        switch (action) {
            case 'ver':
                this.setState({ selected: client, viewClient: true, newClient: false, editClient: false, newCall: false, nuevoNegocio: false });
                break;
            case 'editar':
                this.setState({ selected: client, viewClient: false, newClient: false, editClient: true, newCall: false, nuevoNegocio: false })  ;
                break;
            default:
                break;
        }
    }

    changeText(text) {
        this.setState({ text })
    }

    nuevoCliente(usuario) {
        // console.log('RESPUESTA:', usuario);
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
        this.setState({ newCall: false, editClient: false, newClient: false, viewClient: false, tabla: newArray, nuevoNegocio: false });
        this.loadResources()
    }

    editarCliente(cliente) {
        let { tabla, usuarios, selected } = this.state;
        tabla[selected] = cliente.result;
        usuarios[selected] = cliente.result;
        this.setState({ newCall: false, editClient: false, newClient: false, viewClient: false, tabla, usuarios, nuevoNegocio: false });
        this.loadResources()
    }

    toggleLlamadas = () => this.setState({ newCall: !this.state.newCall });
    toggleNegocios = () => this.setState({ nuevoNegocio: !this.state.nuevoNegocio });
    toggleTareas = () => this.setState({ nuevaTarea: !this.state.nuevaTarea });
    toggleClientes = () => this.setState({ newClient: !this.state.newClient });

    nuevaLlamada = llamada => {
        this.setState({ newCall: false, });
        this.loadResources()
    };


    editarLlamada(cliente) {

    }

    nuevoNegocio = negocio => {
        this.setState({ nuevoNegocio: false, });
        this.loadResources()
    };

    editarNegocio = negocio => {

    };

    nuevaTarea = tarea => {
        this.setState({ nuevaTarea: false, });
        this.loadResources()
    };

    editarTarea = tarea => {

    };

    render() {
        let { usuarios, selected, tabla } = this.state;
        let { user } = this.props;
        let cliente = usuarios[selected] || null;

        return (
            <div>
                {
                    this.state.editClient || this.state.viewClient || this.state.newCall || this.state.nuevoNegocio
                        ? <Button style={{float: 'right'}} raised color="accent" onClick={() => this.setState({ newClient: false, viewClient: false, editClient: false, newCall: false, nuevoNegocio: false })} >
                        <CloseIcon />
                    </Button>
                        :  ''
                }

                {
                    this.state.selected !== 'undefined' && cliente && this.state.viewClient
                        ?  <Detalles
                            cliente={cliente}
                            toggleLlamadas={this.toggleLlamadas.bind(this)}
                            toggleNegocios={this.toggleNegocios.bind(this)}
                            toggleTareas={this.toggleTareas.bind(this)}
                            // editarLlamada={this.editarLlamada.bind(this)}
                        />
                        :  ''
                }

                {
                    this.state.tabla.length > 0 && columnData
                        ? <div style={{margin: 10}}>
                            {
                                this.state.editClient || this.state.viewClient
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
                    :   <FullScreenDialog
                            nuevoCliente={this.nuevoCliente.bind(this)}
                            type="Cliente"
                            cliente={cliente || {} }
                            user={user}
                            action='nuevo'
                            closed={this.toggleClientes.bind(this)}
                        />
                }

                {
                    this.state.editClient
                    ?   <FormClientes
                            editarCliente={this.editarCliente.bind(this)}
                            cliente={cliente}
                            action='editar'
                            closed={this.toggleClientes.bind(this)}

                    />
                    : ''
                }

                {
                    this.state.newCall
                    ? <FullScreenDialog
                        nuevaLlamada={this.nuevaLlamada.bind(this)}
                        type="Llamada"
                        cliente={cliente}
                        user={user}
                        action='nuevo'
                        closed={this.toggleLlamadas.bind(this)}
                    />
                    : ''
                }

                {
                    this.state.editCall
                    ? <FormLlamadas
                        editarLlamada={this.editarLlamada.bind(this)}
                        cliente={cliente}
                        action="editar"
                        closed={this.toggleLlamadas.bind(this)}

                    />
                    : ''
                }

                {
                    this.state.nuevoNegocio
                    ? <FullScreenDialog
                        nuevoNegocio={this.nuevoNegocio.bind(this)}
                        type="Negocio"
                        cliente={cliente}
                        user={user}
                        action='nuevo'
                        closed={this.toggleNegocios.bind(this)}
                    />
                    :''
                }

                {
                    this.state.editarNegocio
                    ?
                        <FormNegocios
                            editarNegocio={this.editarNegocio.bind(this)}
                            type="Negocio"
                            user={user}
                            action="editar"
                            cliente={cliente}
                            closed={this.toggleNegocios.bind(this)}
                        />
                        : ''
                }

                {
                    this.state.nuevaTarea
                        ? <FullScreenDialog
                            nuevaTarea={this.nuevaTarea.bind(this)}
                            type="Tarea"
                            cliente={cliente}
                            user={user}
                            action="nuevo"
                            closed={this.toggleTareas.bind(this)}
                    />
                        :''
                }

                {
                    this.state.editarTarea
                        ?
                        <FormTareas
                            editarNegocio={this.editarTarea.bind(this)}
                            action="editar"
                            type="Tarea"
                            cliente={cliente}
                            user={user}
                            closed={this.toggleTareas.bind(this)}

                        />
                        : ''
                }
                 <Crear
                    addClient={() => this.setState({ newClient: true })}
                    route="Cliente"
                />
            </div>
        )
    }
}

Clientes.PropTypes = {
    user: PropTypes.string.isRequired
};

export default Clientes;