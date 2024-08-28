/*const toDoController = require("../../src/controllers/todoController.js");
const Todo = require("../../src/models/Todo.js");

// On utilise un mock qui reprend notre modèle pour ne pas impacter la BDD
jest.mock("../../src/models/Todo");

describe('Validation du CRUD', () => {
    let req, res;

    beforeEach(() => {
    // On mock un objet de requète
    req = {
        body: { text: "New task" },
    };

    // On mock un objet de réponse
    res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };

    // RAZ des mocks avant chaque test
    Todo.mockClear();
    });



    
});

/** */
const toDoController = require("../../src/controllers/todoController.js");
const Todo = require("../../src/models/Todo.js");

// On utilise un mock qui reprend notre modèle pour ne pas impacter la BDD
jest.mock("../../src/models/Todo");

describe('Validation du CRUD', () => {
  let req, res;

  beforeEach(() => {
    // On mock un objet de requête
    req = {
      body: { text: "New task" },
    };

    // On mock un objet de réponse
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // RAZ des mocks avant chaque test
    Todo.mockClear();
  });

  test('createTodo() | should create a new todo and return it', async () => {
    // Arrange: On Mock la methode de sauvegarde avec nos valeurs de test
        const mockSave = jest.fn().mockResolvedValue({
            _id: "1234567890",
            text: "New task",
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        //Sauvegarde du mock
        Todo.mockImplementation(() => {
        return {
            save: mockSave
        };
        });

        // Act: Appel de la fonction createTodo avec nos données
        await toDoController.createTodo(req, res);

        // Assert: Vérification que l'appel a save a bien été fait
        expect(mockSave).toHaveBeenCalled();
    });

    test('should return a 400 status code if saving fails', async () => {
        // Arrange: Mock the save method to reject with an error
        const mockSave = jest.fn().mockRejectedValue(new Error("Save failed"));

        Todo.mockImplementation(() => {
        return {
            save: mockSave
        };
        });

        // Act: Call the createTodo function
        await toDoController.createTodo(req, res);

        // Assert: Check that the response status and message are correct
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: "Save failed" });
    });

    test('should return an error code if text field is empty or does not exist', async () => {
        // Arrange: Mock the createTodo method without content
        req.body = {};  // Simuler une requête avec un champ 'text' manquant

        const mockSave = jest.fn().mockResolvedValue({
            _id: "1234567890",
            text: "",
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        //Sauvegarde du mock
        Todo.mockImplementation(() => {
            return {
                save: mockSave
            };
        });

        // Act: Appel de la fonction createTodo
        await toDoController.createTodo(req, res);

        // Assert: Vérification que la réponse est un statut 201, qu'il y a un texte non null et que la tâche est à faire par défaut
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ text: expect.any(String) }));
        expect(mockSave.completed).toBeFalsy();
    });

  test('getAllTodos | Should return todos ordered by date in descending order', async () => {
    // Arrange: On Mock la méthode find pour retourner une liste de todos ordonnée
    const todosMock = [
      { _id: "1", text: "Task 1", createdAt: new Date('2024-01-01'), updatedAt: new Date('2024-01-01') },
      { _id: "2", text: "Task 2", createdAt: new Date('2024-01-02'), updatedAt: new Date('2024-01-02') },
      { _id: "3", text: "Task 3", createdAt: new Date('2024-01-03'), updatedAt: new Date('2024-01-03') }
    ];

    // Mock the `find` function to return a query-like object with `sort` method
    const mockFind = jest.fn().mockReturnValue({
      sort: jest.fn().mockResolvedValue(todosMock)
    });

    Todo.find = mockFind;

    // Act: Appel de la fonction getAllTodos
    await toDoController.getAllTodos(req, res);

    // Assert: Vérification que la réponse est une liste de todos triée par date décroissante
    expect(res.json).toHaveBeenCalledWith(todosMock);

    // Vérification que la liste est triée par date décroissante
    const responseTodos = res.json.mock.calls[0][0]; // Obtenir les todos renvoyés par res.json
    for (let i = 0; i < responseTodos.length - 1; i++) {
      const currentDate = new Date(responseTodos[i].createdAt).getTime();
      const nextDate = new Date(responseTodos[i + 1].createdAt).getTime();
      expect(currentDate).toBeLessThan(nextDate);
    }
  });
});
