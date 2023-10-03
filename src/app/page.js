'use client'
import { useEffect, useState } from "react"
import { getMarketplaces, getTarefas } from "./services/requests"
import Tarefa from "./components/tarefa"
import Link from "next/link"
import { produce } from "immer"
import Marketplaces from "./components/marketplaces"



export default function Home() {
  const [tarefas, setTarefas] = useState([])
  const [marketplace, setMarketplace] = useState({})
  
  useEffect(()=>{
    async function get(){
      const resp = await getTarefas()
      const mktp_resp = await getMarketplaces(new Date().toISOString().split('T')[0])
      if (resp){
        setTarefas(resp)
      }
      if(mktp_resp){
        
        setMarketplace(mktp_resp)
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
          <div className="flex justify-between items-center">
            <h1>Lista de tarefas</h1> 
            <Link className="border p-2" href={'/tarefa/new'} >Nova Tarefa</Link>
          </div>
          
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
          <h1>Anuncios Por marketplace</h1>
          
          <Marketplaces marketplace={marketplace}/>
          
          
          
        </div>
        
      </div>
      
      
      
    </main>
  )
}
