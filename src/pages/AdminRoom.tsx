import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg';

import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { QuestionBox } from '../components/QuestionBox';

import { useHistory, useParams } from 'react-router-dom';

import '../styles/room.scss';

// import { useState, FormEvent } from 'react';
// import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';

import { database } from '../services/firebase';

type RoomParams = {
  id: string;
}

export function AdminRoom() {
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const history = useHistory();
  // const [newQuestion, setNewQuestion] = useState('');
  // const { user } = useAuth();
  const { questions, title } = useRoom(roomId);
  
  async function handleCloseRoom() {
    if (window.confirm('Você realmente deseja encerrar essa sala?'))
    // encerra a sala
      await database.ref(`rooms/${roomId}`).update({
        endedAt: new Date(),
      })

      history.push('/');
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm('Você realmente deseja excluir essa pergunta?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={handleCloseRoom}>Encerrar sala</Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>{title}</h1>
          { questions.length > 0 && (
            <span>{questions.length} pergunta{questions.length > 1 ? 's' : ''}</span>
          )}
        </div>

        <div className="question-list">
          { questions.map(question => {
            return (
              <QuestionBox key={question.id} 
              content={question.content}
              author={question.author}>
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="Remover pergunta" />
                </button>
              </QuestionBox>
            )
          }) }
        </div>
        
      </main>
    </div>
  )
}