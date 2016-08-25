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
    }

    // GET /todos
    private _getAllTodos(req: Express.Request, res: Express.Response) {
        this._repo.getTodos(function(todos) {
            res.status(200).json(todos);
        }, function(err) {
            res.send(err);
        });
    }

    // POST /todos
    private _createTodo(req: Express.Request, res: Express.Response) {
        this._repo.createTodo({
            text: req.body.text,
            done: false
        }).then(function(todo) {
            res.status(201).json(todo);
        }, function(err) {
            res.send(err);
        });
    }
}