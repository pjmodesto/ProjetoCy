import Ajv from 'ajv'

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

Cypress.Commands.add('testeContrato', () => {
    
    //função que mostra os erros quando uma validação de contrado falhar
    const getSchemaError = (ajvErros) => {
        return cy.wrap(
            `Campo: ${ajvErros[0]['instancePath']} é invalido. Erro: ${ajvErros[0]['message']}` //o erro sempre estará na casa zero
        )
    }

})