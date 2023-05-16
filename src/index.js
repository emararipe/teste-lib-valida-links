import fs from "fs"
import chalk from "chalk"

function lidaErro(erro) {
  console.log(erro)  
  throw new Error(chalk.red(erro.code, 'não fou possível localizar o arquivo necessário.'))
}

function pegaLinks(conteudo) {
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm
    const listaLinks = [...conteudo.matchAll(regex)]
    const linksTratados = listaLinks.map(conjunto => ({[conjunto[1]]: conjunto[2]}))
    return linksTratados.length != 0 ? linksTratados : 'Não foi possível localizar links no arquivo.'
}


async function pegaArquivo(localArquivo) {
    const encoding = "utf-8"
    try{
        const conteudo = await fs.promises.readFile(localArquivo, encoding)
        return pegaLinks(conteudo)
    } catch(erro){
        lidaErro(erro)
    }
}


export default pegaArquivo

// function pegaArquivo(localArquivo) {
//   const encoding = "utf-8"
//   fs.readFile(localArquivo, encoding, (erro, conteudo) => {
//     if (erro) {
//       lidaErro(erro)
//     }
//     console.log(chalk.blue(conteudo))
//   })
// }

// function pegaArquivo(localArquivo) {
//     const encoding = "utf-8"
//     fs.promises
//       .readFile(localArquivo, encoding)
//       .then((conteudo) => console.log(chalk.blue(conteudo)))
//       .catch(lidaErro)
//   }

// pegaArquivo("./arquivos/texto.md")