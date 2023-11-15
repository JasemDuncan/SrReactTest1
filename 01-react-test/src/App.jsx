import { useEffect, useState } from "react"
import './App.css'

const CAT_ENDPOINT_RANDOM_FACT = `https://catfact.ninja/fact`
// const CAT_ENDPOINT_IMAGE_URL = `https://random.imagecdn.app/v1/image?width=500&height=150&category=${firstWord}&format=json`
const CAT_PREFIX_IMAGE_URL = 'https://images.unsplash.com/'

export function App () {
    const [fact, setFact] = useState()
    const [imageUrl, setImageUrl] = useState()
    const [factError, setFactError] = useState()
    //Retrieve data loading the page
    useEffect(()=>{
        fetch(CAT_ENDPOINT_RANDOM_FACT)
            .then(res => {
                if(!res.ok) throw new Error('Error retrieving the data')
                
                return res.json()})
            .then(data => {
                const { fact } = data
                setFact(fact)})
            .catch((err)=>{
                //Error with the petition or response
            })
    },[])

    //Retrieve image

    useEffect(() => {
        if (!fact) return
        const firstWord = fact.split(' ')[0] // si piden las 3 primeras palabras fact.split(' ').slice(0, 3).join(' ')

        fetch(`https://random.imagecdn.app/v1/image?width=500&height=150&category=${firstWord}&format=json`)
            .then(res => res.json())
            .then( response => {
                const { url } = response
                setImageUrl(url)
                console.log(url)
            })               
    }, [fact])

    return (
        <main >
            <h1>Test head</h1>
            <section>
                {fact && <p>{fact}</p>} {/* conditionalrender */}
                {imageUrl && <img src={imageUrl} alt='randomImage'/>}
            </section>
        </main>
    )
}