describe('CRUD - Posts', () => {

    let potsId = ''

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

        let mensagem = 'Posts via Cypress - CRUD'

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
    })//todo teste iniciado pelo cypress o cookie é limpo por padrão, isso gerar erro quando realizado teste de CRUD

    it('lê post', () => {

        cy.request({
            method: 'GET',
            url: `/api/posts/${potsId}`
        }).then(({ status }) => {

            expect(status).to.eq(200)
        })
    })
})