import { atom } from "recoil";

export const nameAtom=atom({
    key:"name",
    default:''
})
export const emailAtom=atom({
    key:"email",
    default:''
})
export const passwordAtom=atom({
    key:"password",
    default:''
})