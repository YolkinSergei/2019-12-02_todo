'use strict';

function addTask(newTask, id) {
	let taskElement = document.createElement('li');
	taskElement.classList.add('list-group-item');
	taskElement.setAttribute('data-id', id );

	taskElement.innerHTML = newTask.title;

	let infoContainer = document.createElement('div'),
		dl = document.createElement('dl'),
		dt = document.createElement('dt'),
		dd = document.createElement('dd');

	dt.innerText = newTask.date || 'No date';
	dd.innerText = newTask.description || 'No description';
	dl.appendChild(dt);
	dl.appendChild(dd);
	infoContainer.appendChild(dl);

	infoContainer.classList.add('collapse', 'container');
	infoContainer.setAttribute('id', 'info' + id);

	let buttons = {
		container: document.createElement('div'),
		showInfo: document.createElement('button'),
		edit: document.createElement('button'),
		delete: document.createElement('button')
	};

	buttons.showInfo.classList.add('btn', 'btn-primary', 'btn-showinfo', 'btn-xs');
	buttons.showInfo.innerHTML = '<i class="glyphicon glyphicon-eye-open"></i>';
	buttons.showInfo.setAttribute('data-toggle', 'collapse');
	buttons.showInfo.setAttribute('data-target', '#info' + id);

	buttons.edit.classList.add('btn', 'btn-warning', 'btn-edit', 'btn-xs');
	buttons.edit.innerHTML = '<i class="glyphicon glyphicon-pencil"></i>';
	buttons.edit.addEventListener('click', editButtonHandler);

	buttons.delete.classList.add('btn', 'btn-danger', 'btn-delete', 'btn-xs');
	buttons.delete.innerHTML = '<i class="glyphicon glyphicon-trash"></i>';
	buttons.delete.addEventListener('click', deleteButtonHandler);

	buttons.container.classList.add('pull-right', 'btn-container');

	buttons.container.appendChild(buttons.showInfo);
	buttons.container.appendChild(buttons.edit);
	buttons.container.appendChild(buttons.delete);

	taskElement.appendChild(buttons.container);

	taskElement.appendChild(infoContainer);

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