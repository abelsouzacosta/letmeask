import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import '../styles/auth.scss';

import { Button } from '../components/Button';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

import { FormEvent, useState } from 'react';

import { database } from '../services/firebase';

export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState('');

  /**
   * Entrar numa sala
   */
  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault(); // nao recarregar a pagina
    

    // verifica se há texto preenchido
    if (roomCode.trim() === '') {
      return ;
    }

    // verifica se o roomCode existe dentro do db
    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    // se a roomCode não existir retorna um erro
    if (!roomRef.exists()) {
      alert('This room does not exist');

      setRoomCode('');

      return ;
    }

    if (roomRef.val().endedAt) {
      alert('Room already closed');

      setRoomCode('');

      return;
    }

    history.push(`/rooms/${roomCode}`)
  }

  const handleCreateRoom = async () => {  
    if (!user)
      await signInWithGoogle();

    history.push('rooms/new');
  };

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as duvidas da sua audiência em tempo real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <button className="create-room" onClick={handleCreateRoom}>
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input 
            type="text"
            placeholder="Digite o código da sala"
            value={roomCode}
            onChange={event => setRoomCode(event.target.value)}
            />
            <Button>
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}