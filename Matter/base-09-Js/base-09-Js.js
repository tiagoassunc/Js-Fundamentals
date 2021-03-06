//// ASYNCHROUNOUS JAVASCRIPT: PROMISES, ASYNC/AWAIT, AND AJAX ////
'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

const renderCountry = function (data, className = '') {
  const html = `
    <article class="country ${className}">
      <img class="country__img" src="${data.flag}" />
      <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)} people</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
      </div>
    </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};

///////////////////////////////////////

/* // Our First AJAX Call: XMLHttpRequest
const getCountryDate = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
  request.send();
  // console.log(request.responseText); // Do not work cause load are not complete

  request.addEventListener('load', function () {
    // console.log(this.responseText); // Data as string => JSON

    const [data] = JSON.parse(this.responseText); // data = JSON.parse(this.responseText)[0]
    console.log(data);

    const html = `
    <article class="country">
      <img class="country__img" src="${data.flag}" />
      <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)} people</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
      </div>
    </article>
  `;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};

getCountryDate('brasil');
getCountryDate('usa');
getCountryDate('portugal');
getCountryDate('india');
getCountryDate('japan');
getCountryDate('britain');
getCountryDate('congo');
getCountryDate('mexico');
getCountryDate('germany');
 */

// Welcome to Callback Hell

/*
const getCountryAndNeighbour = function (country) {
  // AJAX call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    // Render Country 1
    renderCountry(data);

    // Get neibhour country 2
    const [neighbour] = data.borders;

    if (!neighbour) return;

    // AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.eu/rest/v2/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);
      console.log(data2);

      renderCountry(data2, 'neighbour');
    });
  });
};
// getCountryAndNeighbour('brasil');
getCountryAndNeighbour('congo');

setTimeout(() => {
  console.log('1 second passed');
  setTimeout(() => {
    console.log('2 second passed');
    setTimeout(() => {
      console.log('3 second passed');
      setTimeout(() => {
        console.log('4 second passed');
        setTimeout(() => {
          console.log('5 second passed');
        }, 1000);
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000); */

// Promises and the Fetch API
// Consuming Promises

// const getCountryData = function (country) {
//   fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

// Throwing Errors Manually
/* const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(
    response => {
      console.log(response);
      if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
      return response.json();
    }
    // error => alert(error)
  );
}; */

/* // Handling Rejected Promises
const getCountryData = function (country) {
  // Country 1
  fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then(
      response => {
        console.log(response);
        if (!response.ok)
          throw new Error(`Country not found (${response.status})`);
        return response.json();
      }
      // error => alert(error)
    )
    .then(data => {
      renderCountry(data[0]);
      // const neighbour = data[0].borders[0];
      const neighbour = 'dsbjc';
      if (!neighbour) return;

      // Country 2
      return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`Country not found (${response.status})`);
      response.json();
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(`${err} 💥💥💥`);
      renderError(`Something went wrong 💥💥💥 ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData('congo');
});
// getCountryData('dsfsd'); */

/* const getCountryData = function (country) {
  // Country 1
  getJSON(
    `https://restcountries.eu/rest/v2/name/${country}`,
    'Country not found'
  )
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];

      if (!neighbour) throw new Error('No neighbour found');

      // Country 2
      return getJSON(
        `https://restcountries.eu/rest/v2/alpha/${neighbour}`,
        'Country not found'
      );
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(`${err} 💥💥💥`);
      renderError(`Something went wrong 💥💥💥 ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData('congo');
});
getCountryData('australia'); */

///// The Event Loop in Practice /////
/* console.log('Test start');
setTimeout(() => console.log('0 sec timer'), 0);
Promise.resolve('Resolved promise 1').then(res => console.log(res));
Promise.resolve('Resolved promise 2').then(res => {
  for (let i = 0; i < 1000000000; i++) {}
  console.log(res);
});
console.log('Test end'); */

///// Building a Simple Promise /////
/* // Executer function called by promise constructor => passes resolve for then result or reject for reject state
const loterryPromise = new Promise(function (resolve, reject) {
  console.log('Lotter draw is happening 🔮');
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('You WIN ✨🎫'); // Promise fullfield => avaible on the then handle
    } else {
      reject(new Error('You lost your money 💩'));
    }
  }, 2000);
});

loterryPromise.then(res => console.log(res)).catch(err => console.error(err));

// Promisifying setTimeout => creating a function that return a promise
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};
wait(1)
  .then(() => {
    console.log('1 seconds passed');
    return wait(2);
  })
  .then(() => {
    console.log('2 seconds passed');
    return wait(3);
  })
  .then(() => {
    console.log('3 seconds passed');
    return wait(4);
  })
  .then(() => console.log('4 seconds passed')); // Iqual ⬇

// setTimeout(() => {
//   console.log('1 second passed');
//   setTimeout(() => {
//     console.log('2 second passed');
//     setTimeout(() => {
//       console.log('3 second passed');
//       setTimeout(() => {
//         console.log('4 second passed');
//         setTimeout(() => {
//           console.log('5 second passed');
//         }, 1000);
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

// Creating easy a fulfilled or a reject promise immediatly
Promise.resolve('abc').then(x => console.log(x));
Promise.reject(new Error('Problem!')).catch(x => console.error(x)); */

