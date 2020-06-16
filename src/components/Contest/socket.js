import io from "socket.io-client";

const socket = io.connect("https://pc-daiict.herokuapp.com");

export default socket;
