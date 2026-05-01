export const ReferralStats = ({ referral }:any) => {
    if (!referral) {
        return <p>Selecciona un referido</p>;
    }

    return (
        <div>
            <h2 className="text-xl font-bold">{referral.name}</h2>

            <p>Ventas: {referral.sales}</p>
            <p>Comisiones: {referral.commissions}</p>
        </div>
    );
};