/* ///// Promisifying the Geolocation API /////

// navigator.geolocation.getCurrentPosition(
//   position => console.log(position),
//   err => console.log(err)
// );
// console.log('Getting psition');

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
// getPosition().then(pos => console.log(pos));

const whereAmI = function () {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;
      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    })
    .then(res => {
      if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
      return res.json();
    })
    .then(data => {
      console.log(`You are in ${data.city}, ${data.country}.`);
      return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
    })
    .then(res => {
      return res.json();
    })
    .then(data => {
      renderCountry(data[0]);
      countriesContainer.style.opacity = 1;
    })
    .catch(err => {
      console.error(`Something went wrong! :( ${err.message} 💥💥💥`);
    });
};

btn.addEventListener('click', whereAmI); */

/* ///// Consuming Promises with Async/Await /////

// fetch(`https://restcountries.eu/rest/v2/name/${country}`).then(res => res.json).then(data => ...) = ⬇

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function (country) {
  try {
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    // Reverse geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    if (!resGeo.ok) throw new Error('Problem getting location data');
    const dataGeo = await resGeo.json();

    // Country data
    const res = await fetch(
      `https://restcountries.eu/rest/v2/name/${dataGeo.country}`
    );
    if (!res.ok) throw new Error('Problem getting location country');
    const data = await res.json();
    renderCountry(data[0]);

    return `You are in ${dataGeo.city} ${dataGeo.country}`;
  } catch (err) {
    console.error(`${err} 💥`);
    renderError(`💥 ${err.message} 💥`);

    // Reject promise returned from async function
    throw err;
  }
};

//// Returning Values from Async Functions ////

console.log('1: Will getlocation');
// const city = whereAmI();
// console.log(city);

// whereAmI()
//   .then(city => console.log(`2: ${city}`))
//   .catch(err => console.error(`2: 💥 ${err.message} 💥`))
//   .finally(() => console.log('3: Finished getting location'));

(async function () {
  try {
    const cityMsg = await whereAmI();
    console.log(`2: ${cityMsg}`);
    if (!cityMsg) throw new Error('Problem getting location data');
  } catch (err) {
    console.error(`2: 💥 ${err.message} 💥`);
  }
  console.log('3: Finished getting location');
})(); */

//// Running Promises in Parallel ////
/* const get3Countries = async function (c1, c2, c3) {
  try {
    // const [data1] = await getJSON(
    //   `https://restcountries.eu/rest/v2/name/${c1}`
    // );
    // const [data2] = await getJSON(
    //   `https://restcountries.eu/rest/v2/name/${c2}`
    // );
    // const [data3] = await getJSON(
    //   `https://restcountries.eu/rest/v2/name/${c3}`
    // );

    const data = await Promise.all([
      getJSON(`https://restcountries.eu/rest/v2/name/${c1}`),
      getJSON(`https://restcountries.eu/rest/v2/name/${c2}`),
      getJSON(`https://restcountries.eu/rest/v2/name/${c3}`),
    ]);
    console.log(data.map(d => d[0].capital));
  } catch (err) {
    console.log(err);
  }
};
get3Countries('portugal', 'canada', 'tanzania'); */

//// Other Promise Combinators: race, allSettled and any ////

// Promise.race => the fullfield answer is the first response, fulfielld or reject
(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.eu/rest/v2/name/italy`),
    getJSON(`https://restcountries.eu/rest/v2/name/egypt`),
    getJSON(`https://restcountries.eu/rest/v2/name/mexico`),
  ]);
  console.log(res[0]);
})();

// Set a time to promise fulfilled else reject
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('Request took too long!'));
    }, s * 1000);
  });
};
Promise.race([
  getJSON(`https://restcountries.eu/rest/v2/name/tanzania`),
  timeout(5),
])
  .then(res => console.log(res[0]))
  .catch(err => console.error(err));

// Promise.allSettled => return all the results off all promises

Promise.allSettled([
  Promise.resolve('Success'),
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Success'),
]).then(res => console.log(res));

// !=

Promise.all([
  Promise.resolve('Success'),
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

// Promise.any [ES2021] => return just the first fulfielld

Promise.any([
  Promise.resolve('Success 1'),
  Promise.resolve('Success 2'),
  Promise.reject('Error'),
  Promise.resolve('Success 3'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));
