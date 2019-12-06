'use strict';

function formAddTaskHandler(event) {
	event.preventDefault();

	let value = this.elements.title.value;
	
	let newTask = {
		title: value,
		status: 1 // 1 - todo, 2 - in progress, 3 - done
	};

	if (!newTask.title) {
		this.elements.title.parentNode.classList.add('has-error');

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

	let taskId = this.elements.id.value,
		taskObject = {
			title: this.elements.title.value,
			status: +this.elements.status.value
		},
		taskElement = document.querySelector(`[data-id="${taskId}"]`);

	if (!taskObject.title) {
		this.elements.title.parentNode.classList.add('has-error');

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
	});
}

function editButtonHandler(event) {
	let taskElement = this.parentNode.parentNode,
		taskId = taskElement.dataset.id,
		task = JSON.parse(localStorage.getItem(taskId));

	for (let key in task) {
		formEditTask.elements[key].value = task[key];
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
/*
function buttonConfirmHandler() {
	$(modalConfirmDelete).modal('show');

}*/