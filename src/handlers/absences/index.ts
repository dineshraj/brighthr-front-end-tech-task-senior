const names = [
  {
    firstName: 'Jabez',
    lastName: 'Nasser',
    id: '24a9352b-cf35-4e00-b4c9-403546d7bea8',
  },
  {
    firstName: 'Isla',
    lastName: 'Watts',
    id: '08335a8f-1b4f-4d9b-82a8-46fa20d48f2d',
  },
  {
    firstName: 'Malaysia',
    lastName: 'Krueger',
    id: 'f1128070-8fc9-4ccb-8657-f5e1c7cacad9',
  },
  {
    firstName: 'Kylei',
    lastName: 'Castanon',
    id: '8d0593d5-de4a-48c9-afa5-55127c0d349d',
  },
  {
    firstName: 'Rheagan',
    lastName: 'Hartfield',
    id: '59f7f608-05ad-4160-84b4-56800acfec3f',
  },
  {
    firstName: 'Amiah',
    lastName: 'Fenton',
    id: '6ebff517-f398-4d23-9ed3-a0f14bfa3858',
  },
  {
    firstName: 'Kavion',
    lastName: 'Melchor',
    id: 'c7211b4f-7761-4012-a8a7-24e870227428',
  },
  {
    firstName: 'Regan',
    lastName: 'Quan',
    id: 'c8010a64-4fc3-4da4-9181-48a17e9b3329',
  },
  {
    firstName: 'Reuben',
    lastName: 'Keene',
    id: '8c6d90a5-6636-46f9-93de-daa172b7496f',
  },
  {
    firstName: 'Wesley',
    lastName: 'Alvey',
    id: '3c2d82f1-660e-44ec-b25a-756baa6d0155',
  },
  {
    firstName: 'Alexi',
    lastName: 'Schramm',
    id: '8be1c549-fb91-4c8f-9cfe-5b5c017f26bf',
  },
  {
    firstName: 'Zemirah',
    lastName: 'Suber',
    id: '8ebe3d34-a20b-45eb-ae48-a2d40bdc63bc',
  },
  {
    firstName: 'Rahaf',
    lastName: 'Deckard',
    id: '2ea05a52-4e31-450d-bbc4-5a6c73167d17',
  },
  {
    firstName: 'Raniya',
    lastName: 'Otte',
    id: 'e10058e4-3383-466b-91d8-1ea5bf1acf0f',
  },
  {
    firstName: 'Stacie',
    lastName: 'Chancey',
    id: '23d9845c-8b03-4987-ac9e-98778100d4b8',
  },
  {
    firstName: 'Josemaria',
    lastName: 'Embrey',
    id: '6dc958b7-0aea-45d6-b4cc-ce384815dc17',
  },
  {
    firstName: 'Enya',
    lastName: 'Behm',
    id: '84502153-69e6-4561-b2de-8f21f97530d3',
  },
  {
    firstName: 'Shrey',
    lastName: 'Frederickson',
    id: '303aacc8-e587-4801-929a-ad7ce933ee03',
  },
  {
    firstName: 'Ryland',
    lastName: 'Sears',
    id: '6ed7cc5b-4a79-4802-a002-7918efc2d416',
  },
  {
    firstName: 'Meryl',
    lastName: 'Dreher',
    id: '8a396169-fb8c-4478-b5e9-4f1b14a01cf8',
  },
];

import getRandomInteger from '../../utils/randomInteger/';

const startOf2020 = 1577836800000;

const date = new Date();

function getDate() {
  const newDate = new Date();
  newDate.setTime(1577836800000 + getRandomInteger(31556926000 * 4));
  // console.log("🚀 ~ getDate ~ newDate.toISOString():", newDate.toISOString())
  return newDate.toISOString();
}

function absenceType() {
  const rnd = 190; //getRandomInteger(200);

  if (rnd > 199) {
    return 'FAMILY';
  }

  if (rnd > 190) {
    return 'COMPASSIONATE_LEAVE';
  }

  if (rnd > 180) {
    return 'MEDICAL';
  }

  if (rnd > 160) {
    return 'SICKNESS';
  }

  return 'ANNUAL_LEAVE';
}

function getName() {
  return ''; //names[getRandomInteger(19)];
}

const absences = Array(5000)
  .fill({})
  .map((_, i) => ({
    id: i,
    startDate: getDate(),
    days: 5, //getRandomInteger(21),
    absenceType: absenceType(),
    employee: getName(),
    approved: true, //getRandomInteger(10) >= 9 ? false : true,
  }));

const Absences = ({ query: { amount = 20 } }) => {
  const body = JSON.stringify(absences.slice(0, amount));

  return new Response(body, {
    headers: {
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
      'Access-Control-Max-Age': '86400',
    },
  });
};

export default Absences;
