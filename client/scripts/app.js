var organizeByTags = function(toDoObjects) {
	var tags = [];
	toDoObjects.forEach(function(song) {
		song.tags.forEach(function(tag) {
			if(tags.indexOf(tag) === -1) {
				tags.push(tag);
			};
		});
	});

	var tagObjects = tags.map(function(tag) {
		var taggedTasks = [];

		toDoObjects.forEach(function(song) {
			if(song.tags.indexOf(tag) !== -1) {
				taggedTasks.push(song.text);
			}
		});
		return {"name" : tag, "tasks": taggedTasks};
	});

	return tagObjects;
};

var main = function (toDoObjects) {
	"use strict";
	
	var $taskInputField = $("<input>"),
	$tagsInputField = $("<input>"),
	$submitButton = $("<button>").text("F*ck Yeah!");
	

	var tasksList = toDoObjects.map(function(obj) {
		return obj.text;
	});

	$("main .container .tabs a span").toArray().forEach(function (element) {
		$(element).on("click", function() {

			var $element = $(element),
			$tasks;

			$("main .container .tabs span").removeClass("active");
			$element.addClass("active");
			$("main .container .tasks-list").empty();
			if ($element.parent().is(":nth-child(1)")) {
				var tasksList = toDoObjects.map(function(obj) {
					return obj.text;
				});
				$tasks = $("<ul>");
				for(var i = tasksList.length - 1; i >= 0; i = i - 1)
				{
					$tasks.append($("<li>").text(tasksList[i]));
				}
				$("main .tasks-list").append($tasks);				
			} else if ($element.parent().is(":nth-child(2)")) {
				var tasksList = toDoObjects.map(function(obj) {
					return obj.text;
				});
				$tasks = $("<ul>");
				tasksList.forEach(function(currentTask) {
					$tasks.append($("<li>").text(currentTask));
				});
				$("main .container .tasks-list").append($tasks);
			} else if ($element.parent().is(":nth-child(3)")) {
				
				var	taggedTasksList = organizeByTags(toDoObjects);
				console.log(taggedTasksList);

				taggedTasksList.forEach(function(tag) {
					var $tagName = $("<h3>").text(tag.name),
					$content = $("<ul>");
					tag.tasks.forEach(function(taskDescription) {
						var $singelTask = $("<li>").text(taskDescription);
						$content.append($singelTask); 
					});
					$("main .container .tasks-list").append($tagName);
					$("main .container .tasks-list").append($content);
				});
			} 
			else if ($element.parent().is(":nth-child(4)")) {
				$("main .container .tasks-list").append($("<p>").text("Task description"));
				$("main .container .tasks-list").append($taskInputField);

				$("main .container .tasks-list").append($("<p>").text("Tags"));
				$("main .container .tasks-list").append($tagsInputField);

				$("main .container .tasks-list").append($submitButton);

				$("main .container .tasks-list button").on("click", function() {
					var taskText = $taskInputField.val(),
					tagsText = $tagsInputField.val().split(", ");
					if((taskText !== "") && (tagsText !== "")) {
						toDoObjects.push({"text":taskText, "tags":tagsText});
						var tasksList = toDoObjects.map(function(obj) {
							return obj.text;
						});
					};
					$taskInputField.val("");
					$tagsInputField.val("");


				});
			}
			return false;
		});
	});
	$("main .container .tabs a:first-child span").trigger("click");
};

$(document).ready(function() {
	$.getJSON("todos.json", function (toDoObjects) {
		console.log(toDoObjects);
		main(toDoObjects);
	});
});