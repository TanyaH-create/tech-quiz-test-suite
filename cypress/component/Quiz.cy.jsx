import React from 'react';
import Quiz from '../../client/src/components/Quiz';
import { mount } from 'cypress/react18';


//Suite of tests for Quiz
describe('<Quiz />', ()=> {
//before each test intercept API fetch requests, mock questions in quizData.json
//use alias @getQuestions 
    beforeEach(() => {
      cy.intercept('GET', '/api/questions/random', {fixture: 'quizData.json'}).as('getQuestions');
    });

    //test render of start quiz button by looking for the text
    it('renders the Start Quiz button initially', ()=>{
       mount(<Quiz />);
       cy.contains('Start Quiz').should('be.visible');
    });

    //test starting the quiz and getting first question
    it('starts the quiz and gets the first question', ()=> {
        mount(<Quiz />);
        cy.contains('Start Quiz').click();
        cy.wait('@getQuestions').its('response.body').then((quizData) => {
        cy.contains(quizData[0].question).should('be.visible');
        })
    });

    //test clicking an answer proceeds to next question
    it('allows answering question and gets next question', () => {
        mount (< Quiz />);
        cy.contains('Start Quiz').click();
        cy.wait('@getQuestions').its('response.body').then((quizData) => {
        //click the correct answer
        cy.contains('button', `${1}`).click();  // Clicking button 
        //next question should be visible
        cy.contains(quizData[1].question).should('be.visible');
      });
    });


});


