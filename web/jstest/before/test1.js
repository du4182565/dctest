function createPerson(name,age,job){ 
	var o = { 
		name : name, 
		age : age, 
		job : job, 
		sayName : function(){ 
		alert(this.name + "run"); 
		} 
	}; 
	return o; 
} 


var tanya = createPerson("tanya","30","female"); 
var ansel = createPerson("ansel","30","male"); 
tanya.sayName(); 
ansel.sayName();