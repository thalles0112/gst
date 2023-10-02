import Link from "next/link"
import { useState } from "react"
import { alterTarefa, deleteTarefa } from "../services/requests"
import {BsTrash3} from 'react-icons/bs'

export default function Tarefa({tarefa, localdeleteHandler, idx}){
    const options = ['Em Andamento', 'Terminada', 'Aguardando', 'Para Fazer']
    const [tarefaProps, setTarefasProps] = useState(tarefa)
    
    async function changeTarefaHandler(status){
        setTarefasProps({...tarefa, status:status})
        await alterTarefa(tarefa.id, {...tarefaProps, status:status})
    }

    async function deleteHandler(id){
        await deleteTarefa(id)
        localdeleteHandler(idx)
    }
 
        return(
            <div className="flex justify-around w-12/12  m-2 p-2 rounded">
                
                <Link className="w-72"  href={`/tarefa/${tarefa.id}`}>{tarefa.title}</Link>
                
                <div className="flex flex-col">
                    <label>{new Date(tarefa.date).toLocaleDateString()}</label>
                    <select defaultValue={tarefa.status} onChange={e=>changeTarefaHandler(e.target.value)} className="text-black">
                        {options.map((option, index)=>{
                            return(
                                <option key={index} className="text-black" value={option}>
                                    {option}
                                </option>
                            )
                        })}
                    </select>
                </div>
                
                <button onClick={()=>{deleteHandler(tarefa.id)}}><BsTrash3 color="#ff5555" size={16}/></button>
            </div>
        )
    
  
    
   }
