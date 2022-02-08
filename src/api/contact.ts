import { Item } from '@/App.types';

/*
For communication with the API, I would create a service
that handles all requests, in this service I would
create a function or method for every request and use
this function in the application where needed.

Depending on the structure of the application I would
go with fully functional programming or classes. I
prefer going with a functional design since this feels
better in a javascript application where classes are
converted to functions when compiled.
*/

export const sendContactEmail = (item: Item): void => {
  console.log(`E-mail ${item.name}`);
};

export const sendContactSMS = (item: Item): void => {
  console.log(`SMS ${item.name}`);
};

export const sendContactPhone = (item: Item): void => {
  console.log(`Phone ${item.name}`);
};
