export type RegsiterBody = {
  name: string;
  username: string;
  email: string;
  password: string;
};

export type LoginBody = {
  email: string;
  password: string;
};

export const register = async (
  userData: RegsiterBody,
  launchError: (title: string, body: string) => void
) => {
  const res = await fetch("http://localhost:8000/api/register", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    mode: "cors",
    credentials: "include",
    body: JSON.stringify(userData),
  });

  const resJson = await res.json();

  if (res.status === 201) return resJson;
  if (res.status === 401) launchError("Error", resJson);
};

export const login = async (
  userData: LoginBody,
  launchError: (title: string, body: string) => void
) => {
  const res = await fetch("http://localhost:8000/api/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    mode: "cors",
    credentials: "include",
    body: JSON.stringify(userData),
  });

  const resJson = await res.json();

  if (res.status === 201) return resJson;
  if (res.status === 401) launchError("Error", resJson);
};
