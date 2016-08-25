import * as Mongoose from 'mongoose';

export interface ITodo {
    _id?: string;
    text: string;
    done: boolean;
}

export class TodoRepository {
    private _todoModel: Mongoose.Model<ITodo>;

    private _connection: Mongoose.Mongoose;
    private _connectionString: string;
    
    constructor(connectionString: string) {
        let schema = new Mongoose.Schema({
            text: String,
            done: Boolean
        });

        this._todoModel = Mongoose.model<ITodo>('Todo', schema);
    }

    private _ensureConnected() {
        if(!this._connection) {
            this._connection = Mongoose.connect(this._connectionString);
        }

        return this._connection;
    }

    public dispose() {
        if(this._connection) {
            this._connection.disconnect(function(err) {
                console.log(`Error occurred while trying to disconnect from mongodb ${err}`);
            });
        }
    }

    public createTodo(todo: ITodo) {
        this._ensureConnected();
        return this._todoModel.create({
            text: todo.text,
            done: todo.done
        });
    }

    public getTodos() {
        this._ensureConnected();
        return this._todoModel.find();
    }
}