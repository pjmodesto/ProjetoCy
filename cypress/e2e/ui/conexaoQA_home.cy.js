describe('página incial', () => {

    beforeEach(() => {
        cy.visit('/')
    })

    it('válida o titulo da página inicial', () => {
        cy.contains('Conectando')
            .should('have.text', 'Conectando QAs ...')
            .and('have.class', 'x-large')
    })

    it('seleciona um elemento passando o seletor', () => {
        cy.contains('h1', 'QAs')
            .should('have.text', 'Conectando QAs ...')
    })

    //tipos de opções para selecionar um seletor no CSS
    it('seleciona um elemento com o filter de um seletor CSS', () => {
        cy.get('a')
            .filter('.btn-primary')
            .should('have.text', 'Cadastrar')
            .click()

        //cy.get('a.btn-primary')
        //cy.contains('a', 'Cadastrar')

        cy.get('a')
            .eq(2)
            .should('have.text', 'Sobre')
            .click()
    })

    it('seleciona um elemento com o find ', () => {
        cy.get('.landing-inner')
        .find('h1')

        cy.get('.landing-inner h1')
    })

    
})