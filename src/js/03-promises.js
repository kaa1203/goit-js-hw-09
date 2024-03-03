import { Notify } from "notiflix/build/notiflix-notify-aio";

const refs = {
  form: document.querySelector(".form"),
  delay: document.querySelector("input[name='delay']"),
  step: document.querySelector("input[name='step']"),
  amount: document.querySelector("input[name='amount']"),
}

const { form, delay, step, amount } = refs;

form.addEventListener("submit", onSubmit);

function onSubmit(e) {
  e.preventDefault();
  const amountValue = amount.value;
  let delayValue = parseInt(delay.value);

  for (let positionValue = 1; positionValue <= amountValue; positionValue++) {
    createPromise(positionValue, delayValue)
      .then(({ position, delay }) => {
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`)
    })
      .catch(({ position, delay }) => {
        Notify.failure(`Rejected promise ${position} in ${delay}ms`)
      });
    delayValue += parseInt(step.value);
  }

}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}