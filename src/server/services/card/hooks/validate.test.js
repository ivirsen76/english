import { validate, errorMessages } from './validate.js'

describe('validate', () => {
    function invalidText(text, message) {
        expect(validate({ text, translate: 'Текст' }).text).toBe(message)
    }
    function validText(text) {
        expect(validate({ text, translate: 'Текст' }).text).toBeUndefined()
    }
    function invalidTranslate(translate, message) {
        expect(validate({ translate, text: 'Text' }).translate).toBe(message)
    }
    function validTranslate(translate) {
        expect(validate({ translate, text: 'Text' }).translate).toBeUndefined()
    }

    it('Should return text error', () => {
        invalidText('', errorMessages.noText)
        invalidText(undefined, errorMessages.noText)
        invalidText(' (text) ', errorMessages.noText)
        invalidText('Что-то русское', errorMessages.invalidText)
        invalidText('dfjksdj%&&^*(&(&(*#', errorMessages.invalidText)
    })

    it('Should not return text error', () => {
        validText('Normal text')
        validText('Normal text (с чем нибудь русским в скобках)')
        validText('S`tressed word')
        validText("I'm Normal-text, with: that. Whay? Hey! next; (с чем нибудь русским в скобках)")
        validText('Diane – she’s so generous.')
    })

    it('Should return translate error', () => {
        invalidTranslate('', errorMessages.noTranslate)
        invalidTranslate(undefined, errorMessages.noTranslate)
        invalidTranslate(' (text) ', errorMessages.noTranslate)
        invalidTranslate('Some english', errorMessages.invalidTranslate)
        invalidTranslate('текст%&&^*(&(&(*#', errorMessages.invalidTranslate)
    })

    it('Should not return translate error', () => {
        validTranslate('Обычный текст')
        validTranslate('Обычный текст (with english inside brackets)')
        validTranslate("Тек'ст с удар`ением")
        validTranslate('Обычный-текст, да: ты. Нет? Да! за; (with english inside brackets)')
        validTranslate('Всё будет ВСЁ')
    })
})
