import {default as UUID} from "node-uuid";

export function getId() {
    return UUID.v4()
}
