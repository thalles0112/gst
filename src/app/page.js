'use client'
import { useEffect, useState } from "react"
import { getTarefas } from "./services/requests"
import Tarefa from "./components/tarefa"
import Link from "next/link"
import { produce } from "immer"

export default function Home() {
  const [tarefas, setTarefas] = useState([])
  useEffect(()=>{
    async function get(){
      const resp = await getTarefas()
      if (resp){
        setTarefas(resp)
      }
    }
    get()
  },[])

  function deleteHandler(idx){
    const nextState=produce(
      tarefas, draft=>{
        draft.splice(idx, 1)
      }
    )
    setTarefas(nextState)
  }

  return (
    <main className="flex justify-center items-center	w-full">
      <div className="flex w-10/12 justify-between items-center">
        <div className="w-7-12 ">
          
          <h1>Lista de tarefas</h1>
          <ul className="tarefas-list">

          
          {tarefas.map((tarefa, idx)=>{
            return(
              <li  key={tarefa.id} >
                <Tarefa tarefa={tarefa} idx={idx} localdeleteHandler={deleteHandler}/>
              </li>
            )
          })}

          </ul>
        </div>
        
        
        <div className="w-5/12 ">
          <Link className="border p-5" href={'/tarefa/new'} >Nova Tarefa</Link>
        </div>
        
      </div>
      
      
      
    </main>
  )
}
