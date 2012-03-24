describe("undoable", function () {
    var undoable;

    var doAction;
    var undoAction;

    var result = 0;

    beforeEach(function () {
        result = 0;
        undoable = new Undoable();
        doAction = function () {
            result += 42;
        };
        undoAction = function () {
            result -= 42;
        };
    });

    describe("when only one undo action has been added", function () {
        it("should be able to undo", function () {
            undoable.add(undoAction);
            expect(undoable).canBeUndone(true);
        });
        it("should be not able to redo", function () {
            undoable.add(undoAction);
            expect(undoable).canBeRedone(false);
        });
        it("result should be zero after undoing", function () {
            doAction();
            undoable.add(undoAction);
            undoable.undo();

            expect(result).toEqual(0);
        });
    });

    describe("when only one undo & one redo actions have been added", function () {
        it("should be able to redo after undoing", function () {
            doAction();
            undoable.add(undoAction, doAction);
            undoable.undo();

            expect(undoable).canBeRedone(true);
        });
        it("should be not able to undo after undoing", function () {
            doAction();

            undoable.add(undoAction, doAction);
            undoable.undo();

            expect(undoable).canBeUndone(false);
        });
        it("result should be 42 after undoing then redoing", function () {
            doAction();
            undoable.add(undoAction, doAction);
            undoable.undo();
            undoable.redo();

            expect(result).toEqual(42);
        });
    });

    describe("when multiple undo & one redo actions have been added", function () {
        it("should be able to redo after undoing", function () {
            for (i = 0; i <= 5; i++) {
                doAction();
                undoable.add(undoAction, doAction);
            }
            undoable.undo();

            expect(undoable).canBeRedone(true);
        });
        it("should be able to undo after undoing", function () {
            for (i = 0; i <= 5; i++) {
                doAction();
                undoable.add(undoAction, doAction);
            }
            undoable.undo();

            expect(undoable).canBeUndone(true);
        });
        it("result should be 0 after undoing all actions", function () {
            for (i = 0; i <= 4; i++) {
                doAction();
                undoable.add(undoAction, doAction);
            }
            while (undoable.canUndo()) {
                undoable.undo();
            }

            expect(result).toEqual(0);
        });
        it("result should be 210 after redoing all actions", function () {
            for (i = 0; i <= 4; i++) {
                doAction();
                undoable.add(undoAction, doAction);
            }
            while (undoable.canUndo()) {
                undoable.undo();
            }
            while (undoable.canRedo()) {
                undoable.redo();
            }

            expect(result).toEqual(210);
        });
    });

    //throw exception if undo action is undefined
    describe("#resume", function () {
        it("should throw an exception if undo is undefined", function () {

            expect(function () {
                undoable.add();
            }).toThrow("undo is undefined");
        });
    });
});