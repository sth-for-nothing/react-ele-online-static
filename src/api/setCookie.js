import { param } from './config'
const setCookie = () => {
  document.cookie = `SID=${param.SID}`
  document.cookie = 'USERID=' + param.USERID
}
// zz60dS47BuNUUVA3UKiONtGvomuSSDAfdkJg
// yBh8f3ksCdKuxa6QOKWRy7aEatx3e01xjbpw
// Zjpvc8K0RhzxnbIwtKagBT8dgfzppQMBnahw
// U9AXE0Qa2BohS9NHWZinwFVI7ryP8MpiU7zQ

// 1031697058
export {
    setCookie
}