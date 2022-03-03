import React, { useEffect, useRef, useState } from "react";
import Topbar from "../../components/Topbar/Topbar";
import Conversation from "../../components/conversation/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import "./messenger.css";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import Socket from "../../components/shared/socket";
import axios from "axios";

const Messenger = (props) => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const { friends } = useSelector((state) => state.online);
  const [conversation, setConversation] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chatMessage, setChatMesasge] = useState("");
  const [arrivalMessage, setArrivalMressage] = useState([]);
  const [senderProfilepic, setSenderProfilepic] = useState("");
  const [receiverProfilepic, setReceiverProfilepic] = useState("");
  const socket = useRef();

  useEffect(() => {
    socket.current = Socket;
    socket.current.on("getmessages", (data) => {
      console.log(data);
      setArrivalMressage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  const getUserConversations = async (users) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/v1/getConversation/${userInfo._id}`
      );
      console.log(data);
      setConversation(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserConversations();
  }, []);

  const getMessages = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/v1/getMessagesByConversation/${currentChat._id}`
      );
      console.log(data);
      setMessages(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (currentChat?._id) {
      getMessages();
    }
  }, [currentChat?._id]);

  const sendMessage = async (e) => {
    e.preventDefault();
    console.log(currentChat);
    const receiverId = currentChat.members.find(
      (member) => member !== userInfo._id
    );
    socket.current.emit("sendmessage", {
      senderId: userInfo._id,
      receiverId,
      text: chatMessage,
    });
    try {
      const body = {
        conversationId: currentChat._id,
        sender: userInfo._id,
        text: chatMessage,
      };
      console.log(body);
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/createMessage",
        body
      );
      console.log(data);
      setMessages((prev) => [...prev, data]);
      setChatMesasge("");
    } catch (err) {
      console.log(err);
    }
  };

  const sendLocation = async (e) => {
    e.preventDefault();

    const location = navigator.geolocation.getCurrentPosition(
      async (position) => {
        console.log(position);
        const receiverId = currentChat.members.find(
          (member) => member !== userInfo._id
        );
        try {
          const body = {
            conversationId: currentChat._id,
            sender: userInfo._id,
            text: `https://google.com/maps?q=${position.coords.latitude},${position.coords.longitude}`,
          };
          console.log(body);
          const { data } = await axios.post(
            "http://localhost:8000/api/v1/createMessage",
            body
          );
          console.log(data);
          setMessages((prev) => [...prev, data]);
          setChatMesasge("");
          socket.current.emit("sendmessage", {
            senderId: userInfo._id,
            receiverId,
            text: `https://google.com/maps?q=${position.coords.latitude},${position.coords.longitude}`,
          });
        } catch (err) {
          console.log(err);
        }
      }
    );
  };

  const profilePicture = async (e) => {
    setCurrentChat(e);
    console.log(e);
    try {
      e.members.map(async (ele) => {
        const { data } = await axios.get(
          `http://localhost:8000/api/v1/getUser/${ele}`
        );
        if (ele !== userInfo._id) {
          setReceiverProfilepic(data.profilePicture);
        } else {
          setSenderProfilepic(data.profilePicture);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Topbar onlineUsers={friends} />
      <div className="message">
        <div className="chatMenu">
          <div className="chatMenu_wrapper">
            <input
              type="text"
              placeholder="Search Friends..."
              className="search_input"
            />
            {conversation.map((e) => (
              <div key={e._id} onClick={() => profilePicture(e)}>
                <Conversation conversation={e} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBox_wrapper">
            {currentChat ? (
              <>
                <div className="chatBox_wrapper_top">
                  {messages.map((ele) => (
                    <Message
                      key={ele._id}
                      senderProfilepic={senderProfilepic}
                      receiverProfilepic={receiverProfilepic}
                      own={ele.sender != userInfo._id}
                      Chat={ele}
                    />
                  ))}
                </div>
                <div className="chatBox_wrapper_bottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    value={chatMessage}
                    onChange={(e) => setChatMesasge(e.target.value)}
                  />
                  <button
                    type="submit"
                    onClick={(e) => sendMessage(e)}
                    className="submitChat"
                  >
                    Send
                  </button>
                  <button
                    type="submit"
                    onClick={(e) => sendLocation(e)}
                    className="submitlocation"
                  >
                    Send Location
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="chat_start">Stat a New Conversation...</div>
              </>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnline_wrapper">
            {friends.map((ele) => (
              <>
                {ele._id !== userInfo._id && (
                  <ChatOnline key={ele._id} Online={ele} />
                )}
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Messenger;
