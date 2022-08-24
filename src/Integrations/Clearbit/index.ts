import { Integration } from "@prisma/client";
import { extractToken } from "~/utils/extractToken";

export function isClearbitEnabled(integrationSet: Integration[]): boolean {
  return integrationSet.some(integration => integration.type === "clearbit");
}

export function getClearbitIntegrationKey(integrationSet: Integration[] | undefined): string {
  if (!integrationSet || integrationSet.length === 0) {
    return "";
  }

  return extractToken(integrationSet.find(integration => integration.type === "clearbit")!.data)
}
