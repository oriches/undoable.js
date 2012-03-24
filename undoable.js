//     undoable.js 1.0
//     (c) 2012 Ollie Riches
//     undoable.js may be freely distributed under the MIT license.
//     For all details and documentation:
//     https://github.com/oriches/undoable.js/wiki

function Undoable() {

    // Contains the undo-redo pair...
    function memento(undo, redo) {
        this.undo = undo;
        this.redo = redo;
    };
    
    var undoStack = new Array();
    var redoStack = new Array();

    this.clear = function() {
        undoStack = new Array();
        redoStack = new Array();
    };

    this.add = function (undo, redo) {
        if (undo == undefined) {
            throw 'undo is undefined';
        }
        if (redo == undefined) {
            redo = function(){};
        }
        undoStack.push(new memento(undo, redo));
        redoStack = new Array();
    };

    this.canUndo = function() {
        if (undoStack.length != 0) {
            return true;
        }
        return false;
    };

    this.canRedo = function() {
        if (redoStack.length != 0) {
            return true;
        }
        return false;
    };

    this.undo = function() {
        if (undoStack.length == 0) {
            return;
        }

        var current = undoStack.pop();
        current.undo();

        redoStack.push(current);
    };

    this.redo = function() {
        if (redoStack.length == 0) {
            return;
        }

        var current = redoStack.pop();
        current.redo();

        undoStack.push(current);
    };
}