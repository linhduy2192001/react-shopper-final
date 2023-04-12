export const currency = (numb) => {
    return new Intl.NumberFormat().format(numb)
}