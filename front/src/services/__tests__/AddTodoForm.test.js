import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import AddTodoForm from './AddTodoForm'; // Assurez-vous que le chemin est correct

describe('AddTodoForm Component', () => {
  test('renders the form with an input field and a submit button', () => {
    // Arrange: Render the AddTodoForm component
    render(<AddTodoForm addTodo={jest.fn()} />);

    // Act: Find the input field and button in the rendered component
    const inputElement = screen.getByPlaceholderText('ajouter une nouvelle tâche');
    const buttonElement = screen.getByRole('button', { name: /add todo/i });

    // Assert: Check that the input field and button are present in the document
    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  test('updates local state when typing in the input field', () => {
  });

  test('calls addTodo and clears input field on submit', () => {
  });
});
