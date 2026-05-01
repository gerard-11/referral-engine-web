import type { ReferralResponse} from "../shared/types/types.ts";
import {api} from "../shared/services/api";

export const getReferrals = async (referrerId:string, page = 1):Promise <ReferralResponse> => {
    return  api.get(`/users/${referrerId}/referrals/`, {
        params: { page },
    });
};