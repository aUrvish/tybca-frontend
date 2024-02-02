import { questions } from './Questions.vue';

export const chandeDragIndex = (e) => {
questions.value[e.oldIndex].dragIndex = e.newIndex;

if (e.oldIndex > e.newIndex) {
console.log('dragUp');
let getDefaultIndex = questions.value;
console.log(getDefaultIndex);
// questions.value[e.oldIndex - 1].dragIndex = e.newIndex + 1
} else {
console.log('dragDown');
let getDefaultIndex = questions.value;
// questions.value[e.oldIndex + 1].dragIndex = e.newIndex - 1 
console.log(getDefaultIndex);
}
};
