'use strict';

function addTask(newTask, id) {
	let taskElement = document.createElement('li');
	taskElement.classList.add('list-group-item');
	taskElement.innerText = newTask.title;

	let taskContainer = document.querySelector(`[data-status="${newTask.status}"]`);
	taskContainer.appendChild(taskElement);	
}