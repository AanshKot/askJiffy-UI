import { atom } from "jotai";

const chatInputTextAtom = atom<string>("");

const selectedVehicleAtom = atom<number | null>(null);

export {
    chatInputTextAtom,
    selectedVehicleAtom
}