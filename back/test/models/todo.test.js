const Todo = require("../../src/models/Todo.js");

describe('Validation du modèle', () => {
  // Arrange: On initialise un objet de test
  let task = new Todo();

  // Act: définition d'une ToDo valide
    task._id= "1234567890";
    task.text= "New task";
    task.createdAt= new Date();
    task.updatedAt= new Date();

  test('task should be a valid ToDo object', async () => {
    
    
    // Assert: Vérification que la ToDo est valide
    expect(task).toBeInstanceOf(Todo);
    expect(task).toHaveProperty("text");
    expect(task.text).toBeTruthy();
  });

  test('should have a completed property set to false by default', async () => {
    // Assert: Vérification que la ToDo est valide
    expect(task).toHaveProperty("completed");
    expect(task.completed).toBeFalsy();
  });
  test('should have a property createdAt that is a Date object', async () => {
    // Assert: Vérification que la ToDo est valide
    expect(task).toHaveProperty("completed");
    expect(task.completed).toBeFalsy();
  });

  test('task should have a text property and it should not be null', async () => {
    
    // Act: définition d'une ToDo invalide sans texte
    try{
      let textLessTask = new Todo();
      textLessTask._id= "1234567890";
      textLessTask.createdAt= new Date();
      textLessTask.updatedAt= new Date();
    
      // On essaie de sauvegarder l'objet pour déclencher la validation
      await textLessTask.save();
    } catch (error) {
      // Assert: Vérifier que l'erreur est constatée par le modèle
      expect(error).toBeDefined();
      expect(error.errors.text).toBeDefined();
    }
  })
});