import { Role } from "../data/championRoles";
import { Server } from "../data/servers";

const STORAGE_KEY_ROLE = "crown_selected_role";
const STORAGE_KEY_SERVER = "crown_selected_server";

/**
 * Sauvegarder le rôle sélectionné dans le localStorage
 */
export function saveSelectedRole(role: Role): void {
  try {
    localStorage.setItem(STORAGE_KEY_ROLE, role);
  } catch (error) {
    console.warn("Impossible de sauvegarder le rôle:", error);
  }
}

/**
 * Restaurer le rôle sélectionné depuis le localStorage
 */
export function getSavedRole(defaultRole: Role = "all"): Role {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_ROLE);
    if (saved && ["all", "top", "jungle", "mid", "adc", "support"].includes(saved)) {
      return saved as Role;
    }
  } catch (error) {
    console.warn("Impossible de restaurer le rôle:", error);
  }
  return defaultRole;
}

/**
 * Sauvegarder le serveur sélectionné dans le localStorage
 */
export function saveSelectedServer(server: Server): void {
  try {
    localStorage.setItem(STORAGE_KEY_SERVER, server);
  } catch (error) {
    console.warn("Impossible de sauvegarder le serveur:", error);
  }
}

/**
 * Restaurer le serveur sélectionné depuis le localStorage
 */
export function getSavedServer(defaultServer: Server = "euw"): Server {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_SERVER);
    if (
      saved &&
      [
        "euw",
        "eune",
        "na",
        "kr",
        "br",
        "lan",
        "las",
        "oce",
        "tr",
        "ru",
        "jp",
      ].includes(saved)
    ) {
      return saved as Server;
    }
  } catch (error) {
    console.warn("Impossible de restaurer le serveur:", error);
  }
  return defaultServer;
}
