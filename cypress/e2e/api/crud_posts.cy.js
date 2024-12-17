describe('CRUD - Posts', () => {

    //o JScript é uma linguagem assincrona o let é uma variável JScript
    let potsId = ''
    let mensagem = 'Posts via Cypress - CRUD 17/12'
    
    // o before é executado uma única vez
    before(() => {

        cy.request({

            method: 'POST',
            url: '/api/auth',
            //usando variável de ambiente para logar na aplicação
            //para isso criar o arquivo cypress.env.json
            //também é possível criar usuário na variável de ambiente no wind - não recomentado - 
            body: {
                email: Cypress.env('email'),
                password: Cypress.env('password').toString()
            }
        }).then(({ body }) => {

            cy.setCookie('jwt', body.jwt)
            Cypress.env('jwt', body.jwt)

        })
    })

    beforeEach(() => {
        cy.session('Login', () => {
            cy.setCookie('jwt', Cypress.env('jwt'))
        })
    })//todo teste iniciado pelo cypress o cookie são limpos por padrão, isso gerar erro quando realizado teste de CRUD
    //O Cypress.Cookies.defaults usando em aula na versão 12 do cypress foi descontinuada 

    it('cria um post', () => {

        cy.request({
            method: 'POST',
            url: '/api/posts',
            body: {
                text: mensagem
            },

        }).then(({ status, body }) => {
            expect(status).to.eq(201)
            expect(body.text).to.eq(mensagem)
            potsId = body._id
        })
    })//todo teste iniciado pelo cypress o estado do browser é limpo inclusive o cookie é limpo por padrão, isso gerar erro quando realizado teste de CRUD

    it('lê post', () => {

        cy.request({
            method: 'GET',
            url: `/api/posts/${potsId}`
        }).then(({ status, body }) => {

            expect(status).to.eq(200)
            expect(body.text).to.eq(mensagem)
            expect(body.likes).to.have.lengthOf(0) //valida qtde do array
        })
    })

    it('atualiza o post', () => {

        cy.request({
            method: 'PUT',
            url: `/api/posts/like/${potsId}` //api para dar like no post
        }).then(({ status }) => {
            expect(status).to.eq(200)

            cy.request({
                method: 'GET',
                url: `/api/posts/${potsId}`
            }).then(({ body }) => {
                expect(body.likes).to.have.lengthOf(1) //valida qtde do array
            })
        })
    })

    it('deleta post', () => {
        
        cy.request({
            method: 'DELETE',
            url: `/api/posts/${potsId}`
        }).then(({ status, body }) =>{
            expect(status).to.eq(200)
            expect(body.msg).to.eq('Post removido')

            cy.request({
                method: 'GET',
                url: `/api/posts/${potsId}`, 
                failOnStatusCode: false //como ira retornar 404 não retornar o defaul do cypress quando retornado 404
            }).then(({ status }) => {
                expect(status).to.eq(404) //erro API dado não encontrado
            })
        })
    })
})