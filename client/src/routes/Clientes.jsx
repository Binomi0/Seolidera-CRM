import React, { Component } from 'react';
import Header from '../components/Header';
import Table from '../components/material/Table';
import Button from 'material-ui/Button';
import CloseIcon from 'material-ui-icons/Close';
import Detalles from '../components/Detalles';
// import Tareas from "./Tareas";
import Crear from '../components/Crear';
// import { Redirect } from 'react-router-dom';

class Clientes extends Component {
    constructor() {
        super();
        this.state = {
            usuarios: [],
            tabla: [],
            editando: false,
            selected: '',
            text: ''
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
                this.setState({ usuarios, tabla: datos, columnData })
            });
    }

    // addAction(action) {
    //     console.log('action:',action);
    //     this.setState({ editando: action })
    // }

    itemSelected(client) {
        this.setState({ selected: client, editando: true })
    }

    changeText(text) {
        console.log('TEXT:',text);
        this.setState({ text })
    }

    render() {

        // console.log(this.props);
        let { usuarios, selected, columnData, tabla } = this.state;
        let cliente;
        if (!usuarios) { return } else {
            cliente = usuarios[selected];
        }
        return (
            <div>
                {
                    this.state.selected !== 'undefined' && cliente ? (
                        <div>
                            <ul>
                                <Button style={{float: 'right'}} raised color="accent" onClick={() => this.setState({ editando: false, selected: -1 })} >
                                    <CloseIcon />
                                </Button>
                                <Detalles cliente={cliente} />
                                {/*<Button style={{marginBottom: '1em'}} raised onClick={() => this.setState({ selected: -1 })}>Cerrar</Button>*/}

                            </ul>
                            <div>

                            </div>
                            <div>

                            </div>
                            <div>

                            </div>
                        </div>
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
                                        data={tabla}
                                        columnData={columnData}
                                        title="Cliente"
                                        itemSelected={this.itemSelected.bind(this)}
                                        changeText={this.changeText.bind(this)}
                                    />
                                )
                            }
                            {
                                !this.state.editando ? (
                                    <Crear
                                        // onclick={this.addAction.bind(this)}
                                        route="Cliente"
                                    />
                                ) : ''
                            }
                        </div>
                    : 'Cargando...'
                }

            </div>
        )
    }
}

export default Clientes;