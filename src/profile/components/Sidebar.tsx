import type{ Referral} from "../../shared/types/types.ts";

interface SidebarProps {
    referrals: Referral[] | null | undefined;
    onSelect: (referral: Referral) => void;
}

export const Sidebar = ({ referrals, onSelect }:SidebarProps) => {
    if(!referrals){
        return <p>Aun no tienes referidos.</p>;
    }
    return (
        <div className="p-4">

            {referrals && referrals.length > 0 &&(
                <div>
                    <h2 className="font-bold mb-4">Referidos</h2>
                <ul className="space-y-2">
                    {referrals?.map((ref) => (
                        <li
                            key={ref.id}
                            onClick={() => onSelect(ref)}
                            className="p-2 rounded cursor-pointer hover:bg-gray-200"
                        >
                            {ref.name}
                        </li>
                    ))}
                </ul>
                </div>
            )}
        </div>
    );
};