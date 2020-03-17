const server = require('./config/server.js');
require('./endpoints/estudiantes')(server);
server.listen(
    server.get('port'),
    () => console.log(`se ha iniciado correctamente el servicio en el puerto ${server.get('port')}`)
);