import { cn } from '../lib/utils'

export const Logo = ({ className, uniColor }: { className?: string; uniColor?: boolean }) => {
    return (
        <div className={cn('flex items-center gap-2', className)}>
            <LogoIcon className="size-6" uniColor={uniColor} />
            <span className="text-xl font-semibold tracking-tight">PixelSeal</span>
        </div>
    )
}

export const LogoIcon = ({ className, uniColor }: { className?: string; uniColor?: boolean }) => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn('size-6', className)}>
            <path
                d="M12 2L3 7V17L12 22L21 17V7L12 2Z"
                stroke={uniColor ? 'currentColor' : 'url(#logo-gradient)'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M12 2V22"
                stroke={uniColor ? 'currentColor' : 'url(#logo-gradient)'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M3 7L21 17"
                stroke={uniColor ? 'currentColor' : 'url(#logo-gradient)'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M3 17L21 7"
                stroke={uniColor ? 'currentColor' : 'url(#logo-gradient)'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <defs>
                <linearGradient
                    id="logo-gradient"
                    x1="12"
                    y1="2"
                    x2="12"
                    y2="22"
                    gradientUnits="userSpaceOnUse">
                    <stop stopColor="#9B99FE" />
                    <stop
                        offset="1"
                        stopColor="#2BC8B7"
                    />
                </linearGradient>
            </defs>
        </svg>
    )
}

export const LogoStroke = ({ className }: { className?: string }) => {
    return (
        <svg
            className={cn('size-7 w-7', className)}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M12 2L3 7V17L12 22L21 17V7L12 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M12 2V22"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M3 7L21 17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M3 17L21 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}
