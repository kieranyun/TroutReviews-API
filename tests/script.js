import http from 'k6/http';
import { check, sleep } from 'k6';

const configuration = {
  vus: 100,
  duration: '30s',
};

export const options = {
  vus: configuration.vus,
  noConnectionReuse: true,
  iterations: configuration.iterations,
  duration: configuration.duration,
};

// const today = new Date();
// today.dd = String(today.getDate()).padStart(2, '0');
// today.mm = String(today.getMonth() + 1).padStart(2, '0');
// today.yyyy = String(today.getFullYear());
// today.hr = String(today.getHours());
// today.min = String(today.getMinutes());

// export function handleSummary(data) {
//   console.log('STARTING SUMMARY GENERATION FAM');
//   const filename = `${configuration.vus}VU_${configuration.iterations}_${today.mm}${today.dd}_${today.hr}${today.min}.json`;
//   const result = {};
//   result[filename] = JSON.stringify(data, null, 4);
//   return result;
// }

export default function () {
  const random = Math.floor(Math.random() * 10000);
  const res = http.get(`http://localhost:1337/reviews?product_id=${random}&sort=newest&page=1&count=1000`);
  check(res, { 'status was 200': (r) => r.status === 200 });
  sleep(1);
}
