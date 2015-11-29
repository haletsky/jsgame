function main(){
	var sum = "";

	
		sum = intext.value.match(/[0-9]+[\+\-\/\*][0-9]+/);
		intext.value = intext.value.replace(/[0-9]+[\+\-\/\*][0-9]+/,eval(sum.toString()));
	};
}
