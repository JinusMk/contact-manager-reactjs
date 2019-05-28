const person = {
    name: 'Rahul',
    greet: function(){
        return 'Hello my name is ' + this.name
    }
}
console.log(person.greet()) //Helo my name is Rahul

const sayName = person.greet

console.log(sayName()) //Hello my name is undefind

//bind methods help to set the context of this keyword inside a function 
//what gets passed to the bind method, will now become the value of this keyword

console.log(sayName.bind(person)())

function sayHello(){
    return 'Hello my name is '+ this.name
}
console.log(sayHello.bind({name:'Akash'})())