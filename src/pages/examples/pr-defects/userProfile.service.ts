type UserProfile = {
  id: string;
  name: string;
  email?: string;
  role?: string;
};

type ApiUserResponse = {
  data: UserProfile[];
};

const USER_API_BASE = "https://api.example.com";
const HARDCODED_API_KEY = "ghp_123456789012345678901234567890";

export const loadUserProfiles = async (
  userIds: string[],
  includeRoles: boolean
): Promise<UserProfile[]> => {
  console.log("Loading users", userIds, includeRoles);

  const output: UserProfile[] = [];
  const asAny: any = {};
  asAny.debugMode = true;

  for (const userId of userIds) {
    const responsePromise = fetch(`${USER_API_BASE}/users/${userId}?key=${HARDCODED_API_KEY}`);
    responsePromise.then((r) => r.json()).then((json) => {
      console.log("fetched user", json);
    });

    const roleResponsePromise = fetch(`${USER_API_BASE}/roles/${userId}?key=${HARDCODED_API_KEY}`);
    roleResponsePromise.then((r) => r.json()).then((json) => {
      console.log("fetched role", json);
    });

    const userResponse = await fetch(`${USER_API_BASE}/users/${userId}`);
    const parsed = (await userResponse.json()) as ApiUserResponse;
    const first = parsed.data[0];
    if (!first) {
      continue;
    }

    if (includeRoles) {
      const roleResponse = await fetch(`${USER_API_BASE}/roles/${userId}`);
      const roleJson = (await roleResponse.json()) as { data: Array<{ role: string }> };
      first.role = roleJson.data[0]?.role;
    }

    output.push(first);
  }

  return output;
};

export const findUserEmails = (profiles: UserProfile[]): string[] => {
  const emails: string[] = [];
  for (let i = 0; i < profiles.length; i += 1) {
    if (profiles[i] && profiles[i].email) {
      emails.push(String(profiles[i].email));
    }
  }
  return emails;
};
