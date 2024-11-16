import {clsx, type ClassValue} from "clsx"
import {twMerge} from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const cleanHtml = (string: string) => {
    return string.replace(/<[^>]*>?/gm, '')
}