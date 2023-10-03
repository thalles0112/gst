'use client'
import { produce } from 'immer'
import './style.css'
import { useEffect, useState } from "react"
import {AiOutlinePlus} from 'react-icons/ai'
import { postMarkeplace } from '../services/requests'
import Link from 'next/link'

export default function Marketplaces({marketplace}){
    const [marketplaceData, setMarketplaceData] = useState(marketplace)
    const [creating, setCreating] = useState(false)
    const [newMktp, setNewMktp] = useState({'title':'', 'anuncios':0})
    const markeplaces = ['Renner', 'Centauro', 'Netshoes', 'Dafiti', 'Posthaus', 'Mercado Livre']
    useEffect(()=>{
        setMarketplaceData(marketplace)
    },[marketplace])

    function handleMktpChange(key, value){
        const nextState = produce(
            (newMktp,draft=>{
                draft[key] = value
            })
        )
        setNewMktp(nextState)
    }

    async function saveMktp(){
        const resp = await postMarkeplace(newMktp)
        if (resp){
            const nextState = produce((marketplaceData, draft=>{
                draft.marketplaces.push(resp)
            }))
            setMarketplaceData(nextState)
        }
    }

    return(
        <div className="flex flex-col card p-2 rounded">
            <h1>Data</h1>
            <h2>{marketplaceData.date && marketplaceData.date? new Date(marketplaceData.date).toLocaleDateString(): new Date().toLocaleDateString()}</h2>

            <h1>Anúncios por Marketplace</h1>
            <ul className='flex justify-evenly'>
                {marketplaceData.marketplaces && marketplaceData.marketplaces.map((_marketplace, idx)=>{
                    return(
                        <li key={idx} className='text-center border rounded p-2 h-20 w-24'>
                            <div>{_marketplace.title}</div>
                            <div>{_marketplace.anuncios}</div>
                        </li>
                    )

                })}
                <li className='text-center border rounded p-2 flex items-center'>
                    {!creating
                    ?<button onClick={()=>{setCreating(true)}}><AiOutlinePlus/></button>
                    :<div>
                        <label>Marketplace</label>
                        <select onChange={(e)=>{handleMktpChange('title', e.target.value)}} className='text-black'>
                            {markeplaces.map((mktp, idx)=>{
                                return(
                                    <option className='text-black' key={idx} value={mktp}>{mktp}</option>
                                )
                            })}
                        </select>
                        <div className='flex flex-row m-2'>
                            <label>Anuncios</label>
                            <input onChange={(e)=>{handleMktpChange('anuncios', e.target.value)}} type='number' className='text-input'/>
                        </div>
                        <div className='flex justify-around'>
                            <button onClick={saveMktp}className='border p-2'>Salvar</button>
                            <button onClick={()=>{setCreating(false)}}>Cancelar</button>
                        </div>
                        
                    </div>
                    }
                    
                        </li>
            </ul>

            <Link href={'/marketplace/acompanhar'}>Acompanhar</Link>
        </div>
    )
}