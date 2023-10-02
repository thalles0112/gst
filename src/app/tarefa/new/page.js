'use client'
import './style.css'
import { postTarefa } from "@/app/services/requests"
import { produce } from "immer"
import { useEffect, useState } from "react"

function AlertSave({state}){
    const [active, setActive] = useState(state)
    useEffect(()=>{
        setActive(state)
    },[state])
    console.log(active)

    return(
        <div className={`save-alert ${active===true?'active':'innactive'}`}>
            Tarefa criada com sucesso
        </div>
        )
    
    
}

export default function NewTarefa(){
    const [tarefa, setTarefa] = useState({})
    const [saved, setSaved] = useState(false)
    const options = ['Em Andamento', 'Terminada', 'Aguardando', 'Para Fazer']
    


    function modifyTarefa(key, value){
        const nextState = produce(tarefa, draft=>{
            draft[key] = value
        })
        setTarefa(nextState)
    }

    async function handleSave(e){
        e.preventDefault()
        await postTarefa(tarefa)
        setSaved(true)
        setTimeout(()=>{
            setSaved(false)
        }, 2000)
    }

    return(
        <div className="w-full h-screen flex justify-center items-center flex-col w-full">
            <AlertSave state={saved}/>
            <form className="flex flex-col w-6/12 h-2/4">
                <h1 className="text-left w-full font-bold">*Título</h1>
                <input onChange={(e)=>{modifyTarefa('title', e.target.value)}} className="text-input" defaultValue={tarefa.title}/>
                <h1 className="text-left w-full font-bold">Descrição</h1>
                <textarea defaultValue={tarefa.description} onChange={(e)=>{modifyTarefa('description', e.target.value)}} className="text-input"></textarea>
                <h1 className="text-left w-full font-bold">Tags</h1>
                <input onChange={(e)=>{modifyTarefa('tags', e.target.value)}} className="text-input" defaultValue={tarefa.tags}/>
                <h1 className="text-left w-full font-bold">Status</h1>
                <select onChange={(e)=>{modifyTarefa('status', e.target.value)}} defaultValue={options[0]} className="text-black w-fit">
                    {options.map((option, idx)=>{
                        return(
                            <option className="text-black" value={option} key={idx}>
                                {option}
                            </option>
                        )
                    })}
                </select>

                <button className="border p-2 my-20" onClick={handleSave}>Salvar</button>
            </form>
        </div>
    )
}