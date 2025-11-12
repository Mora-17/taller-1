
import { sum } from "../src/utils/example.js";




describe('Test sum function...', ()=>{
   

    it('Postive number test', ()=>{
        expect(sum(2,3)).toBe(5);
    })

    it('Negative nummer test', ()=>{
        expect(sum(-1,-5)).toBe(-6);
    })

    it('Decimal number tes', ()=>{
        expect(sum(4.4,1.5)).toBe(5.9)
    })


})