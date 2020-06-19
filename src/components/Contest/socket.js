import io from "socket.io-client";
import {SERVER_URL} from "../../utils/constants"

const socket = io.connect(SERVER_URL);

export default socket;
