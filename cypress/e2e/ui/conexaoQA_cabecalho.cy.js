describe('cabeçalho da página home', () => {

    context('não logado', () => {

        beforeEach(() => {
            cy.visit('/')
        })

        it('valida o cabeçalho', () => {

            // Conexão QA
            cy.get('[data-test=navbar-conexaoQA]')
                .should('have.attr', 'href', '/') //utlizando ascersão explicita 
                .and('not.have.attr', 'target', '_blank')

            //QAs
            cy.get('[data-test=navbar-QAs]')
                .should('have.attr', 'href', '/perfis') //utlizando ascersão explicita 
                .and('not.have.attr', 'target', '_blank')

            // Sobre
            cy.getElement('navbar-about') //usando comando customizado
                .should('have.attr', 'href', '/sobre') //utlizando ascersão explicita 
                .and('not.have.attr', 'target', '_blank')

            //Cadastrar
            cy.getElement('navbar-register') //usando comando customizado
                .should('have.attr', 'href', '/cadastrar') //utlizando ascersão explicita 
                .and('not.have.attr', 'target', '_blank')

            cy.getElement('navbar-login')
                .should('have.attr', 'href', '/login') //utlizando ascersão explicita 
                .and('not.have.attr', 'target', '_blank')


        })

    })

    context('logado', () => {

    })
})