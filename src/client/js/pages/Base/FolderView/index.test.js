import { validate, errorMessages } from './index'

describe('validate', () => {
    it('Should return title error', () => {
        expect(validate({}).title).toBe(errorMessages.noTitle)
        expect(validate({ title: '' }).title).toBe(errorMessages.noTitle)
    })

    it('Should return price errors', () => {
        // Valid
        expect(validate({ isMain: true }).price).toBeUndefined()
        expect(validate({ isMain: true, price: '0' }).price).toBeUndefined()
        expect(validate({ isMain: true, price: '400' }).price).toBeUndefined()
        expect(validate({ isMain: true, price: 400 }).price).toBeUndefined()
        expect(validate({ isMain: false, price: 'dfdd' }).price).toBeUndefined()

        // Invalid
        expect(validate({ isMain: true, price: '-300' }).price).toBe(errorMessages.invalidPrice)
        expect(validate({ isMain: true, price: '400.5' }).price).toBe(errorMessages.invalidPrice)
        expect(validate({ isMain: true, price: 'dfgfd' }).price).toBe(errorMessages.invalidPrice)
    })
})
