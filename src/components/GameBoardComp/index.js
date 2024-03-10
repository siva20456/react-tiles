import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './index.css'


const GameBoard = () => {
    const [listEle, setListEle] = useState([])
    const tiles_elements = ['🔥', '🤩', '❤️', '🤖', '🎉', '🎇', '🎆', '🎊', '🎀', '🔗', '📞', '💻', '📸', '💡', '📃', '📬']
    const [firstEle, setFirstEle] = useState('')
    const [score, setScore] = useState(0)
    const [count, setCount] = useState(parseInt(0))
    const [stopWatch, updateStopwatch] = useState(['00', '00'])

    const navigation = useNavigate()
    const name = localStorage.getItem('name')

    const assignEles = () => {
        const eles = []
        const obj = {}
        const n = tiles_elements.length
        for (let each of tiles_elements) {
            obj[each] = 0
        }
        for (let i = 0; i < 32; i++) {
            let ele = tiles_elements[Math.floor(Math.random() * n)]
            while (obj[ele] == 2) {
                ele = tiles_elements[Math.floor(Math.random() * n)]
            }
            eles.push({ id: i, img: ele, show: false })
            obj[ele] += 1
        }
        setListEle(eles)

    }
    // assignEles()

    useEffect(() => {
        if (name === null) {
            navigation('/', { replace: true })
        }
        assignEles()
        let seconds = 0;
        let minutes = 0;

        // Update the stopwatch every second
        let intervalId = setInterval(function () {
            seconds++;
            if (seconds === 60) {
                seconds = 0;
                minutes++;
                minutes = minutes < 10 ? '0' + minutes : minutes
            }

            seconds = seconds < 10 ? '0' + seconds : seconds

            updateStopwatch([minutes, seconds]);
        }, 1000);
        return () => clearInterval(intervalId)

    }, [])


    const renderResult = () => {
        localStorage.setItem('score', score)
        localStorage.setItem('time', `${stopWatch[0]}:${stopWatch[1]}`)
        navigation('/result', { replace: true })
    }

    const openImg = (id) => {
        const arr = listEle.filter(e => e.id == id)
        console.log(arr)
        const { img, show } = arr[0]
        if(show){
            let newList = listEle.map(e => {
                if (e.id === id) {
                    return { ...e, show: false }
                }
                return e
            })
            setListEle(newList)
            setFirstEle('')
        }
        else if (firstEle === '') {
            let newList = listEle.map(e => {
                if (e.id === id) {
                    return { ...e, show: true }
                }
                return e
            })
            setListEle(newList)
            setFirstEle(img)
        } else if (firstEle === img) {
            let newList = listEle.map(e => {
                if (e.img === img) {
                    return { ...e, show: true }
                }
                return e
            })
            setListEle(newList)
            setFirstEle('')
            
            if (parseInt(count) === 15) {
                renderResult()
            }
            setScore(parseInt(score) + 1)
            console.log(parseInt(count))
            setCount(parseInt(count) + 1)
        } else {
            let newList = listEle.map(e => {
                if (e.id === id) {
                    return { ...e, show: true }
                }
                return e
            })
            setListEle(newList)
            setTimeout(() => {
                let newList = listEle.map(e => {
                    if (e.id === id) {
                        return { ...e, show: false }
                    }
                    return e
                })
                setListEle(newList)
            }, 2000)
            setScore(parseInt(score) - 1)
        }
    }



    return (
        <div className="welcome-cont">
            <h1 className="heads">React Tiles</h1>
            <div className='details-cont'>
                <p className='data'>Score:{score}</p>
                <p className='data'>Time:{stopWatch[0]}:{stopWatch[1]}</p>
            </div>
            <div className="entry-cont">
                <p className="data" style={{ alignSelf: 'flex-end' }}>Welcome {name} 👋👋</p>
                <ul className='tile-cont'>
                    {listEle.map(e => <li key={e.id} className='list-ele'><button style={{cursor:'pointer'}} onClick={() => openImg(e.id)}>{e.show ? <p style={{ backgroundColor: 'transparent', outline: 'none', padding: 10 }}>{e.img}</p> : ''}</button></li>)}
                </ul>
            </div>
        </div>
    )
}

export default GameBoard