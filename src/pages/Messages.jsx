import React, { useState, useEffect, useRef } from 'react';
import { useFirebaseContext } from '../contexts/FirebaseContext';
import { db } from '../firebase-config';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import styled from 'styled-components';

import Loader from '../components/Loader';

const Messages = () => {
    const { user } = useFirebaseContext();
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef(null);
    const messagesRef = collection(db, 'messages');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetch('https://jsonplaceholder.typicode.com/comments')
            .then((res) => res.json())
            .then((result) => {
                setIsLoading(false);
                setMessages(result);
                // scrollToBottom();
            });

        // const queryMessages = query(messagesRef, where("room", "==", room))
        // const queryMessages = query(messagesRef);
        // const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
        //     let messages = [];
        //     snapshot.forEach((doc) => {
        //         messages.push({ ...doc.data(), id: doc.id});
        //     });

        //     setMessages(messages);
        // });

        // return () => unsubscribe();
    }, []);

    useEffect(() => {
        messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }, [messages]);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            if (inputValue.length > 0) {
                handleSendClick();
            }
        }
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSendClick = () => {
        if (inputValue.length > 0) {
            setMessages((state) => [
                ...state,
                {
                    body: inputValue + user.email,
                    name: user.email,
                    sender: true,
                },
            ]);
            setInputValue('');
        }
    };

    return (
        <ChatContainer>
            {isLoading && <Loader />}
            <ChatHeader>
                <ChatTitle>Chat</ChatTitle>
            </ChatHeader>
            <ChatList ref={messagesEndRef}>
                {messages.map((message, index) => (
                    <ChatItem
                        key={index}
                        sender={message.sender}
                        // ref={messagesEndRef}
                    >
                        {message.sender ? (
                            <>
                                <ChatAvatar
                                    src="https://www.w3schools.com/w3images/avatar2.png"
                                    alt="User Avatar"
                                />
                                <ChatContent sender>{message.body}</ChatContent>
                            </>
                        ) : (
                            <>
                                <ChatAvatar
                                    src="https://www.w3schools.com/w3images/avatar2.png"
                                    alt="User Avatar"
                                />
                                <ChatContent>{message.body}</ChatContent>
                            </>
                        )}
                    </ChatItem>
                ))}
            </ChatList>
            <ChatInputContainer>
                <ChatInput
                    type="text"
                    placeholder="Type your message..."
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                />
                <ChatSendButton onClick={handleSendClick}>Send</ChatSendButton>
            </ChatInputContainer>
        </ChatContainer>
    );
};

export default Messages;

const ChatContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 90vh;
    background-color: #fafafa;
`;

const ChatHeader = styled.div`
    display: flex;
    align-items: center;
    height: 64px;
    background-color: #ffffff;
    padding: 0 24px;
    border-bottom: 1px solid #e0e0e0;
`;

const ChatTitle = styled.h3`
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    line-height: 24px;
`;

const ChatList = styled.div`
    flex: 1;
    overflow: scroll;
`;

const ChatItem = styled.div`
    display: flex;
    flex-direction: ${(props) => (props.sender ? 'row-reverse' : 'row')};
    align-items: flex-start;
    margin: 12px;
`;

const ChatAvatar = styled.img`
    width: 32px;
    height: 32px;
    border-radius: 50%;
`;

const ChatContent = styled.div`
    background-color: ${(props) => (props.sender ? '#0084FF' : '#FFFFFF')};
    color: ${(props) => (props.sender ? '#FFFFFF' : '#000000')};
    border-radius: 16px;
    padding: 12px;
    max-width: 60%;
`;

const ChatInputContainer = styled.div`
    display: flex;
    align-items: center;
    height: 64px;
    background-color: #ffffff;
    padding: 0 24px;
    border-top: 1px solid #e0e0e0;
`;

const ChatInput = styled.input`
    flex: 1;
    height: 32px;
    margin-right: 12px;
    border-radius: 16px;
    padding: 0 12px;
    border: none;
    outline: none;
`;

const ChatSendButton = styled.button`
    background-color: #0084ff;
    color: #ffffff;
    border-radius: 16px;
    padding: 8px 16px;
    border: none;
    cursor: pointer;
`;
