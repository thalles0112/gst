'use client'
import { useEffect, useState } from 'react'
import './style.css'
import { getAllMarketplaces } from '@/app/services/requests'
export default function Acompanhar(){
    const [resp, setResp] = useState([])
    useEffect(()=>{
        async function get(){
            const r = await getAllMarketplaces()
            if (r){
                setResp(r)
            }
        }
        get()
    },[])
    return(
    <div className='w-full flex flex-col items-center my-5 '>
        {resp.map((date,index)=>{
            return(
                <div key={index} className="card m-2 w-10/12">
                    <h1>{date.date.split('-')[2]}/{date.date.split('-')[1]}/{date.date.split('-')[0]}</h1>
                    <div className='flex'>
                        {date.marketplaces && date.marketplaces.map((markteplace, idx)=>{
                            return(
                                <div key={idx} className='card border w-24 m-2 text-center'>
                                    <p>{markteplace.title}</p>
                                    <p>{markteplace.anuncios}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )
        })}
    </div>)
}