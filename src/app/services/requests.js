export function getTarefas(){
    return fetch(`https://zebuseta.pythonanywhere.com/apiv1/tarefas/`,{
        method:'GET',
        headers:{
            'Content-Type': 'Application/JSON',
            'Accept': 'Application/JSON'
        }
    }).then(resp=>resp.json())
    
}

export function getTarefa(id){
    return fetch(`https://zebuseta.pythonanywhere.com/apiv1/tarefas/${id}`,{
        method:'GET',
        headers:{
            'Content-Type': 'Application/JSON',
            'Accept': 'Application/JSON'
        }
    }).then(resp=>resp.json())
    
}


export function alterTarefa(id, tarefa){
    return fetch(`https://zebuseta.pythonanywhere.com/apiv1/tarefas/${id}/`,{
        method:'PUT',
        headers:{
            'Content-Type':'Application/JSON',
            'Accept':'Application/JSON'
        },
        body: JSON.stringify({
                "title": tarefa.title,
                "description": tarefa.description,
                "status": tarefa.status,
                "tags": tarefa.tags
        })
    }).then(resp=>resp.json())
    
}

export function postTarefa(tarefa){
    return fetch(`https://zebuseta.pythonanywhere.com/apiv1/tarefas/`,{
        method:'POST',
        headers:{
            'Content-Type':'Application/JSON',
            'Accept':'Application/JSON'
        },
        body: JSON.stringify({
                "title": tarefa.title,
                "description": tarefa.description,
                "status": tarefa.status,
                "tags": tarefa.tags
        })
    }).then(resp=>resp.json())
    
}

export function deleteTarefa(id){
    return fetch(`https://zebuseta.pythonanywhere.com/apiv1/tarefas/${id}/`,{
        method:'DELETE',
        headers:{
            'Content-Type': 'Application/JSON',
            'Accept': 'Application/JSON'
        }
    })
    
}