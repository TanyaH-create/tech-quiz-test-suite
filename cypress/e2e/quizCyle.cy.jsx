// quizCycle.cy.js - End-to-End tests
import React from 'react';
import Quiz from '../../client/src/components/Quiz';
import { mount } from 'cypress/react18';
import { getQuestions } from '../../client/src/services/questionApi';


describe('Tech Quiz E2E Tests', () => {
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
  
    beforeEach(() => {
      // Mock the API response with our mockQuestions
      cy.intercept('GET', '/api/questions', {
        statusCode: 200,
        body: mockQuestions
      }).as('getQuestions')
      
      // Visit the application
      cy.visit('/')
    })
  
    it('should display the home page with start button', () => {
      cy.get('button').contains('Start Quiz').should('be.visible')
    })
  
    // it('should start the quiz when clicking the start button', () => {
    //   cy.get('button').contains('Start Quiz').click()
    //   cy.wait('@getQuestions')
      
    //   // Should display the first question
    //   cy.get('h2').should('contain', mockQuestions[0].question)
    //   cy.get('.btn-primary').should('have.length', 4)
    // })
  
    // it('should navigate through all questions and show final score', () => {
    //   cy.get('button').contains('Start Quiz').click()
    //   cy.wait('@getQuestions')
      
    //   // Answer the first question (click any answer)
    //   cy.get('.btn-primary').first().click()
      
    //   // Answer the second question (click any answer)
    //   cy.get('.btn-primary').first().click()
      
    //   // Validate the quiz completion screen
    //   cy.get('h2').contains('Quiz Completed').should('be.visible')
    //   cy.get('.alert-success').should('contain', 'Your score:')
    //   cy.get('button').contains('Take New Quiz').should('be.visible')
    // })
  
    // it('should be able to take a new quiz after completing one', () => {
    //   cy.get('button').contains('Start Quiz').click()
    //   cy.wait('@getQuestions')
      
    //   // Answer both questions to complete the quiz
    //   cy.get('.btn-primary').first().click()
    //   cy.get('.btn-primary').first().click()
      
    //   // After quiz completion, start a new one
    //   cy.get('button').contains('Take New Quiz').click()
    //   cy.wait('@getQuestions')
      
    //   // Verify we're in a new quiz
    //   cy.get('h2').should('contain', mockQuestions[0].question)
    //   cy.get('.btn-primary').should('have.length', 4)
    // })
  
    // it('should show a loading state while fetching questions', () => {
    //   // Intercept and delay the API call
    //   cy.intercept('GET', '/api/questions', (req) => {
    //     req.reply({
    //       delay: 1000,
    //       body: mockQuestions
    //     })
    //   }).as('getDelayedQuestions')
      
    //   cy.get('button').contains('Start Quiz').click()
      
    //   // Should show loading spinner
    //   cy.get('.spinner-border').should('be.visible')
      
    //   // Wait for questions to load
    //   cy.wait('@getDelayedQuestions')
      
    //   // Spinner should be gone
    //   cy.get('.spinner-border').should('not.exist')
    // })
  
    // it('should give full score when all answers are correct', () => {
    //   cy.get('button').contains('Start Quiz').click()
    //   cy.wait('@getQuestions')
      
    //   // Click the correct answer for the first question (option with "13")
    //   cy.get('.alert-secondary').contains('13').parent().find('button').click()
      
    //   // Click the correct answer for the second question (option with "3")
    //   cy.get('.alert-secondary').contains('3').parent().find('button').click()
      
    //   // Verify final score is 2/2
    //   cy.get('.alert-success').should('contain', '2/2')
    // })
  
    // it('should give zero score when all answers are incorrect', () => {
    //   cy.get('button').contains('Start Quiz').click()
    //   cy.wait('@getQuestions')
      
    //   // Click an incorrect answer for the first question
    //   cy.get('.alert-secondary').contains('8').parent().find('button').click()
      
    //   // Click an incorrect answer for the second question
    //   cy.get('.alert-secondary').contains('13').parent().find('button').click()
      
    //   // Verify final score is 0/2
    //   cy.get('.alert-success').should('contain', '0/2')
    // })
  
    // it('should give partial score for partially correct answers', () => {
    //   cy.get('button').contains('Start Quiz').click()
    //   cy.wait('@getQuestions')
      
    //   // Click the correct answer for the first question
    //   cy.get('.alert-secondary').contains('13').parent().find('button').click()
      
    //   // Click an incorrect answer for the second question
    //   cy.get('.alert-secondary').contains('13').parent().find('button').click()
      
    //   // Verify final score is 1/2
    //   cy.get('.alert-success').should('contain', '1/2')
    // })
  })