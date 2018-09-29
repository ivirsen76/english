import { validate, errorMessages } from './index'

describe('validate', () => {
    it('Should return title error', () => {
        expect(validate({}).title).toBe(errorMessages.noTitle)
        expect(validate({ title: '' }).title).toBe(errorMessages.noTitle)
    })
})
