import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import '../styles/auth.scss';

import { Button } from '../components/Button';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FormEvent, useState } from 'react';
import { database } from '../services/firebase';



export function NewRoom() {

  const { user } = useAuth();
  const [newRoom, setNewRoom] = useState('');
  const history = useHistory();


  /**
   * Função responsável por criar uma sala
   */
  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    // verirfica se realmente existe algum texto dentro da aplicação
    if (newRoom.trim() === '') {
      return ;
    }

    // pegando a referencia das salas dentro do banco de dados
    const roomRef = database.ref('rooms');

    // colocando uma nova sala dentro do db
    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    });

    history.push(`/rooms/${firebaseRoom.key}`);
  }

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
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input type="text" placeholder="Nome da Sala" 
            value={newRoom} 
            onChange={event => setNewRoom(event.target.value)}
            />
            <Button>
              Criar sala
            </Button>
          </form>
          <p>Quer entrar em uma sala já existente? <Link to="/">clique aqui</Link></p>
        </div>
      </main>
    </div>
  );
}