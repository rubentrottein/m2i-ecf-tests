// api.test.js
import { getAllTodos, createTodo } from '../api';

// On utilise jest pour mocker fetch
global.fetch = jest.fn();

describe('API Tests', () => {
  beforeEach(() => {
    fetch.mockClear(); // Réinitialise les mocks avant chaque test
  });

  test('getAllTodos should fetch todos from the API and return them as JSON', async () => {
    // Arrange: Définir les données de réponse simulées pour le test
    const mockTodos = [
      { _id: '1', text: 'Task 1', completed: false },
      { _id: '2', text: 'Task 2', completed: true },
    ];

    // On configure fetch pour retourner une réponse simulée
    fetch.mockResolvedValueOnce({
      ok: true, // Simule une réponse HTTP 200 OK
      json: async () => mockTodos, // Simule la méthode json() pour retourner les todos
    });

    // Act: Appeler la fonction getAllTodos
    const todos = await getAllTodos();

    // Assert: Vérifier que la fonction a fait une requête fetch avec l'URL correcte
    expect(fetch).toHaveBeenCalledWith('http://localhost:5000/api/todos');
    
    // Vérifier que la fonction retourne les données correctes
    expect(todos).toEqual(mockTodos);
  });

  test('getAllTodos should handle fetch errors', async () => {
    // Arrange: Simuler une erreur de réseau ou de serveur
    fetch.mockRejectedValueOnce(new Error('Failed to fetch'));

    // Act: Appeler la fonction et capturer l'erreur
    try {
      await getAllTodos();
    } catch (error) {
      // Assert: Vérifier que l'erreur est capturée correctement
      expect(error).toEqual(new Error('Failed to fetch'));
    }
  });

  test('createTodo should send a clean POST request', async()=>{
    const mockTodo = { _id: '1', text: 'New task', completed: false};

    // Configurer fetch pour retourner une réponse simulée
    fetch.mockResolvedValueOnce({
        ok: true, // Simule une réponse HTTP 200 OK
        json: async () => mockTodo, // Simule la méthode json() pour retourner le todo créé
      });
  
      const newText = 'New task';
  
      // Act: Appeler la fonction createTodo
      const todo = await createTodo(newText);
  
      // Assert: Vérifier que fetch a été appelé avec les bons paramètres
      expect(fetch).toHaveBeenCalledWith('http://localhost:5000/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newText }),
      });
  
      // Vérifier que la fonction retourne le todo créé correctement
      expect(todo).toEqual(mockTodo);
  })
  
});
