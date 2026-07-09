import { useContext } from "react";
import { OrgContext } from "../context/org/OrgContext";

export function useOrg() {
    const context = useContext(OrgContext);

    if (!context) {
        throw new Error(
            "useOrg must be used inside OrgProvider"
        );
    }

    return context;
}