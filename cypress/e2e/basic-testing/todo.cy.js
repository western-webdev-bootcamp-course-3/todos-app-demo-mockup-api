/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('example to-do app', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:3000/');
  });

  it('displays two todo items by default', () => {
    // We use the `cy.get()` command to get all elements that match the selector.
    // Then, we use `contains` to assert that there are two matched items,
    // which are the two default items.
    cy.get('.todos li').should('have.length', 2);

    // We can go even further and check that the default todos each contain
    // the correct text. We use the `first` and `last` functions
    cy.get('.todo-list li label').first().contains('See the doctor');
    cy.get('.todo-list li label').last().contains('Walk the dog');
  });

  it('can add and delete todo items', () => {
    // We'll store our item text in a variable so we can reuse it
    const newItem = 'Feed the dog';

    // add newItem to list
    cy.get('input[placeholder="What needs to be done?"]').type(`${newItem}`).type('{enter}');

    // verify that the newItem was added to the list
    cy.get('.todo-list li label').should('have.length', 3).last().contains(newItem);

    // delete newItem from list
    cy.get('.todo-list li button').last().click();

    // verify that the newItem was deleted from the list
    cy.get('.todos li').should('have.length', 2);
    cy.get('.todo-list li label').first().contains('See the doctor');
    cy.get('.todo-list li label').last().contains('Walk the dog');
  });
});
