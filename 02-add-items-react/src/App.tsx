import './App.css'
import { Item } from './components/Item'
import { useItems } from './hooks/useItems'
import { useSEO } from './hooks/useSEO'

export type ItemId = `${string}-${string}-${string}-${string}-${string}` 
export interface Item {
  id: ItemId,
  timestamp: number,
  text: string
}

// const INITIAL_ITEMS = [
//   {
//     id: crypto.randomUUID(),
//     timestamp: Date.now(),
//     text: 'Videojuegos',
//   },
//   {
//     id: crypto.randomUUID(),
//     timestamp: Date.now(),
//     text: 'Libros',
//   }
//]

function App() {

  const {items, addItem, removeItem } = useItems()  

  useSEO({
    title : `[${items.length}] Tecnical react test`,
    description : 'Add and delete items', 
  });

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

    addItem(input.value)
    
    input.value = '';

  }
  
  const createHandleRemoveItem = (id: ItemId)=> () => {
    removeItem(id)
  }

  return (
    <main>
      <aside>
        <h1>Technical SSRS SSIS</h1>
        <h2>Añadir/ eliminar elemento de una lista</h2>
          <form onSubmit={handleSubmit} aria-label='Add element to list'>
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
        {
          items.length == 0 ? (
            <p>
              <strong>No elements</strong>
            </p>
          )
          :
          (
            <ul>
              {
                items.map((item) => {
                  return ( <Item 
                  {...item} 
                  handleClick={createHandleRemoveItem(item.id)} 
                  key={item.id} />
                  )
              })}
            </ul>
          )
        }
      
    </section>
    </main>
  )
}

export default App
