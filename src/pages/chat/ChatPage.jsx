import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import axios from '../../axios';
import '../../assets/css/chat.css';

import io from "socket.io-client";
import Echo from 'laravel-echo';

const ChatPage = () => {
	const navigate = useNavigate();
	const { user } = useAuth();
	const [messages, setMessages] = useState([]);
	const [message, setMessage] = useState([]);

	useEffect(() => {
		const echo = new Echo({
			broadcaster: 'socket.io',
			client: io,
			host: 'http://localhost:6001'
		});

		echo.join('chatroom')
			.here((users) => {
				console.log(users);
			})
			.listen('message', (event) => {
				console.log(event);
			});
	}, []);

	const sendMessage = async e => {
		e.preventDefault();
		setMessage('');
		try {
			const resp = await axios.post('/messages', {
				user_id: user.id,
				message: message
			});
			if (resp.status === 200) {
				navigate('/chat');
			}
		} catch (error) {
			if (error.response.status === 401) {
				console.log("error");
			}
		}
	}

	return (
		<>
			<div className="chat">
				{messages?.map(message => {
					return (
						<p key={message.id}>{message?.user?.name} : {message.message} </p>
					)
				})}
			</div>
			<form onSubmit={e => sendMessage(e)}>
				<input type="text" value={message} onChange={e => setMessage(e.target.value)} />
			</form>
		</>
	);
};

export default ChatPage;
