import './style.css'

import React, {useState, useEffect} from 'react'

import {Card} from '../../components/Card'

export function Home() {
  const [studentName, setStudentName] = useState()
  const [studentsName, setStudentsName] = useState([])
  const [user, setUser] = useState({name: "", avatr: ""})

  function handleAddStudent() {
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleDateString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    }

    setStudentsName(prevState => [...prevState, newStudent])    
  }

  useEffect(() => {
    fetch('https://api.github.com/users/levymonteiro')
    .then(res => res.json())
    .then(data => {
      setUser({
        name: data.name,
        avatar: data.avatar_url,
      })
    })
  }, [])

  return (
    <div className='container'>
      <header>
        <h1>Lista de presença</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="Foto do usuário" />
        </div>
      </header>
      
      <input 
      type="text" 
      placeholder="digite seu nome"
      onChange={e => setStudentName(e.target.value)}
      />

      <button type="button" onClick={handleAddStudent}>
        Adicionar
      </button>

    {
    studentsName.map(student => (
      <Card 
        key={student.time}
        name={student.name} 
        time={student.time}
      />
    ))  
    
    }
    </div>
  )
}
