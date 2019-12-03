'use strict';

function formAddTaskHandler(event) {
	event.preventDefault();

	let value = this.elements.title.value;
	
	let newTask = {
		title: value,
		status: 1 // 1 - todo, 2 - in progress, 3 - done
	};

	let id = new Date().getTime();

	localStorage.setItem(id, JSON.stringify(newTask));

	addTask(newTask, id);

	$(modalAddTask).modal('hide');

	this.reset();
}

function removeAllHandler(event) {
	for (let key in localStorage) {
		if (localStorage.hasOwnProperty(key)) {
			let taskItem = document.querySelector('#item-' + key);

			if (taskItem) taskItem.parentElement.removeChild(taskItem);

			delete localStorage[key];
		}
	}

	calculateTaskCount();
}