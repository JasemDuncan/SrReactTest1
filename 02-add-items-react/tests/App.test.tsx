import React from 'react'
import userEvent from '@testing-library/user-event'
import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '../src/App'

// describe ('<App/>', ()=>{
//     test('should work',()=>{
//         render(<App />)
//         // screen.debug()
//         expect(
//             screen.getByText('Technical SSRS SSIS')
//         ).toBeDefined()
        
//     })
// })

describe ('<App />', () => {
    test('Should add a items and remove them', async()=>{
        const user = userEvent.setup()
        
        render(<App/>)

        //Search input
        const input =screen.getByRole('textbox')
        expect(input).toBeDefined()

        //search form
        const form =screen.getByRole('form')
        expect(form).toBeDefined()

        const button=form.querySelector('button')
        expect(button).toBeDefined()

        //write in input
        await user.type(input, 'jasem')
        await user.click(button!)

        const randomText = crypto.randomUUID()
        await user.type(input, randomText)
        await user.click(button!)

        //Check if element was addded
        const list = screen.getByRole('list')
        expect(list).toBeDefined()
        
        //screen.debug()
        expect(list.childNodes.length).toBe(2)

        //Be sure we can delete
        const item =  screen.getByText(randomText)
        const removeButton = item.querySelector('button')
        expect(removeButton).toBeDefined()

        await user.click(removeButton!)

        const noResult = screen.getByText('jasem')
        expect(noResult).toBeDefined()

        
        



    })
})