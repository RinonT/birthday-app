"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.htmlGenerator = void 0;

var _script = require("../script");

// Generate the html
var htmlGenerator = function htmlGenerator(list) {
  return list.map(function (person) {
    return "\n        <div data-id=\"".concat(person.id, "\" class=\"list_container\">\n        <img class=\"peopleList_image\" src=\"").concat(person.picture, "\" alt=\"").concat(person.firstName, "'s picture\">\n\t     <div class=\"peopleList_info\">\n\t\t<p class=\"peopleList_name\">\n            ").concat(person.firstName, " ").concat(person.lastName, " \n\t\t</p>\n        <span class=\"peopleList_birthday date\">\n        Turns <strong>").concat(person.ages, "</strong> on ").concat(person.date, "\n        </span>\n\t </div>\n\t <div class=\"peopleList_access\">\n         <p class=\"peopleList_numberOfDays days\">\n            ").concat(person.days > 1 ? "In ".concat(person.days) + " days" : person.days == 0 ? "<span class=\"today\"> Today!</span>" : person.days == 1 ? "Tomorrow" : "Invalid", "\n         </p>\n         <div class=\"peopleList_edit\">\n            <div class=\"edit\">\n                <svg class=\"w-6 h-6 edit\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z\"></path></svg>\n            </div>\n            <div data-id=\"").concat(person.id, "\" class=\"delete\"> \n                <svg class=\"w-6 h-6 delete_btn\"  fill=\"none\" stroke=\"#EF4565\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z\"></path></svg>\n            </div>\n\t\t </div>\n\t </div>\n     </div>");
  }).join("");
};

exports.htmlGenerator = htmlGenerator;