import React ,{ useEffect, useState }from "react";
import api from  "./services/api"
import "./styles.css";

function App() {
  const [reposList, setRepos] = useState([]);
  const [inputTxt, updateInput] = useState("");

  useEffect(()=>{
    api.get("repositories").then(response=>{
      setRepos(response.data)
    })
  },[])
  
  function handleTyping(event){
    updateInput(event.target.value)
  }

  async function handleAddRepository() {
    const response = await api.post(`repositories`,{
      "title": inputTxt, 
      "url": "http://github.com/...", 
      "techs": ["Node.js", "..."]
    })
    setRepos(response.data)
    updateInput("");
    
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`)
    setRepos(response.data)
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
      <input type="text" value={inputTxt} onChange={handleTyping}></input>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
