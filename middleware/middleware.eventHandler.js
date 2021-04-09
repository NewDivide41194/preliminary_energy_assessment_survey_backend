let clients = [];
let facts = [];

function eventsHandler(request, response, next) {
  const headers = {
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache'
  };
  response.writeHead(200, headers);

  const data = `data: ${JSON.stringify(facts)}\n\n`;

  response.write(data);

  const clientId = Date.now();

  const newClient = {
    id: clientId,
    response
  };

  clients.push(newClient);

  request.on('close', () => {
    console.log("connection closed");
    clients = clients.filter(client => client.id !== clientId);
  });
}

function sendEventsToAll(newData) {
  clients.forEach(client => client.response.write(`data: ${JSON.stringify(newData)}\n\n`))
  console.log(newData);
}

module.exports = { sendEventsToAll, eventsHandler }