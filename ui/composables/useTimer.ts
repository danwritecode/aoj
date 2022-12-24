import { ComputedRef } from 'vue'

export type Timer = {
  hours: number,
  minutes: number,
  seconds: number,
}
export const useTimer = (secondsLeft: number):ComputedRef<Timer> => {
  const secondsReactive = ref(secondsLeft)

  const subTime = () => {
    setTimeout(() => {
      secondsReactive.value -= 1 
      subTime()
    }, 1000);
  }

  subTime()

  return computed(():Timer => {
    let timer: Timer = {
      hours: 0,
      minutes: 0,
      seconds: 0
    }
    // don't want to modify original
    let curSeconds = secondsReactive.value

    // get hours, subtract the seconds allotted to hours from total seconds
    timer.hours = Math.floor(curSeconds / 60 / 60)
    curSeconds = curSeconds - timer.hours * 60 * 60

    // same for minutes
    timer.minutes = Math.floor(curSeconds / 60)
    curSeconds = curSeconds - timer.minutes * 60
    
    // remainder is seconds
    timer.seconds = curSeconds
    
    return timer;
  })
}

