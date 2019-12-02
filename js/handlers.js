'use strict';

function formAddTaskHandler(event) {
	event.preventDefault();

	let value = this.elements.title.value;
	
	let newTask = {
		title: value,
		status: 1 // 1 - todo, 2 - in progress, 3 - done
	};

	let id = new Date().getTime();

	addTask(newTask, id);

	localStorage.setItem(id, JSON.stringify(newTask));

	$(modalAddTask).modal('hide');

	this.reset();
}