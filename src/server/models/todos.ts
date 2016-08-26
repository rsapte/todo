import * as Mongoose from 'mongoose';

export interface ITodo {
    _id?: string;
    text: string;
    done: boolean;
}

export class TodoRepository {
    private _todoModel: Mongoose.Model<ITodo>;
    
    constructor(connectionString: string) {
        let schema = new Mongoose.Schema({
            text: String,
            done: Boolean
        });

        this._todoModel = Mongoose.model<ITodo>('Todo', schema);
        Mongoose.connect(connectionString);
    }

    public createTodo(todo: ITodo): Promise<ITodo> {
        var that = this;
        let promise = new Promise<ITodo>(function(resolve, reject) {
            that._todoModel.create({
                text: todo.text,
                done: todo.done
            }).then(function(created) {
                resolve(created);
            }, function(err) {
                reject(err);
            })
        });

        return promise;
    }

    public getTodos(): Promise<ITodo[]> {
        var that = this;
        let promise = new Promise<ITodo[]>(function(resolve, reject) {
            that._todoModel.find().then(function(todos) {
                resolve(todos);
            }, function(err) {
                reject(err);
            })
        });

        return promise;
    }

    public getTodo(id: string): Promise<ITodo> {
        var that = this;
        let promise = new Promise<ITodo>(function(resolve, reject) {
            that._todoModel.findById(id).then(function(todo) {
                resolve(todo);
            }, function(err) {
                reject(err);
            })
        });

        return promise;
    }

    public deleteTodo(id: string): Promise<ITodo> {
        var that = this;
        let promise = new Promise<ITodo>(function(resolve, reject) {
            that._todoModel.findByIdAndRemove(id).then(function(todo) {
                resolve(todo);
            }, function(err) {
                reject(err);
            })
        });

        return promise;
    }
}