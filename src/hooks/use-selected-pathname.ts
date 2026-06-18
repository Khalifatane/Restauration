"use client";

import { usePathname } from "next/navigation";

function useSelectedPathname() {
	const pathname = usePathname();

	return pathname;
}

export default useSelectedPathname;
