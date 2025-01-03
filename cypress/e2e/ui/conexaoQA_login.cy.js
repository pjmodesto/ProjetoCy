describe('pagina de login', () => {

    beforeEach(() => {
        cy.visit('/login')
    })

    it('faz o login válido', () => {

        //usando conceito de syp - espera - do retorno de uma API
        //uma espera inteligente, ou seja, não para a automação 
        cy.intercept('GET', '/api/profile/me')
            .as('apiLogin')

        //prenche o email
        cy.getElement('login-email')
            .type(Cypress.env('email'), { log: true, delay: 100 })

        //preencher a senha
        cy.getElement('login-password')
            .type(Cypress.env('password'))

        //clicar no botão login
        cy.getElement('login-submit')
            .click()
            //.wait(5000) //uso de espera não recomendada 
            
            .wait('@apiLogin') //esperando o retorno de uma API
            .then(( { response }) => {
                expect(response.body.company).to.eq('Iterasys')
            })

        //validar se o usuario está logado
        cy.getElement('dashboard-welcome')
            .should('contain', 'Iterasys')
    })

})