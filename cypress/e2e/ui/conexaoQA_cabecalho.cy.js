describe('cabeçalho da página home', () => {

    //criando uma função usar o const
    const validarMenu = (seletor, link, menu) => {
        cy.getElement(seletor)
            .should('have.attr', 'href', link)
            .and('not.have.attr', 'target', '_blank')
            .and('have.text', menu)
    }
    //para um teste de tela devemos criar o estado para realizar da funcionalidade
    //nesse tipo de teste não devemos ter dependencia de teste, exceto para teste de CRUD
    context('estado não logado', () => {

        beforeEach(() => {
            cy.visit('/')
        })

        it('valida o cabeçalho', () => {

            // Conexão QA
            cy.get('[data-test=navbar-conexaoQA]')
                .should('have.attr', 'href', '/') //utlizando ascersão explicita 
                .and('not.have.attr', 'target', '_blank')

            // QAs
            cy.get('[data-test=navbar-QAs]')
                .should('have.attr', 'href', '/perfis') //utlizando ascersão explicita 
                .and('not.have.attr', 'target', '_blank')

            // Sobre
            cy.getElement('navbar-about') //usando comando customizado
                .should('have.attr', 'href', '/sobre') //utlizando ascersão explicita 
                .and('not.have.attr', 'target', '_blank')

            // Cadastrar
            cy.getElement('navbar-register') //usando comando customizado
                .should('have.attr', 'href', '/cadastrar') //utlizando ascersão explicita 
                .and('not.have.attr', 'target', '_blank')

            // Login 
            cy.getElement('navbar-login')
                .should('have.attr', 'href', '/login') //utlizando ascersão explicita 
                .and('not.have.attr', 'target', '_blank')


        })

        // teste para validar todos os menus, nesse quando um der erro os demais serão testados
        //skip para pular o teste
        it.only('valida o cabeçalho utilizando object', () => {

            const menus = [
                { seletor: 'navbar-conexaoQA', link: '/' },
                { seletor: 'navbar-QAs', link: '/perfis' },
                { seletor: 'navbar-about', link: '/sobre' },
                { seletor: 'navbar-register', link: '/cadastrar' },
                { seletor: 'navbar-login', link: '/login' }
            ]

            menus.forEach(({ seletor, link }) => {
                cy.getElement(seletor)
                    .should('have.attr', 'href', link)
                    .and('not.have.attr', 'target', '_blank')
            })
        })

            //teste dinâmico usando um array quando não logado
            ;[
                { seletor: 'navbar-conexaoQA', link: '/', menu: 'Conexão QA' },
                { seletor: 'navbar-QAs', link: '/perfis', menu: 'QAs' },
                { seletor: 'navbar-about', link: '/sobre', menu: 'Sobre' },
                { seletor: 'navbar-register', link: '/cadastrar', menu: 'Cadastrar' },
                { seletor: 'navbar-login', link: '/login', menu: 'Login' }
            ].forEach(({ seletor, link, menu }) => {
                it.only(`valida o menu ${menu} - Teste Dinâmico`, () => {
                    cy.getElement(seletor)
                        .should('have.attr', 'href', link)
                        .and('not.have.attr', 'target', '_blank')
                })
            })
    })

    context('estado logado', () => {

        before(() => {
            cy.login(Cypress.env('email'), Cypress.env('password'), 'jwt')
        })

        //manter o cookie
        beforeEach(() => {
            cy.manterCookie('jwt')
        })

        beforeEach(() => {
            cy.visit('/')
        })

        //apagar o cookie quando finalizado o teste logado
        beforeEach(() => {
            cy.apagarCookie('jwt')
        })

            //array para fazer teste dimanico dos menu quando logado        
            ;[
                { seletor: 'navbar-conexaoQA', link: '/', menu: ' ConexãoQA' },
                { seletor: 'navbar-QAs', link: '/perfis', menu: 'QAs' },
                { seletor: 'navbar-posts', link: '/posts', menu: 'Posts' },
                { seletor: 'navbar-dashboard', link: '/dashboard', menu: ' Dashboard' },
                { seletor: 'navbar-about', link: '/sobre', menu: 'Sobre' },
                { seletor: 'navbar-logout', link: '/', menu: ' Sair' },
            ].forEach(({ seletor, link, menu }) => {

                it.only(`valida o menu ${menu} - Teste Dinâmico Logado`, () => {

                    //chamado a função para validar o menu
                    validarMenu(seletor, link, menu)
                })
            })
    })
})