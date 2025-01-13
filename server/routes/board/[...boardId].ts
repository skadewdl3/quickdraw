export default defineWebSocketHandler({
  open(peer) {
    if (!peer.request) {
      peer.close();
      return;
    }
    const url = new URL(peer.request.url as string);
    const boardId = url.pathname.split("/").pop();
    console.log("BoardId is: ", boardId);
    // peer.send({ user: "server", message: `Welcome ${peer}!` });
    // peer.publish("chat", { user: "server", message: `${peer} joined!` });
    // peer.subscribe("chat");
  },
  message(peer, message) {
    const msg = {
      user: peer.toString(),
      message: message.toString(),
    };
    peer.send(JSON.stringify({ type: "Bruh", message: "Bruh" }));
    // peer.publish("chat", msg);
  },
  close(peer) {
    // peer.publish("chat", { user: "server", message: `${peer} left!` });
  },
});
