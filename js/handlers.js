'use strict';

function formAddTaskHandler(event) {
	event.preventDefault();

	let elements = this.elements;
	
	let newTask = {
		title: elements.title.value,
		date: elements.date.value,
		description: elements.description.value,
		status: 1 // 1 - todo, 2 - in progress, 3 - done
	};

	if (!newTask.title) {
		elements.title.parentNode.classList.add('has-error');

		return;
	}

	let id = new Date().getTime();

	localStorage.setItem(id, JSON.stringify(newTask));

	addTask(newTask, id);

	$(modalAddTask).modal('hide');

	this.reset();
}

function formEditTaskHandler(event) {
	event.preventDefault();

	let elements = this.elements,
		taskId = elements.id.value,
		taskObject = {
			title: elements.title.value,
			date: elements.date.value,
			description: elements.description.value,
			status: +elements.status.value
		},
		taskElement = document.querySelector(`[data-id="${taskId}"]`);

	if (!taskObject.title) {
		elements.title.parentNode.classList.add('has-error');

		return;
	}

	localStorage.setItem(taskId, JSON.stringify(taskObject));

	taskElement.parentNode.removeChild(taskElement);

	addTask(taskObject, taskId);

	$(modalEditTask).modal('hide');

	this.reset();
}

function removeAllHandler(event) {
	for (let key in localStorage) {
		if (localStorage.hasOwnProperty(key)) {
			let taskItem = document.querySelector(`[data-id="${key}"]`);

			if (taskItem) taskItem.parentElement.removeChild(taskItem);

			delete localStorage[key];
		}
	}

	calculateTaskCount();
}

function deleteButtonHandler(event) {
	$(modalConfirmDelete).modal('show');

	buttonConfirm.addEventListener('click', () => {
		let taskElement = this.parentNode.parentNode,
			taskId = taskElement.dataset.id;

		localStorage.removeItem(taskId);
		taskElement.parentNode.removeChild(taskElement);

		$(modalConfirmDelete).modal('hide');
	}, {
		once: true
	});
}

function editButtonHandler(event) {
	let taskElement = this.parentNode.parentNode,
		taskId = taskElement.dataset.id,
		task = JSON.parse(localStorage.getItem(taskId));

	formEditTask.reset();

	for (let key in task) {
		if (formEditTask.elements[key]) {
			formEditTask.elements[key].value = task[key];
		}
	}

	document.querySelector('[name="id"]').value = taskId;

	$(modalEditTask).modal('show');
}

function modalAddTaskHandler(event) {
	formAddTask.elements.title.parentNode.classList.remove('has-error');
	formAddTask.elements.title.focus();
}

function modalEditTaskHandler(event) {
	formEditTask.elements.title.parentNode.classList.remove('has-error');
	formEditTask.elements.title.focus();
}