import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';

import { RoomCode } from '../components/RoomCode';

import { useParams } from 'react-router-dom';

import '../styles/room.scss';

import { useState, FormEvent, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';

import { database } from '../services/firebase';

type FirebaseQuestions = Record<string , {
  author: {
    name: string,
    avatar: string
  },
  content: string,
  isAnswered: boolean,
  isHighlighted: boolean
}>

type RoomParams = {
  id: string;
}

type Question = {
  id: string;
  author: {
    name: string,
    avatar: string
  },
  content: string,
  isAnswered: boolean,
  isHighlighted: boolean
}

export function Room() {
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const [newQuestion, setNewQuestion] = useState('');
  const { user } = useAuth();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    // escuta apenas uma vez o evento 'value' e então executa a função
    roomRef.on('value', room => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

      const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighlighted: value.isHighlighted,
          isAnswered: value.isAnswered,
        }
      });

      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);
    })
  }, [roomId]);

  async function handelSendQuestion(event: FormEvent) {
    event.preventDefault();

    // verifica se há algo escrito dentro do newQuestion
    if (newQuestion.trim() === '') 
      return ;

    // verifica se o usuário está logado
    if (!user)
      throw new Error('You must be logged in to create an question');

    // criando o objeto questão
    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnwered: false,
    }

    // salva a informação dentro do banco de dados da aplicação
    await database.ref(`rooms/${roomId}/questions/`).push(question);

    // limpa o textarea do formulário
    setNewQuestion('');
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <RoomCode code={roomId} />
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>{title}</h1>
          { questions.length > 0 && (
            <span>{questions.length} pergunta{questions.length > 1 ? 's' : ''}</span>
          )}
        </div>

        <form onSubmit={handelSendQuestion}>
          <textarea 
            placeholder="O que você quer perguntar?"
            value={newQuestion}
            onChange={event => setNewQuestion(event.target.value)}
          ></textarea>

          <div className="form-footer">
            {user ? (
              <div className="user-info">
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>Para enviar uma pergunta, <button>faça seu login</button></span>
            )}
            <Button type="submit" disabled={Boolean(!user)}>Enviar pergunta</Button>
          </div>
        </form>
      </main>
    </div>
  )
}