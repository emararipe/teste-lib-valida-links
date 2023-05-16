#!/usr/bin/env node
import chalk from "chalk"
import fs from "fs"
import pegaArquivo from "./index.js"
import {listarURL, validaListaURLs} from "./http-validacao.js"


const caminhoRecebido = process.argv

async function imprimeResultado(valida, nomeArquivo = '', listaLinks) {
    if (valida) {
        console.log(chalk.black.bgGreen(nomeArquivo), chalk.yellow("Os links são:"),await validaListaURLs(listaLinks))
    } else {
        console.log(chalk.black.bgGreen(nomeArquivo), chalk.yellow("Os links são:"),await validaListaURLs(listaLinks))
    }
  
}

async function executaTexto(argumento) {
  const caminho = argumento[2]
  const valida = argumento[3] === '--valida'

  try {
    fs.lstatSync(caminho)
  } catch (erro) {
    if (erro.code === 'ENOENT') {
        console.log(chalk.red('O arquivo ou diretório passado não existe.'))
        return
    }
  }

  if (fs.lstatSync(caminho).isFile()) {
    const listaLinks = await pegaArquivo(caminho)

    imprimeResultado(valida,[],listaLinks)
 
} else if (fs.lstatSync(caminho).isDirectory()) {
    const arquivos = await fs.promises.readdir(caminho)

    arquivos.forEach(async (arquivo) => {
      const caminhoArquivo = `${caminho}/${arquivo}`
      const listaLinks = await pegaArquivo(caminhoArquivo)
      imprimeResultado(valida, arquivo, listaLinks)
    })
  }
}

executaTexto(caminhoRecebido)





