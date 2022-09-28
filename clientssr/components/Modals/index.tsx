import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { ModalContext } from "../../contexts/modalContext";
import { AiOutlineCheck, AiOutlineLoading } from "react-icons/ai";
import { BiError } from "react-icons/bi";
import "./modals.css";

const NotificationModal: React.FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [isBrowser, setIsBrowser] = useState(false);
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const modal = <>{children}</>;

  if (isBrowser) {
    return createPortal(
      modal,
      document.getElementById("modals") as HTMLElement
    );
  } else {
    return null;
  }
};

export const useModals = () => {
  const modalContext = useContext(ModalContext);

  const pushModal = (
    modal: JSX.Element,
    { timer = true, value = 2000 }: { timer?: boolean; value?: number } = {}
  ) => {
    modalContext?.setModals((modals: JSX.Element[]) => [...modals, modal]);

    console.log("pushingggg");

    if (timer) {
      setTimeout(() => {
        modalContext?.setModals((current) =>
          current.filter((cr) => cr.key !== modal.key)
        );
      }, value);
    }
  };

  const closeModal = (key: number | string) => {
    modalContext?.setModals((current) =>
      current.filter((cr) => cr.key !== key.toString())
    );
  };

  const closeAll = () => {
    modalContext?.setModals([]);
  };

  return { pushModal, closeModal, closeAll };
};

export const ErrorModal = ({
  title,
  body,
}: {
  title: string;
  body: string;
}) => {
  return (
    <NotificationModal key={Date.now()}>
      <div className="modal-box">
        <div className="modal-circle bg-red-100">
          <BiError className="text-xl" />
        </div>
        <div className="flex flex-col justify-center mx-3">
          <p className="text-lg">{title}</p>
          <p className="text-sm">{body}</p>
        </div>
      </div>
    </NotificationModal>
  );
};

export const SuccessModal = ({
  title,
  body,
}: {
  title: string;
  body: string;
}) => {
  return (
    <NotificationModal key={Date.now()}>
      <div className="modal-box">
        <div className="modal-circle bg-green-100">
          <AiOutlineCheck />
        </div>
        <div className="flex flex-col justify-center mx-3">
          <p className="text-lg">{title}</p>
          <p className="text-sm">{body}</p>
        </div>
      </div>
    </NotificationModal>
  );
};

export const LoadingModal = ({
  title,
  body,
}: {
  title: string;
  body: string;
}) => {
  return (
    <NotificationModal key={Date.now()}>
      <div className="modal-box">
        <div className="modal-circle bg-yellow">
          <AiOutlineLoading className="loaderY text-yellow-600" />
        </div>
        <div className="flex flex-col justify-center mx-3">
          <p className="text-lg">{title}</p>
          <p className="text-sm">{body}</p>
        </div>
      </div>
    </NotificationModal>
  );
};

export default NotificationModal;
