describe('API - Profile', () => {

    let urlPerfis = '/api/profile'

    context('todos os perfis', () => {
        it('valida a API de perfis', () => {

            cy.log('Teste de texto')

            //realizado uma requisição para uma API
            //then - então valida os dados do retorno da API dentro da arronw function
            //a validação será atraves de uma asserssão implicita usando o expect 
            // para validação usando o expect estamos usando a biblioteca chai https://www.chaijs.com/guide/styles/#expect
            //usando o destructuring javascript que substitui o nome da variavel dada para o request/retorno da API
            cy.request({
                method: 'GET', //função da API GET/consultar
                url: urlPerfis //endereço da API
            }).then(respostaAPI => { //arronw function
                expect(respostaAPI.status).to.eq(200) //to.eq - igual
                expect(respostaAPI.duration).to.be.lessThan(10000) //lessThan - menor que | 1s = 1000
                expect(respostaAPI.body[0].status).to.eq('Especialista em QA')
                expect(respostaAPI.body[0].user.name).to.eq('paulo')
                expect(respostaAPI.body[1].company).to.eq('NuBank')
                expect(respostaAPI.body[1].skills[0]).to.eq('Teste manual')
                expect(respostaAPI.body[1].skills).to.have.lengthOf(1) //have lengthOf - ter o comprimento de 
                expect(respostaAPI.body[0].date).to.not.be.null //que valor não se nulo
                expect(respostaAPI.headers['x-powered-by']).to.eq('Express')
            })
        })
    })

    context('perfil específico', () => {

        let urlPerfil = '/api/profile/user'
        //teste negativo da API, validando um usuário que não existe
        //usando o destructuring javascript que substitui o nome da variavel dada para o request/retorno da API e pegar direto as variáveis da API
        it('seleciona um usuário invalido', () => {

            cy.request({
                method: 'GET',
                url: `${urlPerfil}/1`,
                failOnStatusCode: false //usamos pois o cypress sempre espera 200 como true, difernete disto é considera como false
            }).then(({ status, body }) => { //usando destructuring
                expect(status).to.eq(404)
                expect(body.errors[0].msg).to.eq('Perfil não encontrado');
            })
        })

        it('valdia um usuário válido', () => {

            let usuarioId = '674240ee64ba8319d4bbd366'

            cy.request({
                method: 'GET',
                url: `${urlPerfil}/${usuarioId}` //usando template string
                //url: '/api/profile/user/' + usuarioId
            }).then(({ status, body }) => {
                expect(status).to.eq(200)
                expect(body.user.name).to.eq('paulo')
            })
        })

        it('valida um usuário válido buscando na base', () => {

            cy.request({
                method: 'GET',
                url: urlPerfis //endereço da API
            }).then(({ body }) => {

                cy.request({
                    method: 'GET',
                    url: `${urlPerfil}/${body[2].user._id}` //usando template string                  
                }).then(({ body }) => {
                    expect(body.status).to.eq('QA Pleno')
                })
            })
        })
    })
})