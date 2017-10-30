const PedidosSchema = require('./PedidosController');
const UsuariosSchema = require('./UsuariosController');
const TareasSchema = require('./TareasController');
const LlamadasSchema = require('./LlamadasController');
const AgentesSchema = require('./AgentesController');
const NegociosSchema = require('./NegociosController');
const ClientesController = require('./ClientesController');

module.exports = {
    pedidos: PedidosSchema,
    usuarios: UsuariosSchema,
    llamadas: LlamadasSchema,
    agentes: AgentesSchema,
    negocios: NegociosSchema,
    tareas: TareasSchema,
    clientes: ClientesController,
};