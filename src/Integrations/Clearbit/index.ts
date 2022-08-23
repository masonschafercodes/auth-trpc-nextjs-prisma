import {Integration} from "@prisma/client";
import {extractToken} from "~/utils/extractToken";

export function isClearbitEnabled(integrationSet: Integration[]): boolean {
    return integrationSet.some(integration => integration.type === "clearbit");
}

export function getClearbitIntegrationKey(integrationSet: Integration[]): string {
    return extractToken(integrationSet.find(integration => integration.type === "clearbit")!.data);
}