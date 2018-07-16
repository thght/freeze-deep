//
// Jasmine tests for freezeDeep
//
const freezeDeep    = require( '../freeze-deep.js' );
const speed         = require( 'speed.js' );

const ID= 'ID';
const ARR= ['ARR'];
let obj= {
    base:{
         id: ID
        ,arr: ARR
        ,func: function(){}
    }
};
obj.base.func.arr= obj;
const MODEL= freezeDeep( obj );



describe("freezeDeep( value )", function() {


    it("the type and values of the output should be equal to the type and values of the input", function(){

        result= freezeDeep()
        expect( result ).toBe( undefined );

        result= freezeDeep( null )
        expect( result ).toBe( null );

        result= freezeDeep( '' )
        expect( result ).toBe( '' );

        result= freezeDeep( 0 )
        expect( result ).toBe( 0 );

        result= freezeDeep( [] )
        expect( result ).toEqual( [] );

        result= freezeDeep( {} )
        expect( result ).toEqual( {} );

        const f= function(){};
        result= freezeDeep( f )
        expect( result ).toEqual( f );

        result= freezeDeep( true )
        expect( result ).toBe( true );

        result= freezeDeep( false )
        expect( typeof result ).toBe( 'boolean' );

        let date= new Date;
        result= freezeDeep( date )
        expect( result ).toBe( date );

        let reg= new RegExp;
        result= freezeDeep( reg )
        expect( result ).toBe( reg );

        result= freezeDeep( Symbol() )
        expect( typeof result ).toBe( 'symbol' );
    });


    it("should not allow a deep property to be modified", function(){
        MODEL.base.id= '?'
        expect( MODEL.base.id ).toBe( ID );
    });


    it("should not allow to add a property to a frozen object", function(){
        MODEL.base.new= '?'
        expect( MODEL.base.hasOwnProperty('new') ).toBe( false );
    });


    it("should not allow to remove a property from a frozen object", function(){
        delete MODEL.base.id
        expect( MODEL.base.id ).toBe( ID );
    });


    it("should not allow to push a value to a frozen array", function(){
        let error= undefined;
        try {
            MODEL.base.arr.push(2)
        } catch (err) {
            error= err;
        }
        expect( error ).not.toBe( undefined );
        expect( MODEL.base.arr ).toEqual( ARR );
    });


    it("should not allow to modify a value in a frozen array", function(){
        MODEL.base.arr[0]= '?'
        expect( MODEL.base.arr ).toEqual( ARR );
    });


    it("should not allow to modify via a referenced object", function(){
        let ref= MODEL;
        ref.base.id= '?';
        expect( ref.base.id ).toBe( ID );
        expect( MODEL.base.id ).toBe( ID );

        ref.base.test= '?';
        expect( ref.base.test ).toBe( undefined );
        expect( MODEL.base.test ).toBe( undefined );

        ref.base.arr[0]= '?';
        expect( ref.base.arr[0] ).toBe( ARR[0] );
        expect( MODEL.base.arr[0] ).toBe( ARR[0] );

        delete ref.base;
        expect( ref.base.id ).toBe( ID );
        expect( MODEL.base.id ).toBe( ID );
    });


    let _FUNC= function(){};
    _FUNC.ID= ID;
    _FUNC.ARR= ARR;
    _FUNC.MODEL= MODEL;
    const FUNC= freezeDeep( _FUNC );

    it("should not allow a function property to be modified regardless of depth", function(){
        FUNC.ID= '?';
        expect( FUNC.ID ).toBe( ID );
        FUNC.ARR[0]= '?';
        expect( FUNC.ARR[0] ).toBe( 'ARR' );
        FUNC.MODEL.base= undefined;
        expect( typeof FUNC.MODEL.base ).toBe( 'object' );
    });


    it("should not allow to add a property to a frozen function", function(){
        FUNC.MODEL.base.new= '?';
        expect( FUNC.MODEL.base.hasOwnProperty('new') ).toBe( false );
    });

    it("should not allow to remove a property from a frozen function", function(){
        delete FUNC.MODEL.base;
        expect( FUNC.MODEL.hasOwnProperty('base') ).toBe( true );
    });

});



speed.run( () => {

    const test= freezeDeep({
        base:{
             id: ID
            ,arr: [0]
            ,deep: {
                id: ID
                ,arr: [{test: [1]}]
                ,func: MODEL
            }
        }
    });

}, 10000, 10 );

