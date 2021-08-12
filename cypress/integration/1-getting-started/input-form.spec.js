describe('Input form', () => {
    it('should open bot', () => {
        cy.visit('https://console.dialogflow.com/api-client/demo/embedded/a164c8d9-0576-4943-87b3-c102215713ef')

        const welcome = ['hej','cześć', 'siemka', 'CZEŚć', 'lala', 'HEJ']

        for (const x of welcome){
            testInput(x)
        }
    })
})

function testInput(welcome){
    cy.get('input[type="text"]')
        .should('be.visible').type(welcome).type('{enter}')
}

