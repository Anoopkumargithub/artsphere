export const isTimeValid = value => /^\d{2}:\d{2}:\d{2}\.\d{3}$/.test(value)
export const isDateValid = value => value instanceof Date && !isNaN(value)
export const mergeDateWithTime = ({
    time,
    date
}) => {
    const [hours, minutes] = time.split(':')

    date.setHours(hours)
    date.setMinutes(minutes)
    date.setSeconds(0)
    date.setMilliseconds(0)

    return date
}
export const getTimeFromDate = value =>
    `${value.toTimeString().split(' ')[0]}.000`

export const getTodayAtMidnightDate = () => {
    const newDate = new Date()
    newDate.setHours(0)
    newDate.setMinutes(0)
    newDate.setSeconds(0)
    newDate.setMilliseconds(0)

    return newDate
}

export const getValidDate = value => {
    const validDateCandidate = new Date(value)
    return isDateValid(validDateCandidate) ?
        validDateCandidate :
        getTodayAtMidnightDate()
}

const padStartWithZero = number => String(number).padStart(2, '0')

export const toDateOnlyISOString = date => {
    const yy = date.getFullYear()
    const mm = padStartWithZero(date.getMonth() + 1)
    const dd = padStartWithZero(date.getDate())
    return [yy, mm, dd].join('-')
}