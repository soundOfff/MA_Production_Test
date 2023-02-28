import sum from '../clase1/sum'
import request from "supertest";


describe("Prueba de funcion sum", ()=>{
    // Arrange
    test("Cadena nula, deberia devolver 0", ()=>{
        //Act
        const cadena = "";
        const resultado = sum(cadena)
        // Assert
        expect(resultado).toEqual(0);

    })

    test("Cadena de 2 numeros, deberia devolver su suma", ()=>{
        const cadena = "12,2";

        const resultado = sum(cadena)

        expect(resultado).toEqual(14);

    })

    test("Cadena de un numero, debe devolver el mismo numero", ()=>{
        const cadena = "2";
        const resultado = sum(cadena)

        expect(resultado).toEqual(2);
    })
    

    test("Cadena de tres numeros, debe devolver su suma", ()=>{
        const cadena = "2,3,4";
        const resultado = sum(cadena)

        expect(resultado).toEqual(9);
    })
    

    test("Agrego \n a la cadena, deberia devolver su suama", ()=>{
        const cadena = "1,2,4\n5,6";
        const resultado = sum(cadena)

        expect(resultado).toEqual(18);

    })

    
    
    test("Configuro el delimitador en //[delimitador]\n, la suma debe permanecer", ()=>{
        const cadena = "//;\n1;3;6;4";
        const resultado = sum(cadena)

        expect(resultado).toEqual(14);

    })
    
    test("Configuro el delimitador en //[delimitador]\n, la suma debe permanecer V2", ()=>{
        const cadena = "//,\n1,3,6,4";
        const resultado = sum(cadena)

        expect(resultado).toEqual(14);

    })

})