import { useNavigate } from 'react-router-dom';
import '../GameBoardComp/index.css'
import { useEffect } from 'react';


const SuccComp = () => {
    console.log('Start')
    const navigation = useNavigate()
    const name = localStorage.getItem('name')
    const score = localStorage.getItem('score')
    const time = localStorage.getItem('time')

    useEffect(() => {
        const name = localStorage.getItem('name')
        const score = localStorage.getItem('score')
        const time = localStorage.getItem('time')
        console.log(name,score,time)
        if (name === null) {
            navigation('/', { replace: true })
        }
        if (score === null || time === null) {
            navigation('/game', { replace: true })
        }
    }, [])


    return (
        <div className="welcome-cont">
            <h1 className="heads">React Tiles</h1>
            <div className="entry-cont">
                <p className="data" style={{ alignSelf: 'flex-end' }}>Welcome {name} 👋👋</p>
                <h1 className="heads">Result</h1>
                <h1 className="heads" style={{ color: 'red' }}>Score:{score}</h1>
                <h1 className="heads" style={{ color: 'red' }}>Time Taken:{time}</h1>
            </div>
        </div>
    )
}

export default SuccComp