import { useState, useEffect } from "react";
import FriendsMessenger from "./FriendsMessenger";
// import { io } from "socket.io-client";
import { socket } from "../socket";
// import io from "socket.io-client";
// const socket = io.connect("http://localhost:3003");

const MessengerPage = ({ currentUser }) => {
    const [message, setMessage] = useState([]);
    const [messagesReceived, setMessagesReceived] = useState([]);

    const [recipient, setRecipient] = useState([]);
    const [room, setRoom] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim() !== "") {
            // setMessages([...messages, inputValue]);
            socket.emit("send", message, room);
            setMessage("");
        }
    };

    function generateRoomName(id1, id2) {
        let room;
        const result = id1.localeCompare(id2);

        if (result < 0) {
            room = `${id1}_${id2}`;
        } else if (result > 0) {
            room = `${id2}_${id1}`;
        } else {
            room = `${id1}_${id2}`;
        }
        return room;
    }

    useEffect(() => {
        socket.on("pm", (msg) => {
            setMessagesReceived((prevMessages) => [...prevMessages, msg]);
        });
        // // Your Socket.io logic goes here
        // socket.on("pm", (msg) => {
        //     alert("io received");
        //     // setMessages((prevMessages) => [...prevMessages, msg]);

        //     // const item = document.createElement("li");
        //     // item.textContent = msg;
        //     // messages.appendChild(item);
        //     // window.scrollTo(0, document.body.scrollHeight);
        // });

        // return () => {
        //     socket.off("connect", onConnect);
        //     socket.off("disconnect", onDisconnect);
        //     socket.off("foo", onFooEvent);
        // };
    }, [socket]);

    useEffect(() => {
        const generatedRoomName = generateRoomName(currentUser.firstName, recipient.firstName);
        console.log(generatedRoomName);
        socket.emit("join", generatedRoomName);
        setRoom(generatedRoomName);
    }, [recipient]);

    return (
        <div className="flex">
            <FriendsMessenger currentUser={currentUser} setRecipient={setRecipient} />
            <div>
                <span>Chatting with:</span>
                <img className="w-10 h-10 object-cover rounded-full" src={recipient.profilePhoto} alt="" />
                <span className="truncate">{recipient.displayName || recipient.firstName}</span>
            </div>
            <div className="flex flex-col justify-between dark:bg-dark-b w-full p-3">
                <ul className="list-none m-0 p-0">
                    {messagesReceived.map((msg, index) => (
                        <li key={index} className="even:bg-light-c even:dark:bg-dark-a">
                            {msg}
                        </li>
                    ))}
                    {/* <li>{messagesReceived}</li> */}
                </ul>
                <form className="bg-opacity-15 flex gap-2 h-12 box-border backdrop-filter backdrop-blur-md bg-transparent" onSubmit={handleSubmit}>
                    <input id="input" type="text" value={message} onChange={(event) => setMessage(event.target.value)} autoComplete="off" spellCheck="false" className="dark:bg-dark-a border-none px-4 py-1 flex-grow rounded-full focus:outline-none" />
                    <button type="submit" className="dark:bg-dark-a border-none p-2 m-0.25 rounded-md outline-none">
                        Send
                    </button>
                </form>
            </div>
        </div>
        // <>
        //     <input
        //         type="text"
        //         placeholder="Message..."
        //         value={message}
        //         onChange={(event) => {
        //             setMessage(event.target.value);
        //         }}
        //     />
        //     <button onClick={sendMessage}>Send Message</button>
        //     <h1>Message</h1>
        //     {messageReceived}
        // </>
    );
};

export default MessengerPage;