var put = document.getElementsByClassName("put");

// Put
//buttons
Array.from(put).forEach(function(element) {
      element.addEventListener('click', function(){
        let name = todoList.name
        console.log("name", name);

        //targeting array of list items
        let list = todoList.list
        //classList property returns the class name(s) of an element as a DOM object
        // This property is useful to add, remove and toggle CSS classes on an element
        if (this.classList.contains("add")) {
          let item = document.querySelector('#item').value;
          list.push(item)
        } else if(this.classList.contains("remove")) {
          //creates an array of all elements with the class name completed
          let completedElements = document.getElementsByClassName('completed')
          // mapping through the completedElements array and getting the text content of the element node
          // completedElements is a nodeList of elements with the class .completed. nodeList is weird to work with so we do Array.from(completedElements) to turn it into an array. Finally, we use the map function to extract the textContent and put it into an array as completedItems
          // Array.from turns a nodeList (elements in the DOM are nodes ex. list/span) into an array
          let completedItems = Array.from(completedElements).map(element => element.textContent)
          // take items from list and filter through the completed items
          // If it's not in completedItems then it stays in the list
          list = list.filter( ( el ) => !completedItems.includes( el ) )
        } else if(this.classList.contains("clear")) {
          list = []
        }
        console.log("list", list);
         // Add to List
        fetch('setList', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'name': name,
            'list': list
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});

var list = document.querySelector('#list')

list.addEventListener('click', function(event) {
  // checks to see if the thing being clicked is an li
  if (event.target.tagName === 'LI') {
    //toggles the class name of completed on and off li
    event.target.classList.toggle('completed');
  }
}, false);
