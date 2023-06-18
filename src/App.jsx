import { useState } from "react"


function App(){
  const [games , setGames ] = useState(()=> {
    const getItem = localStorage.getItem('biblio-game')
    if(!getItem) return []
    return  JSON.parse(getItem)

  })
  const [title , setTitle] = useState('')
  const [cover , setCover] = useState('')

  const addGames = ({title , cover}) => {
    const id = Math.floor(Math.random() * 1000)
    const game = {id, title , cover}
    setGames(ev => {

    const newState =   [...ev , game]
    localStorage.setItem('biblio-game', JSON.stringify(newState))
    return newState
  })
   
  }

  const removeGame = (id)=> {
    setGames( game => {
      const newState = game.filter(games => games.id !== id)
      localStorage.setItem('biblio-game', JSON.stringify(newState))
      return newState
    })
  }


  const handleSubmit = (ev) => {
    ev.preventDefault()

    addGames({title , cover})
    setTitle('')
    setCover('')
  }



  return (
    <div className="App">
      <h1>Biblioteca de jogos</h1>
      <form onSubmit={handleSubmit}>  

        <div>
          <label htmlFor="title">Titulo</label>
          <input 
            type="text" 
            name="title" 
            id="title"
            value={title}
            onChange={(ev)=> setTitle(ev.target.value)}
           />
        </div>
        <div>
          <label htmlFor="cover">Capa</label>
          <input 
            type="text" 
            name="cover" 
            id="cover" 
            value={cover}
            onChange={(ev)=> setCover(ev.target.value)}
          />
        </div>
        <button type="submit">Adicionar à biblioteca</button>
      </form>
      <div className="games">
      {games.map((game)=> (
        <div key={game.id}>
          <img src={game.cover} alt="" />
          <div>
            <h2>{game.title}</h2>
            <button onClick={()=> removeGame(game.id)}> Remover</button>
          </div>
        </div>
      ))}

      </div>
    </div>
  )
}

export default App