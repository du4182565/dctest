document.write("hello");
var Student = {
	name:'Robot',
	height: 1.2,
	run : function(){
		alert(this.name + ' is running...');
	}
};

var xiaoming={
	name:'小明'
};

xiaoming.__proto__=Student;

xiaoming.name;
xiaoming.run();
