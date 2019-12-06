'use strict';

function addTask(newTask, id) {
	let taskElement = document.createElement('li');
	taskElement.classList.add('list-group-item');
	taskElement.setAttribute('data-id', id );
	taskElement.innerText = newTask.title;

	let buttons = {
		container: document.createElement('div'),
		edit: document.createElement('button'),
		delete: document.createElement('button')
	};

	buttons.edit.classList.add('btn', 'btn-warning', 'btn-edit', 'btn-xs');
	buttons.edit.innerHTML = '<i class="glyphicon glyphicon-pencil"></i>';
	buttons.edit.addEventListener('click', editButtonHandler);

	buttons.delete.classList.add('btn', 'btn-danger', 'btn-delete', 'btn-xs');
	buttons.delete.innerHTML = '<i class="glyphicon glyphicon-trash"></i>';
	buttons.delete.addEventListener('click', deleteButtonHandler);

	buttons.container.classList.add('pull-right', 'btn-container');

	buttons.container.appendChild(buttons.edit);
	buttons.container.appendChild(buttons.delete);

	taskElement.appendChild(buttons.container);

	let taskContainer = document.querySelector(`[data-status="${newTask.status}"]`);
	taskContainer.appendChild(taskElement);	

	calculateTaskCount();
}

function calculateTaskCount() {
	let taskCounts = {
		1: 0,
		2: 0,
		3: 0
	};
	
	for (let key in localStorage) {
		if (localStorage.hasOwnProperty(key)) {
			let task = JSON.parse(localStorage[key]);

			taskCounts[task.status]++;
		}
	}

	for (let key in taskCounts) {
		let taskCounter = document.querySelector(`[data-count-status="${key}"]`);

		if (taskCounter) taskCounter.innerText = taskCounts[key];
	}
}