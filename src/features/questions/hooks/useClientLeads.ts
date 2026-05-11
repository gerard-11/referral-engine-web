import { useQuery } from "@tanstack/react-query";
import { getAgentLeads } from "../services/leads.service";

export const useClientLeads = () => {
    return useQuery({
        queryKey: ["clientLeads"],
        queryFn: () => getAgentLeads(),
    });
};
