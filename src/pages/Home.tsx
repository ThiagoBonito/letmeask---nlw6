import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../styles/auth.scss'
import { FormEvent, useState } from 'react';
import { database } from '../service/firebase';


export function Home(){
    const navigate = useNavigate();

    const { user, signInWithGoogle } = useAuth();

    const [roomCode, setRoomCode] = useState('');

    async function handleCreateRoom(){
        if(!user){
            await signInWithGoogle();
        }

        navigate('/rooms/new');
    }

    async function handleJoinRoom(event: FormEvent){
        event.preventDefault();

        if(roomCode.trim() === ''){
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get();


        if(!roomRef.exists()){
            alert('Room does not exists.')
            return;
        }
        if(roomRef.val().endedAt){
            alert('Room already closed.')
            return;
        }

        navigate(`rooms/${roomCode}`)
    }
    function darkMode(){
        const $html = document.querySelector('html');
        $html?.classList.toggle('dark-mode');
    }

    return(
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas"/>
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo real</p>
            </aside>
            <main>
                <div className="main-content"> 
                    <img src={logoImg} alt="Letmeask"/>
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIconImg} alt="Logo do Google"/>
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input type="text" onChange={event => setRoomCode(event.target.value)} value={roomCode} placeholder="Digite o código da sala"/>
                        <Button type="submit">Entrar na sala</Button>
                    </form>
                </div>
            </main>
            <div className="dark">
                <span>Dark Mode </span><input type="checkbox" onClick={darkMode}/>
            </div>
        </div>
    )
}