'use script';

/*
ET: 3 часа

AT: Делал в разные дни, суммарно больше трех часов, около 4х
*/

$(document).ready(function(){
  $('[data-toggle="popover"]').popover();
});

let modalAddTask = document.querySelector('#modalAddTask'),
	formAddTask = document.querySelector('#formAddTask'),
	modalEditTask = document.querySelector('#modalEditTask'),
	formEditTask = document.querySelector('#formEditTask'),
	btnRemoveAll = document.querySelector('#btnRemoveAll'),
	modalConfirmDelete = document.querySelector('#modalConfirmDelete'),
	buttonConfirm = document.querySelector('#buttonConfirm');

formAddTask.addEventListener('submit', formAddTaskHandler);
formEditTask.addEventListener('submit', formEditTaskHandler);
btnRemoveAll.addEventListener('click', removeAllHandler);

$(modalAddTask).on('shown.bs.modal', modalAddTaskHandler);
$(modalEditTask).on('shown.bs.modal', modalEditTaskHandler);


for (let key in localStorage) {
	if (localStorage.hasOwnProperty(key)) {
		let task = JSON.parse(localStorage[key]);
		
		addTask(task, key);
	}
}