import { MESES } from "../constants/meses.const";

const months = MESES;

export function get()
{
    return months;
}

export function getByOrder(order: number)
{
    return months.find(el => el.order == order);
}