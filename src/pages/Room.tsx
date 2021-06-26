import logoImg from '../assets/images/logo.svg';

import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { QuestionBox } from '../components/QuestionBox';

import { useParams } from 'react-router-dom';

import '../styles/room.scss';

import { useState, FormEvent } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';

import { database } from '../services/firebase';

type RoomParams = {
  id: string;
}

export function Room() {
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const [newQuestion, setNewQuestion] = useState('');
  const { user } = useAuth();
  const { questions, title } = useRoom(roomId);
  
  async function handleSendQuestion(event: FormEvent) {
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

        <form onSubmit={handleSendQuestion}>
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

        <div className="question-list">
          { questions.map(question => {
            return <QuestionBox key={question.id} 
            content={question.content}
            author={question.author} />
          }) }
        </div>
        
      </main>
    </div>
  )
}