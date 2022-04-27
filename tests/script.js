/* eslint-disable import/no-unresolved */
import http from 'k6/http';
import { check, sleep } from 'k6';

// const configuration = {
//   vus: 1000,
// };

export const options = {
  noConnectionReuse: true,
  stages: [
    { duration: '2m', target: 100 }, // below normal load
    { duration: '5m', target: 100 },
    { duration: '2m', target: 200 }, // normal load
    { duration: '5m', target: 200 },
    { duration: '2m', target: 500 }, // around the breaking point
    { duration: '5m', target: 500 },
    { duration: '2m', target: 700 }, // beyond the breaking point
    { duration: '5m', target: 700 },
    { duration: '10m', target: 0 }, // scale down. Recovery stage.
  ],
};

// const today = new Date();
// today.dd = String(today.getDate()).padStart(2, '0');
// today.mm = String(today.getMonth() + 1).padStart(2, '0');
// today.yyyy = String(today.getFullYear());
// today.hr = String(today.getHours());
// today.min = String(today.getMinutes());

// export function handleSummary(data) {
//   const filename = `${today.mm}${today.dd}_${today.hr}${today.min}_${configuration.vus}VU.json`;
//   const result = {};
//   result[filename] = JSON.stringify(data, null, 4);
//   return result;
// }

// eslint-disable-next-line func-names
export default function () {
  const random = Math.floor(Math.random() * 10000);
  const res = http.get(`http://localhost:1337/reviews?product_id=${random}&sort=newest&page=1&count=1000`);
  check(res, { 'status was 200': (r) => r.status === 200 });
  const res2 = http.get(`http://localhost:1337/reviews/meta?product_id=${random}`);
  check(res2, { 'status was 200': (r) => r.status === 200 });
  sleep(1);
}
