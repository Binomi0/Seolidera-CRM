const PedidosController = require('./PedidosController');
const UsuariosController = require('./UsuariosController');
const TareasController = require('./TareasController');
const LlamadasSchema = require('./LlamadasController');
const AgentesController = require('./AgentesController');
const NegociosController = require('./NegociosController');
const ClientesController = require('./ClientesController');
const ProspectosController = require('./ProspectosController');

module.exports = {
    pedidos: PedidosController,
    usuarios: UsuariosController,
    llamadas: LlamadasSchema,
    agentes: AgentesController,
    negocios: NegociosController,
    tareas: TareasController,
    clientes: ClientesController,
    prospectos: ProspectosController
};