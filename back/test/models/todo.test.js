const Todo = require("../../src/models/Todo.js");

describe('Validation du modèle', () => {
  // Arrange: On initialise un objet de test
    let task = new Todo();

    test('task should be a valid ToDo object', async () => {
      
      // Act: définition d'une ToDo valide
        task._id= "1234567890";
        task.text= "New task";
        task.createdAt= new Date();
        task.updatedAt= new Date();
      
      // Assert: Vérification que la ToDo est valide
      expect(task).toHaveProperty("text");
      expect(task.text).toBeTruthy();
      expect(task).toHaveProperty("completed");
      expect(task.completed).toBeFalsy();
      expect(task.createdAt).toBeInstanceOf(Date);
    });
  });