import React ,{ useEffect, useState }from "react";
import api from  "./services/api"
import "./styles.css";

function App() {
  const [reposList, setRepos] = useState([]);

  useEffect(()=>{
    api.get("repositories").then(response=>{
      setRepos(response.data)
    })
  },[])

  async function handleAddRepository() {
    const response = await api.post(`repositories`,{
      "title": "Desafio React Native", 
      "url": "http://github.com/...", 
      "techs": ["Node.js", "..."]
    })
    setRepos([...reposList,response.data])
    
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    setRepos(reposList.filter((item)=>{item.id ==id}));
  }

  return (
    <div className="container">
      <ul data-testid="repository-list">
        {
        reposList.map(repo=>{
          return  (      
          <li key={repo.id}>
            <div>
            {repo.title}
            </div>
          
          <button onClick={() => handleRemoveRepository(repo.id)}>
            Remover
          </button>
        </li>
        )})
      }
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
