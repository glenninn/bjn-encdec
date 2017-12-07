/* DISCLAIMER:
      This reference application is provided for educational purposes only
	  There is no guarantee of consistency with BlueJeans over time.
	  Use at your own risk.
*/
var base32 = require('base32');

if(process.argv.length < 4){
	console.log("Usage: node encdec {e/d} {file}");
	console.log("  BlueJeans encoder/decoder for BJN URI's");
	console.log("Where:");
	console.log("   e/d : encode or decode the specified file (single character 'e' or 'd'");
	console.log("  {file} : is the source file to either encode or decode");
	process.exit();
}

var eOrd = process.argv[2];
var fn = process.argv[3];


var fs = require("fs");

fs.readFile(fn, (err,data)=> {
	if(err) {
		console.log("Error reading file: " + fn +"\n"+err);
		process.exit();
	}
	var sd = data.toString();
	console.log("** Imported data:**\n" + sd);
	console.log("\nvvv------------ " + (eOrd == "e" ? "Encoded" : "Decoded") 
				 + " Results here --------------vvv\n");
	if(eOrd ==="e") {
		var e = "bjn://meeting/" + base32.encode(sd);
		e += "?ctxver=1.0.0";
		console.log(e);
	} else {
		var fields = sd.split("/");
		var enc = fields[3].split("?")[0];
		var d= base32.decode(enc);
		console.log(d);			
	}
});
	
