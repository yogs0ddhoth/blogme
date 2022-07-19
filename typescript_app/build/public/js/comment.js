"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const signupFormHandler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    console.log('test1');
    const comment = document.querySelector('#comment-input').value.trim();
    const id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];
    if (comment && id) {
        console.log('test2');
        const response = yield fetch(`/api/posts/${id}`, {
            method: 'POST',
            body: JSON.stringify({ comment }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace('/dashboard');
        }
        else {
            alert(response.statusText);
        }
    }
});
document
    .querySelector('.comment-form')
    .addEventListener('submit', signupFormHandler);
