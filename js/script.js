'use script';

/*
ET: 3 часа

AT: 2 часа 26 мин
*/

let modalAddTask = document.querySelector('#modalAddTask'),
	formAddTask = document.querySelector('#formAddTask'),
	btnRemoveAll = document.querySelector('#btnRemoveAll');

formAddTask.addEventListener('submit', formAddTaskHandler);

btnRemoveAll.addEventListener('click', removeAllHandler);

for (let key in localStorage) {
	if (localStorage.hasOwnProperty(key)) {
		let task = JSON.parse(localStorage[key]);
		
		addTask(task, key);
	}
}