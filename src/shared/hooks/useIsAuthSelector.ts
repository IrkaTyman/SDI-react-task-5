import { useAppSelector } from '@shared/config/redux';

export function useIsAuthSelector() {
    return useAppSelector(state => state.auth.isAuth);
}
