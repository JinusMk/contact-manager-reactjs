const person = {
    name: 'Athul',
    skills: ['js', 'py', 'c'],
    //inside a method the value of this will still refer to the current object
    detailsWithOutBind: function(){
       this.skills.forEach(function(skill) {
           console.log(`${this.name} knows ${skill}`)
       })
      },
    detailsWithBind: function(){
        this.skills.forEach(function(skill){
            console.log(`${this.name} knows ${skilll}`)
        }).bind(this)
    },
//inside a method, if there is a function, inside that function,value of this is the global object not the current object
profile: function(){
    function someFunction(){
        console.log(this.name)
    }
    someFunction()
    return this
 }
}


//inside a method, if there is an arrow function,inside that function, value of this will still be the current object, ie,no need of using the bind method
