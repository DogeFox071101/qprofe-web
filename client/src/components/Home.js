import React, { useEffect, useState } from 'react';
import Nav from './Nav';
import { useNavigate } from 'react-router-dom';
import Likes from '../utils/Likes';
import Comments from '../utils/Comments';

// Es la pantalla que se muesrtra una vez el usuario se ha logueado correctamente. 
// Permitirá crear y reaccionar a posts (hilos)
const Home = () => {
    const [thread, setThread] = useState("");
    const navigate = useNavigate();
    const [threadList, setThreadList] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ thread });
        createThread();
        setThread("");
    }

    const createThread = () => {
        fetch("http://localhost:4000/api/create/thread", {
            method: "POST",
            body: JSON.stringify({
                thread,
                userId: localStorage.getItem("_id"),
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                alert(data.message);
                setThreadList(data.threads);
            })
            .catch((err) => console.log(err));
    };

    // Determina si el usuario está autenticado, verificando que el id exista
    useEffect(() => {
        const checkUser = () => {
            // Verifica que el id esta en el almacenamiento local
            if (!localStorage.getItem("_id")) {
                navigate("/");
            } else {
                console.log("Autenticado");
                fetch("http://localhost:4000/api/all/threads")
                    .then((res) => res.json())
                    .then((data) => setThreadList(data.threads))
                    .catch((err) => console.error(err));
            }
        };
        checkUser();
    }, [navigate]);

    return (
        <>
            <Nav />
            <main className='home'>
                <h2 className='homeTitle'>Crear un Post</h2>
                <form className='homeForm' onSubmit={handleSubmit}>
                    <div className='home__container'>
                        <label htmlFor="thread">Título / Descripción</label>
                        <input
                            type="text"
                            name="thread"
                            required
                            value={thread}
                            onChange={(e) => setThread(e.target.value)}
                        />
                    </div>
                    <button className='homeBtn'>Postear</button>
                </form>

                <div className='thread__container'>
                    {threadList.map((thread) => (
                        <div className='thread__item' key={thread.id}>
                            <p>{thread.title}</p>
                            <div className='react__container'>
                                <Likes numberOfLikes={thread.likes.length} threadId={thread.id} />
                                <Comments
                                    numberOfComments={thread.replies.length}
                                    threadId={thread.id}
                                    title={thread.title}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </>
    )
}

export default Home