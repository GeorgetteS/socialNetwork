CREATE TABLE users 
	(
	id SERIAL PRIMARY KEY,
	name VARCHAR(30) NOT NULL,
	surname VARCHAR(30) NOT NULL,
	img VARCHAR(60),
	about VARCHAR,
	email VARCHAR(30) NOT NULL UNIQUE,
	password VARCHAR(30) NOT NULL
	);


CREATE TABLE chats
(
	id SERIAL PRIMARY KEY,
	name VARCHAR(30),
	isPrivate BOOLEAN NOT NULL
);

CREATE TABLE users_chats
(
	chat_id int REFERENCES chats(id),
	user_id int REFERENCES users(id),

	role VARCHAR(30) DEFAULT 'participant' NOT NULL,

	CONSTRAINT users_chats_pk PRIMARY KEY (chat_id, user_id)

);


CREATE TABLE messages 
(

	id SERIAL PRIMARY KEY,

	user_id INT NOT NULL,
	chat_id INT NOT NULL,

	content TEXT NOT NULL,

	timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 FOREIGN KEY (chat_id) REFERENCES Chats(id),
 FOREIGN KEY (user_id) REFERENCES Users(id)
);