import { Module } from "./Module";


export interface Area {    
    id: string;
    name?: string;
    title?: string;
    modules: Module[];
}