//Quiz.cy.ts - component testing

import React from 'react';
import  Quiz  from '../../client/src/components/Quiz';
import { mount } from 'cypress/react18';
import { getQuestions } from '../../client/src/services/questionApi';

//Suite of tests for Quiz
describe('<Quiz /> Component', ()=> {
  const mockQuestions = [
    {
     "_id": "1",
     "question": "What is the output of 5 + 8?",
     "answers": [
       { "text": "3", "isCorrect": false },
       { "text": "8", "isCorrect": false },
       { "text": "13", "isCorrect": true },
       { "text": "40", "isCorrect": false }
     ]
   },
   {
     "_id": "2",
     "question": "What is the output of 8 - 5?",
     "answers": [
       { "text": "3", "isCorrect": true },
       { "text": "13", "isCorrect": false },
       { "text": "20", "isCorrect": false },
       { "text": "40", "isCorrect": false }
     ]
   }
  ]
//before each test intercept API fetch requests, mock questions in quizData.json
//use alias @getQuestions 
    beforeEach(() => {
      cy.intercept('GET', '/api/questions/random', {
          statusCode: 200,
          body: mockQuestions,
        }).as('getQuestions');
       
    });

    //when visit the page, start quiz button is visible
    it('should render the start button', ()=>{
       mount(<Quiz />)
       cy.get('button').contains('Start Quiz').should('be.visible')
    });

    it('should start the quiz and load the first question', ()=> {
        mount(<Quiz />)
        cy.get('button').contains('Start Quiz').click()
        //intercept request - get mockQuestions
        cy.wait('@getQuestions')
        //check that first question is loaded
        cy.get('h2').contains(mockQuestions[0].question).should('be.visible');
        //should also show answer options
        cy.get('.btn-primary').should('have.length', 4)
        cy.get('.alert-secondary').should('have.length', 4)
    });


    //test clicking an answer proceeds to next question
    it('should load the next question after an answer is selected', () => {
      mount(<Quiz />)
      cy.get('button').contains('Start Quiz').click()
      //intercept request - get mockQuestions
      cy.wait('@getQuestions')
      // Verify first question is displayed
      cy.get('h2').contains(mockQuestions[0].question).should('be.visible');
      // Click on the first answer in the list
      cy.get('.btn-primary').first().click()
      //verify the next question is displayed
      cy.get('h2').contains(mockQuestions[1].question).should('be.visible');
     });

     // quiz completed after all questions are answered
     it('should show quiz completed, score and Next Quiz button after last question is answered', ()=> {
      mount(<Quiz />)
      cy.get('button').contains('Start Quiz').click()
      //intercept request - get mockQuestions
      cy.wait('@getQuestions')

      //answer both questions
      cy.get('.btn-primary').first().click() //answer first question
      cy.get('.btn-primary').first().click() //answer second question

      //displays 'Quiz Complete' heading
      cy.get('h2').contains('Quiz Completed').should('be.visible');
      //score is shown in alert
      cy.get('.alert-success').contains('Your score').should('be.visible')
      //Start nex quiz button 
      cy.get('button').contains('Take New Quiz').should('be.visible')

     })

    // increment score and display upon completion
     it('should increment score when a correct answer is selected and display upon quiz completion', () => {
      mount(<Quiz />)
      cy.get('button').contains('Start Quiz').click()
      cy.wait('@getQuestions')
      
      // Find and click the correct answer for the first question (option with "13")
      cy.get('.alert-secondary').contains('13').parent().find('button').click()
      
      // Find and click the incorrect answer for the second question (option without "3")
      cy.get('.alert-secondary').contains('13').parent().find('button').click()
      
      // Check the score displays the exact numbers (2/2)
      cy.get('.alert-success').should('contain', 'Your score: 1/2')
    })

    //start next quiz
    it('should start a new quiz when Take New Quiz button is pressed', ()=> {
      mount(<Quiz />)
      cy.get('button').contains('Start Quiz').click()
      //intercept request - get mockQuestions
      cy.wait('@getQuestions')

      //answer both questions
      cy.get('.btn-primary').first().click() //answer first question
      cy.get('.btn-primary').first().click() //answer second question
      //Start nex quiz button 
      cy.get('button').contains('Take New Quiz').click()
      //intercept request - get mockQuestions
      cy.wait('@getQuestions')
      //check that first question is loaded
      cy.get('h2').contains(mockQuestions[0].question).should('be.visible');
      //should also show answer options
      cy.get('.btn-primary').should('have.length', 4)
      cy.get('.alert-secondary').should('have.length', 4)
    })
    

});


