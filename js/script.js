'use script';

let modalAddTask = document.querySelector('#modalAddTask'),
	formAddTask = document.querySelector('#formAddTask');

formAddTask.addEventListener('submit', formAddTaskHandler);

for (let key in localStorage) {
	if (localStorage.hasOwnProperty(key)) {
		let task = JSON.parse(localStorage[key]);
		
		addTask(task, key);
	}

}