import chai from "chai";
import { describe } from "mocha";
import sinon from "sinon";
import Todo from "../src/models/Todo";
import todoService from '../src/services/index'
const expect = chai.expect;

describe('Todos', function() {
    const stubValue = {
        label: "Test Label",
        completed: true,
        createdAt: new Date().toISOString()
    };

    describe('create', function() {
        it('should add a new todo to the db', async function() {
            const stub = sinon.stub(todoService, 'createTodo');
            stub.callsFake(function(item) {
            })
        })
    })
});