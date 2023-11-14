import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

interface Item {
  id: `${string}-${string}-${string}-${string}-${string}`,
  timestamp: number,
  text: string
}

const INITIAL_ITEMS = [
  {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    text: 'Videojuegos',
  },
  {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    text: 'Libros',
  }
]

function App() {

  const [items, setItems]= useState(INITIAL_ITEMS);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // e.target.value => para escuchar el onChange de un INPUT

    const {elements} = event.currentTarget;

    //Estrategia1, trampa de typescript
    //no recomendable
    // const input = elements.namedItem('item') as HTMLInputElement;

    //Estrategia2 , es asegurarse que realmente es lo que es
    const input = elements.namedItem('item');
    const isInput = input instanceof HTMLInputElement; // esto es javascript puro
    if (!isInput || input == null) return;

    const newItem: Item = {
      id: crypto.randomUUID(),
      text: input.value,
      timestamp: Date.now(),
    }

    setItems((prevItems) => { 
      return [...prevItems, newItem]
    });

    input.value = '';


  }

  return (
    <main>
      <aside>
        <h1>Prueba tecnica de React</h1>
        <h2>Añadir/ eliminar elemento de una lista</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Elemento a introducir:
              <input
                name="item"
                required
                type="text"
                placeholder='videojuegos'
              />
            </label>
            <button> Añadir elemento a la lista</button>
          </form>
      </aside>
    <section>
      <h2>Lista de elementos</h2>
      <ul>
        {
          items.map(item => {
            return (
              <li key = {item.id}>
                <button onClick={()=>{
                  setItems( prevItems => {
                    return prevItems.filter(currentItem => currentItem.id !== item.id)
                  })
                }}>Eliminar</button>
                {item.text}
              </li>
            )
          })
        }
      </ul>
    </section>
    </main>
  )
}

export default App
