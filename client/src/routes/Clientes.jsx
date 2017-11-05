import React, { Component } from 'react';
import Header from '../components/Header';
import Table from '../components/material/Table';
import Button from 'material-ui/Button';
import CloseIcon from 'material-ui-icons/Close';
import Detalles from '../components/Detalles';
// import Tareas from "./Tareas";
import Crear from '../components/Crear';
import Formulario from "../components/Formulario";
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
            viewDetails: false,
            selected: '',
            text: '',
            newClient: false
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
                this.setState({ usuarios, tabla: newArray, columnData })
            });
    }

    itemSelected(client) {
        console.log('cliente seleccionado', client);
        this.setState({ selected: client, viewDetails: true, newClient: false })
    }

    changeText(text) {
        this.setState({ text })
    }

    formularioEnviado(usuario) {
        let data = {
            id: usuario.result._id,
            nombre: usuario.result.nombre,
            telf: usuario.result.telf,
            activo: usuario.result.activo,
            negocios: usuario.result.negocios,
            tareas: usuario.result.tareas
        };
        let newArray = this.state.tabla;
        newArray.push(data);
        this.setState({ newClient: false, viewDetails: false, tabla: newArray });
    }

    mostrarDetalles = cliente =>
        <div>
            <ul>
                <Button style={{float: 'right'}} raised color="accent" onClick={() => this.setState({ viewDetails: false, newClient: false, selected: -1 })} >
                    <CloseIcon />
                </Button>
                <Detalles cliente={cliente} />
                {/*<Button style={{marginBottom: '1em'}} raised onClick={() => this.setState({ selected: -1 })}>Cerrar</Button>*/}
            </ul>
        </div>;


    render() {
        let { usuarios, selected, tabla } = this.state;
        let cliente = usuarios[selected] || null;
        // if (!usuarios) { return } else {
        //     cliente = usuarios[selected];
        // }
        return (
            <div>
                {
                    this.state.selected !== 'undefined' && cliente && !this.state.newClient && this.state.viewDetails ? (
                        this.mostrarDetalles(cliente)
                    ) :
                        ''
                }
                {
                    this.state.tabla.length > 0 && columnData
                    ? <div style={{margin: 10}}>
                            {
                                !this.state.newClient && !this.state.viewDetails ?
                                    (
                                        <Table
                                            data={tabla}
                                            columnData={columnData}
                                            title="Cliente"
                                            itemSelected={this.itemSelected.bind(this)}
                                            changeText={this.changeText.bind(this)}
                                        />
                                    )
                                    : <div> </div>
                            }
                            {
                                !this.state.newClient ? (
                                    <Crear
                                        addClient={() => this.setState({ newClient: true, viewDetails: false })}
                                        route="Cliente"
                                    />
                                ) : <div>
                                        <Button style={{float: 'right'}} raised color="accent" onClick={() => this.setState({ newClient: false, viewDetails: false })} >
                                            <CloseIcon />
                                        </Button>
                                        <Formulario formularioEnviado={this.formularioEnviado.bind(this)} />
                                    </div>
                            }
                        </div>
                    : 'Cargando...'
                }

            </div>
        )
    }
}

export default Clientes;