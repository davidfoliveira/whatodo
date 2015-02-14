var
    spritz = require('spritz'),
    JSTemplate = require('jstemplate'),
    jst = new JSTemplate({viewDir: 'views'});

// Start (with so many processes as CPU cores)
spritz.start({
    port: 8090,
    processes: 1
});


// Listen on a static route
spritz.on('/',function(req,res){

	return jst.process("index.jst",{sir:process.env.LOGNAME},function(err,output){
		if ( err )
			throw err;

		spritz.text(req,res,output,200,{'content-type':'text/html;charset=utf-8','cache-control':'max-age=3600'});
	});

});

// Set an authentication rule for a specific URL pattern (pattern is optional)
spritz.on('/cache.manifest',function(req,res){
	spritz.staticfile(req,res,"public"+req.url,200,{'content-type':'text/cache-manifest'});
});
