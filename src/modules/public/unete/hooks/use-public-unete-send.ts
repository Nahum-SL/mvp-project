import { useMutation } from "@tanstack/react-query";
import { sendJobUnete } from "../api/unete-public.api";

export const useSendJobUnete = () => {
  return useMutation({
    mutationFn: sendJobUnete,
  });
}