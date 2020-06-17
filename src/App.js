import React, { useState, useEffect } from "react";

import api from './services/api';
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(res => {
      setRepositories(res.data);
    });
  }, []);

  async function handleAddRepository() {
    const newRepo = {
      title: `New Repository ${Date.now()}`,
      url: "https://github.com/Rocketseat/bootcamp-gostack-desafios",
      techs: [
        'Node.js',
        'ReactJS',
        'React Native',
        'Typescript'
      ]
    }

    const response = await api.post('repositories', newRepo);

    setRepositories([...repositories, response.data]);

    console.log(response);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);
    
    if (response.status === 204){
      const filteredItems = repositories.filter(repo => repo.id !== id);
      
      setRepositories(filteredItems);
    }

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => (
        <li key={repo.id}>
          <strong>{repo.title}</strong>

          <button key={repo.id} onClick={() => handleRemoveRepository(repo.id)}>
            Remover
          </button>
        </li>

        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
