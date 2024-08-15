import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";
import { AppDispatch, RootState } from "./store";

type DispatchFunction = () => AppDispatch;

export const useCoinDispatch: DispatchFunction = useDispatch;
export const useCoinSelector: TypedUseSelectorHook<RootState> = useSelector;
