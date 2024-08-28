# ECF Tests unitaires

Nous avons les tests back-end
## Validation du modèle
+ [x] Validité de l'objet Todo
+ [x] "completed" vaut false par défaut
+ [x] createdAt est de type Date
+ [x] text existe
+ [x] text n'est pas null

## Validation du controller (CRUD)
+ [x] createTodo crée un todo et le retourne
+ [x] 404 si l'enregistrement échoue
+ [x] getAllTodos renvoie les tâches classées par date
+ [x] updateTodo change le statut d'une tâche

## les tests d'API
+ [ ] test de rendu du formulaire 

Je m'arrête aux tests de formulaires (erreur d'import pour @testing-library/jest-dom)
