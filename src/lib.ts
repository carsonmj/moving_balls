export const getElement = (selector: string): HTMLInputElement => {
  if (!selector) {
    throw new Error("Parameter is not valid in getElement function. Should pass selector.");
  }

  const element: HTMLInputElement | null = document.querySelector(selector);

  if (!element) {
    throw new Error("Element does not exist.");
  }

  return element;
};

export const setEventListener = (event: string, func: () => any): void => {
  if (!event) {
    throw new Error("First parameter is not valid in setEventListener function. Should pass event name.");
  }

  if (typeof func !== "function") {
    throw new Error("Second parameter should be function.");
  }

  document.addEventListener(event, func);
};

export const getRandomNumber = ([low, high]: number[]): number => {
  return Math.floor(Math.random() * (high - low) + low);
};
