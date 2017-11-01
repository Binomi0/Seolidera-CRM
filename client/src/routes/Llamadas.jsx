import React, { Component } from 'react';
import Header from '../components/Header';
import Crear from '../components/Crear';
import Table from '../components/material/Table';
import Button from 'material-ui/Button';
import CloseIcon from 'material-ui-icons/Close';

class Llamadas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            llamadas: [],
            editando: false
        }
    }

    componentWillMount() {
        fetch('/llamadas')
            .then(res => res.json())
            .then(llamadas => this.setState({ llamadas }))
    }


    addAction(action) {
        console.log('action:',action);
        this.setState({ editando: action })
    }

    render() {
        let columnData = [
            { id: 'agente', numeric: false, disablePadding: true, label: 'Agente' },
            { id: 'tlf', numeric: false, disablePadding: false, label: 'Teléfono' },
            { id: 'objetivo', numeric: false, disablePadding: false, label: 'Objetivo' },
            { id: 'estado', numeric: false, disablePadding: false, label: 'Estado de Llamada' },
            { id: 'descripcion', numeric: false, disablePadding: false, label: 'Descripción' },
        ];
        return (
            <div>
                <Header title="Llamadas"/>
                {
                    this.state.llamadas.length > 0 && columnData
                        ? <div style={{margin: 10}} >
                            <Table
                                datos={this.state.llamadas}
                                columnData={columnData}
                                title="Llamadas"
                            />
                        </div>
                        : ''
                }
                {
                    !this.state.editando ? (
                        <Crear onclick={this.addAction.bind(this)} route="Llamada" />
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

export default Llamadas;