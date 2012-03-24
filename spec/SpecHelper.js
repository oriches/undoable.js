beforeEach(function () {
    this.addMatchers({
        canBeUndone: function (expected) {
            var undoable = this.actual;
            return undoable.canUndo() === expected;
        }
    });
    this.addMatchers({
        canBeRedone: function (expected) {
            var undoable = this.actual;
            return undoable.canRedo() === expected;
        }
    });
});