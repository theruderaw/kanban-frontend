import { useNavigate } from "react-router-dom";

import { useDashboard } from "../../hooks/useDashboard";
import { useOrg } from "../../hooks/useOrg";

interface Props {
    open: boolean;
    onClose: () => void;
}

export default function OrgSelectModal({
    open,
    onClose,
}: Props) {
    const { data, isLoading, error } = useDashboard();
    const { setOrgSlug } = useOrg();

    const navigate = useNavigate();

    if (!open) return null;

    function selectOrg(slug: string) {
        setOrgSlug(slug);
        onClose();

        navigate(`/${slug}`);
    }

    return (
        <div
            className="
                fixed
                inset-0
                z-50
                flex
                items-center
                justify-center
                bg-black/60
            "
        >
            <div
                className="
                    w-[420px]
                    rounded-xl
                    border
                    border-neutral-800
                    bg-neutral-950
                    p-6
                    shadow-xl
                "
            >
                <h2 className="
                    mb-1
                    text-xl
                    font-semibold
                    text-white
                ">
                    Select Organization
                </h2>

                <p className="
                    mb-5
                    text-sm
                    text-neutral-400
                ">
                    Choose an organization to continue.
                </p>


                {isLoading && (
                    <p className="text-neutral-400">
                        Loading organizations...
                    </p>
                )}


                {error && (
                    <p className="text-red-400">
                        {error.message}
                    </p>
                )}


                {!isLoading && !error && (
                    <div className="space-y-2">
                        {data?.organizations?.map((item) => (
                            <button
                                key={item.slug}
                                onClick={() =>
                                    selectOrg(
                                        item.slug
                                    )
                                }
                                className="
                                    block
                                    w-full
                                    rounded-lg
                                    border
                                    border-neutral-800
                                    bg-neutral-900
                                    p-3
                                    text-left
                                    text-white
                                    transition
                                    hover:bg-neutral-800
                                "
                            >
                                {item.name}
                            </button>
                        ))}


                        {data?.organizations?.length === 0 && (
                            <p className="text-neutral-500">
                                No organizations found.
                            </p>
                        )}
                    </div>
                )}


                <button
                    onClick={onClose}
                    className="
                        mt-5
                        text-sm
                        text-neutral-400
                        hover:text-white
                    "
                >
                    Close
                </button>

            </div>
        </div>
    );
}