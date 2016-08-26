import { ControllerBase } from './base';
import * as Express from 'express';
import * as TodoModel from '../models/todos';

export class TodoController extends ControllerBase {
    private _repo: TodoModel.TodoRepository;

    constructor() {
        super();
        this._repo = new TodoModel.TodoRepository('mongodb://localhost/tododb');
    }

    public registerRoutes(app: Express.Application) {
        this.registerRoute(
            app, 
            'todos', 
            (req, res) => this._getAllTodos(req, res), 
            (req, res) => this._createTodo(req, res));

            this.registerRoute(
                app,
                'todos/:id',
                (req, res) => this._getTodoById(req, res),
                null,
                null, 
                (req, res) => this._deleteTodo(req, res)
            );
    }

    // GET /todos
    private _getAllTodos(req: Express.Request, res: Express.Response) {
        this._repo.getTodos().then(function(todos) {
            res.status(200).json(todos);
        }, function(err) {
            res.send(err.message);
        });
    }

    // GET /todos/:id
    private _getTodoById(req: Express.Request, res: Express.Response) {
        let id = req.params.id;
        this._repo.getTodo(id).then(function(todo) {
            res.status(200).json(todo);
        }, function(err) {
            res.send(err.message);
        });
    }

    // POST /todos
    private _createTodo(req: Express.Request, res: Express.Response) {
        let newTodo = req.body;
        this._repo.createTodo({
            text: newTodo.text,
            done: newTodo.done
        }).then(function(todo) {
            res.status(201).json(todo);
        }, function(err) {
            res.send(err.message);
        });
    }

    // DELETE /todos/:id
    private _deleteTodo(req: Express.Request, res: Express.Response) {
        let id = req.params.id;
        this._repo.deleteTodo(id).then(function(todo) {
            res.status(200).send(todo);
        }, function(err) {
            res.send(err.message);
        });
    }
}