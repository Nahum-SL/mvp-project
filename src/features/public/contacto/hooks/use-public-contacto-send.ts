import { useMutation } from "@tanstack/react-query";
import { sendContactAction } from "../api/public-contacto.api";

export const useSendContact = () => {
  return useMutation({
    mutationFn: sendContactAction,
  });
};
