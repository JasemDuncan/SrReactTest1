import { describe, expect, test } from "vitest"
import { renderHook, act } from "@testing-library/react"
import { useItems } from "../src/hooks/useItems"

describe('useItems hook', ()=>{
    test('should add and remove items',() => {
        const { result } = renderHook( () => useItems())
        // console.log(result.current)\
        
        expect(result.current.items.length).toEqual(0)
        //asegurarse que se renderice el componente

        act(()=>{
            result.current.addItem('Valencia')
            result.current.addItem('Vargas')
        })

        // act(()=>{
        // })

        console.log(result.current.items)
        expect(result.current.items.length).toBe(2)

        act(()=>{
            result.current.removeItem(result.current.items[0].id)
        })
        
        expect(result.current.items.length).toBe(1)
    })
})