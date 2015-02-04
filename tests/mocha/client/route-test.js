if (!(typeof MochaWeb === 'undefined')){

  MochaWeb.testOnly(function(){
  
    describe("Routing related tests", function(){

      it("should route to <recent> at startup", function(){
      	setTimeout(function(){
      		chai.expect( Router.current().name ).to.equal('recent');
      	}, 300);
        
      });



    });

  });


}
