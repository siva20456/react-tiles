import { useNavigate } from 'react-router-dom'
import './index.css'
import { useState, useEffect } from 'react'


const WelNameEntry = () => {
    console.log('Start')
    const nav = useNavigate()
    const [name, setName] = useState('')

    useEffect(() => {
        const isName = localStorage.getItem('name')
        console.log(isName)
        if (isName !== null) {
            console.log('yes')
            nav('/game', { replace: true })
        }

    }, [])
    const handleInput = () => {
        if (name === '') {
            alert('Please Enter Name')
        } else {
            localStorage.setItem('name', name)
            nav('/', { replace: true })

        }
    }

    const handleChange = e => {
        setName(e.target.value)
    }

    return (
        <div className="welcome-cont">
            <h1 className="heads">React Tiles</h1>
            <div className="entry-cont">
                <h1 className="heads">Enter Your Name</h1>
                <input onChange={handleChange} type="text" className="input-ele" />
                <button onClick={handleInput} className="play-btn">Play</button>
            </div>
        </div>
    )
}

export default WelNameEntry