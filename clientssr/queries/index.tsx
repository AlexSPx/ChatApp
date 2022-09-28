export const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;

import React from "react";
import { ErrorModal, useModals } from "../components/Modals";
import { register, RegsiterBody, login, LoginBody } from "./userQueries";

export default function useQuery() {
  const { pushModal } = useModals();

  const launchError = (title: string, body: string) => {
    pushModal(<ErrorModal title={title} body={body} />);
  };
  const registerQuery = (data: RegsiterBody) => {
    register(data, launchError);
  };
  const loginQuery = (data: LoginBody) => {
    login(data, launchError);
  };

  return { registerQuery, loginQuery };
}
