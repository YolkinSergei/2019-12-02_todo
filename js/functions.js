'use strict';

function addTask(newTask, id) {
	let taskElement = document.createElement('li');
	taskElement.classList.add('list-group-item');
	taskElement.setAttribute('id', 'item-' + id );
	taskElement.innerText = newTask.title;

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