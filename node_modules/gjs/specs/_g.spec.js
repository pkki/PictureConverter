var g    = require('../g');

describe('Number suit', function() {
    var s = [],
        to_a = function(e) {
            s.push(e);
        };

    beforeEach(function() {
        s.length = 0;
    });

    it('should be empty', function() {
        g.from(0).to(0).excluded()._do(to_a);
        expect(s).toEqual([]);
    });

    it('should be 0', function() {
        g.from(0).to(0)._do(to_a);
        expect(s).toEqual([0]);
    });

    it('should be 1 to 5', function() {
        g.from(1).to(5)._do(to_a);
        expect(s).toEqual([1,2,3,4,5]);
    });

    it('should be 1 to 4', function() {
        g.from(1).to(5).excluded()._do(to_a);
        expect(s).toEqual([1,2,3,4]);
    });

    it('should do nothing if the step is null', function() {
        g.from(1).to(42).by(0)._do(to_a);
        expect(s).toEqual([]);
    });

    it('should be 1,3', function() {
        g.from(1).to(4).by(2)._do(to_a);
        expect(s).toEqual([1,3]);
    });

    it('should be 1,3,5', function() {
        g.from(1).to(5).by(2)._do(to_a);
        expect(s).toEqual([1,3,5]);
    });

    it('should be 1,3,5 (without 6)', function() {
        g.from(1).to(6).by(2)._do(to_a);
        expect(s).toEqual([1,3,5]);
    });

    it('should be 1,3,5 (without 7)', function() {
        g.from(1).to(7).excluded().by(2)._do(to_a);
        expect(s).toEqual([1,3,5]);
    });

    it('should be 42', function() {
        g.from(42).to(52).by(11)._do(to_a);
        expect(s).toEqual([42]);
    });

    it('should be 3,2,1', function() {
        g.from(3).to(1).by(-1)._do(to_a);
        expect(s).toEqual([3,2,1]);
    });

    it('should be 1,0', function() {
        g.from(1).to(0).by(-1)._do(to_a);
        expect(s).toEqual([1,0]);
    });

    it('should be 1', function() {
        g.from(1).to(0).excluded().by(-1)._do(to_a);
        expect(s).toEqual([1]);
    });

    it('should be 1,2,1,2', function() {
        g.from(1).to(2)._do(to_a)._do(to_a);
        expect(s).toEqual([1,2,1,2]);
    });
});

describe('Array', function() {
    var s;

    it('should be empty', function() {
        s = g.from(0).to(0).excluded().to_a();
        expect(s).toEqual([]);
    });

    it('should be [0]', function() {
        s = g.from(0).to(0).to_a();
        expect(s).toEqual([0]);
    });

    it('should be [1,2,3,4,5]', function() {
        s = g.from(1).to(5).to_a();
        expect(s).toEqual([1,2,3,4,5]);
    });

    it('should be [1,2,3,4]', function() {
        s = g.from(1).to(5).excluded().to_a();
        expect(s).toEqual([1,2,3,4]);
    });

    it('should be [1,3]', function() {
        s = g.from(1).to(4).by(2).to_a();
        expect(s).toEqual([1,3]);
    });

    it('should be [1,3,5]', function() {
        s = g.from(1).to(5).by(2).to_a();
        expect(s).toEqual([1,3,5]);
    });

    it('should be [1,3,5] (without 6)', function() {
        s = g.from(1).to(6).by(2).to_a();
        expect(s).toEqual([1,3,5]);
    });

    it('should be [1,3,5] (without 7)', function() {
        s = g.from(1).to(7).excluded().by(2).to_a();
        expect(s).toEqual([1,3,5]);
    });

    it('should be [42]', function() {
        s = g.from(42).to(52).by(11).to_a();
        expect(s).toEqual([42]);
    });

    it('should be [3,2,1]', function() {
        s = g.from(3).to(1).by(-1).to_a();
        expect(s).toEqual([3,2,1]);
    });

    it('should be [1,0]', function() {
        s = g.from(1).to(0).by(-1).to_a();
        expect(s).toEqual([1,0]);
    });

    it('should be [1]', function() {
        s = g.from(1).to(0).excluded().by(-1).to_a();
        expect(s).toEqual([1]);
    });

});
