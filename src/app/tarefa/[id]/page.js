'use client'
import './style.css'
import { alterTarefa, getTarefa } from "@/app/services/requests"
import { produce } from "immer"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import {AiOutlineArrowLeft} from 'react-icons/ai'

function AlertSave({state}){
    const [active, setActive] = useState(state)
    useEffect(()=>{
        setActive(state)
    },[state])
    console.log(active)

    return(
        <div className={`save-alert ${active===true?'active':'innactive'}`}>
            Tarefa salva com sucesso
        </div>
        )
    
    
}

export default function TarefaView(){
    const [tarefa, setTarefa] = useState({})
    const path = usePathname()
    const options = ['Em Andamento', 'Terminada', 'Aguardando', 'Para Fazer']
    const [saved, setSaved] = useState(false)
    
    useEffect(()=>{
        async function get(){
            const resp =await getTarefa(path.split('/')[2])
            if (resp){
                setTarefa(resp)
                console.log(resp)
            }
            
        }
        get()
    },[path])

    function modifyTarefa(key, value){
        const nextState = produce(tarefa, draft=>{
            draft[key] = value
        })
        setTarefa(nextState)
    }

    async function handleSave(e){
        e.preventDefault()
        await alterTarefa(path.split('/')[2], tarefa)
        setSaved(true)
        setTimeout(()=>{
            setSaved(false)
        }, 2000)
        
    }


    return(
        <div className="w-full h-screen flex justify-center items-center flex-col w-full">
            <AlertSave state={saved}/>
            <Link className="text-left w-6/12 flex my-5" href={'/'}><AiOutlineArrowLeft size={24}/>Voltar</Link>
            <form className="justify-evenly flex flex-col w-6/12 h-2/4">
                <div className="w-full">
                    <h1 className="text-left w-full font-bold">Título</h1>
                    <input onChange={(e)=>{modifyTarefa('title', e.target.value)}} className="text-input" defaultValue={tarefa.title}/>
                </div>

                <div className="w-full">
                    <h1 className="text-left w-full font-bold">Descrição</h1>
                    <textarea className="text-input" defaultValue={tarefa.description} onChange={(e)=>{modifyTarefa('description', e.target.value)}} ></textarea>
                </div>
                
                <div>
                    <h1 className="text-left w-full font-bold">Tags</h1>
                    <input onChange={(e)=>{modifyTarefa('tags', e.target.value)}} className="text-input" defaultValue={tarefa.tags}/>
                </div>
                
                <div>
                    <h1 className="text-left w-full font-bold">Status</h1>
                    <select onChange={(e)=>{modifyTarefa('status', e.target.value)}} className="text-black w-fit">
                        {options.map((option, idx)=>{
                            return(
                                <option className="text-black" value={option} key={idx}>
                                    {option}
                                </option>
                            )
                        })}
                    </select>
                </div>
                

                <button className="border p-2 my-20" onClick={handleSave}>Salvar</button>
            </form>
        </div>
    )
}