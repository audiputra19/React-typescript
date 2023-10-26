import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { RootState } from './Store';

export const useAppDispatch = () => useDispatch<any>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;