import chalk from "chalk"

function extraiURL(listaLinks){
    
   return listaLinks.map(link => Object.values(link).join())
}

function listarURL(listaLinks){
    return extraiURL(listaLinks)
    
}

function manejaErro(erro){
    if(erro.cause.code === 'ENOTFOUND'){
        return 'link não econtrado.' //retornamos apenas a string pois assim ela será usada como valor da listaStatus
    } else {
        return 'Ops, algo deu errado.'
    }   
}

async function verificaStatus(listaURL) {
    const listaStatus = await Promise.all(
        listaURL.map(async url => {
            try {
                const resposta = await fetch(url, {method: 'HEAD'})
                return `${resposta.status} - ${resposta.statusText}` 
            } catch (erro) {
               return manejaErro(erro)
            }
            
        })
    )
    return listaStatus
}

async function validaListaURLs(listaLinks){
    const urls = listarURL(listaLinks)
    const status = await verificaStatus(urls)
    
    return listaLinks.map((conjunto, indice) => ({...conjunto, status: status[indice]}))
}

export {listarURL, validaListaURLs}

