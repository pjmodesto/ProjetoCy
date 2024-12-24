import Ajv from 'ajv'
import { definitionHelper } from '../utils/schemaDefinitions'

// loga a aplicação via API
Cypress.Commands.add('login', (email, password, cookie) => {
    cy.request({
        method: 'POST',
        url: '/api/auth',
        //usando variável de ambiente para logar na aplicação
        //para isso criar o arquivo cypress.env.json
        //também é possível criar usuário na variável de ambiente no wind - não recomentado - 
        body: {
            email, //quando nova das variaveis são iguais em JScript ira fazer o email : email
            password
        }
    }).then(({ body }) => {
        cy.setCookie(cookie, body.jwt)
        Cypress.env(cookie, body.jwt)
    })
})

//todo teste iniciado pelo cypress o cookie são limpos por padrão, isso gerar erro quando realizado teste de CRUD
//O Cypress.Cookies.defaults usando em aula na versão 12 do cypress foi descontinuado
Cypress.Commands.add('manterCookie', (cookie) => {
    cy.setCookie(cookie, Cypress.env(cookie))
})

// executa teste e contrato em uma API
Cypress.Commands.add('testeContrato', (schema, resposta) => {

    //função que mostra os erros quando uma validação de contrado falhar
    const getSchemaError = ajvErros => { //quando somente uma parâmetro não precisa dos parentece
        return cy.wrap(
            `Campo: ${ajvErros[0]['instancePath']} é invalido. Erro: ${ajvErros[0]['message']}` //o erro sempre estará na casa zero
        )
    }

    // iniciar o AJV
    const ajv = new Ajv() //instanciando um objeto
    const validacao = ajv.addSchema(definitionHelper).compile(schema)
    const valido = validacao(resposta)

    //verficar se schema passsou ou falhou
    if (!valido) {
        getSchemaError(validacao.errors).then(schemaError => {
            throw new Error(schemaError)
        })
    } else
        expect(valido, 'Validação de Contrato').to.be.true
})

// seleciona um elemento pelo atributo data-test
Cypress.Commands.add('getElement', seletor => {
    return cy.get(`[data-test=${seletor}]`)
})
