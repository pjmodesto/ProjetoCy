export const definitionHelper = {
    $id: 'customDefinitions',
    definitions: {
        timestamp: {
            type: 'string',
            examples: ['2024-12-21T07:03:52'],
            //informar a regax para validar o formato da data
            //site para validar um regax https://regex101.com/
            pattern: '^(\\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01]))T((2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])$)'
        }
    }
}