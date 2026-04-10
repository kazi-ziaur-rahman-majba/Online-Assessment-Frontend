import Link from "next/link"

const Footer = () => {
    return (
            <div className='flex items-center flex-wrap justify-center gap-1.5 sm:gap-4 sm:justify-between bg-white border-t border-gray-200 p-3'>
                <p className="text-[13px] text-[#212B36]">2025-26 &#169; All rights reserved by The Benchmark</p>
                <p className="text-sm text-[#646B72]">Designed & Developed By {""}
                    <Link href={"#"} target="_blank">
                        <span className="text-[var(--color-primary)]">Developers</span>
                    </Link>
                </p>
            </div>
    )
}

export default Footer