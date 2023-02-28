import request from "supertest";
import Juego from "../clase2/Juego"






describe('Prieba del juego', ()=>{
    
    let juego;
    const turnos = 20;



    beforeEach(() => {
        juego = new Juego();
      });
      
    
    test("Testear juego sin tumbar ningun pino", ()=>{
        //Act
        juego.tirarVarios(turnos, 0);
        let score = juego.score;
        //Asert 
        expect(score).toEqual(0)
    })

  

    test("Testear juego tumbando todos 1's", ()=>{
        //Act
        
        juego.tirarVarios(turnos, 1);
        let score = juego.score;

        // Asert
        expect(score).toEqual(20)
    })
    

    test("Testear juego cuando hay spare", () => {

        //Act
        
        
        juego.tirar(5)
        juego.tirar(5)
        juego.tirar(1)
        juego.tirar(0)
        juego.tirarVarios(turnos-4, 0);
        let score = juego.score;
        //Asert
    
    
        expect(score).toEqual(12);
    
    })


    test("Testear juego cuando hay strike", ()=>{

        //Act
        juego.tirar(10)
        juego.tirar(0)
        juego.tirar(1)
        juego.tirar(1)
        juego.tirar(1)
        juego.tirarVarios(turnos-5, 0);
        let score = juego.score;


        // Assert
       expect(score).toEqual(15);
    })

    test("Testear juego con un strike y un spare", ()=>{

        //Act
        juego.tirar(10) // 10
        juego.tirar(0)
        juego.tirar(1)  // 20 + 10 bonus 
        juego.tirar(9)
        juego.tirar(1) // 31 + 1 bonus
        juego.tirar(0)
        juego.tirarVarios(turnos-6, 0);
        let score = juego.score;
        // Funcionara ? Yes : No
        // Salado 
        // 32?????????????
        // Se intento man 
        //Assert
        expect(score).toEqual(32);
    })
    

})