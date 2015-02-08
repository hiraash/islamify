if (!(typeof MochaWeb === 'undefined')){

  MochaWeb.testOnly(function(){
  
    describe("Application level tests", function(){

    	//TODO: MUST BE REMOVED
		it("should disconnect DDP at startup in production", function(){
			setTimeout( function(){
				if( App.isDevelopment() ){
					chai.assert.ok( Meteor.status().connected, "Environment is Dev and DDP is not connected" );
				} else {
					chai.assert.notOk( Meteor.status().connected, "Environment is Live and DDP should not be connected."  );
				}

			}, 1000);
			
		});


    });

  });


}