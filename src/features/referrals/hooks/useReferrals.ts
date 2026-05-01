import { useQuery } from "@tanstack/react-query";
import { getReferrals } from "../../../services/referrals.service";


export const useReferrals = (userId?: string, page = 1) => {
    return useQuery({
        queryKey: ["referrals", userId, page],
        queryFn: () => getReferrals(userId!, page),
        select:(response)=>response.data,
        enabled: !!userId,
    });
};