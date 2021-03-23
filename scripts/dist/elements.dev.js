"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.endpoint = exports.body = exports.selectByMonth = exports.filterByNameInput = exports.filterForm = exports.addList = exports.listContainer = exports.table = void 0;
// Grab all the necesssary elements
var table = document.querySelector(".peopleList_container");
exports.table = table;
var listContainer = document.querySelector(".contents_container");
exports.listContainer = listContainer;
var addList = document.querySelector(".add_list");
exports.addList = addList;
var filterForm = document.querySelector(".filter_list_container");
exports.filterForm = filterForm;
var filterByNameInput = document.querySelector("#filterByName");
exports.filterByNameInput = filterByNameInput;
var selectByMonth = document.querySelector("#select_month"); //  export const resetFilterButton = document.querySelector('#reset_filter');

exports.selectByMonth = selectByMonth;
var body = document.querySelector("body"); // Importing the data

exports.body = body;
var endpoint = "./people.json";
exports.endpoint = endpoint;