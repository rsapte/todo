import { ControllerBase } from './base';
import * as Express from 'express';
import * as TodoModel from '../models/todos';

export class TodoController extends ControllerBase {
    private _repo: TodoModel.TodoRepository;

    constructor() {
        super();
        this._repo = new TodoModel.TodoRepository('mongodb://127.0.0.1/tododb');
    }

    public registerRoutes(app: Express.Application) {
        this.registerRoute(app, 'todos', this._getAllTodos);
        this.registerRoute(app, 'todos', this._createTodo, 'POST');
    }

    // GET /todos
    private _getAllTodos(req: Express.Request, res: Express.Response) {
        this._repo.getTodos()
        .then(function(todos) {
            res.json(todos);
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
            res.json(todo);
        }, function(err) {
            res.send(err);
        });
    }
}