const PedidosSchema = require('./PedidosSchema');
const UsuariosSchema = require('./UsuariosSchema');
const TareasSchema = require('./TareasSchema');
const LlamadasSchema = require('./LlamadasSchema');
const AgentesSchema = require('./AgentesSchema');
const NegociosSchema = require('./NegociosSchema');
const ClientesSchema = require('./ClientesSchema');

module.exports = {
    pedidos: PedidosSchema,
    usuarios: UsuariosSchema,
    llamadas: LlamadasSchema,
    agentes: AgentesSchema,
    negocios: NegociosSchema,
    tareas: TareasSchema,
    clientes: ClientesSchema,
};