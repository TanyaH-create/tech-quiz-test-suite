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
it('starts the quiz and gets the first question', ()=>{
  mount(<Quiz />);
  cy.contains('Start Quiz').click();
  cy.wait('@getQuestions').its('response.body').then((quizData) => {
    cy.contains(quizData[0].question).should('be.visible');
    })
});

/*
it('allows answering questions and proceeds to the next one', () => {
  mount(<Quiz />);
  cy.contains('Start Quiz').click();
  cy.wait('@getQuestions');
  
  cy.contains(mockQuestions[0].answers[1].text).click(); // Click correct answer
  cy.contains(mockQuestions[1].question).should('be.visible');
});

it('completes the quiz and shows the final score', () => {
  mount(<Quiz />);
  cy.contains('Start Quiz').click();
  cy.wait('@getQuestions');

  cy.contains(mockQuestions[0].answers[1].text).click();
  cy.contains(mockQuestions[1].answers[1].text).click();
  
  cy.contains('Quiz Completed').should('be.visible');
  cy.contains('Your score: 2/2').should('be.visible');
});
});
*/

