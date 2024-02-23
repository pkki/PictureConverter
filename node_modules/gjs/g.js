;(function(){

var from = function( f ) {
        return {

            to: function( t ) {
                var s    = 1, // default step
                    incl = true;

                return {
                    by: function( step ) { s = step; return this; },
                    excluded: function() { incl=false; return this; },

                    _do: function( fn ) {

                        for (i=f; (s>0) ? i < t : i > t ; i+=s) {
                            fn.call( this, i );
                        }
                        if ( incl && i == t ) { fn.call(this, i); }
                        return this;
                    },

                    to_a: function() {
                        var a=[];
                        this._do(function( e ){
                            a.push( e );
                        });
                        return a;
                    }
                };
            }
        };
}

if ( typeof exports === 'object' ) {
    exports.from = from;
}
else if ( typeof window === 'object' ) {
    window.g = { from: from };
}

})();
