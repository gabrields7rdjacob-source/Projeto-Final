require ('dotenv').config({quiet:true})

const DATABASE_URL = process.env.DATABASE_URL

const host = new URL(DATABASE_URL).host

const neonHttpEndpoint = 'postgresql://neondb_owner:npg_nbrGfT6JIP7o@ep-long-river-acq0c97i-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'

async function executarQueryNeon(query, parametros)
{
    try {
        const resposta = await fetch(neonHttpEndpoint, {
            method: 'POST',
            headers: {
                'Neon-Connection-String': DATABASE_URL,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: querySQL,
                params: parametros
            })
        })
        if(!resposta.ok)
            {
                const erroTexto = await resposta.text()
                throw new Error(`Erro HTTP ${resposta.status} - ${erroTexto}`)
            }
            const dados = await resposta.json()
            return dados.rows
    } catch (error) {
        console.error('Falha ao se comunicar com o Banco de Dados')
        return null
    }  
}

module.exports = {executarQueryNeon} 