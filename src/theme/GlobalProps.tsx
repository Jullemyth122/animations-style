export type HeadingProps = {
    loaderComplete: boolean;
    component: React.ReactNode;
    sectionName: string;
};

export type LayoutProps = {
    children : React.ReactNode
}

export type ThemePassProps  = {
    id:number;
    theme: { svg:string, url:string, themeName:string,icons: string, mp4: string };
    isThemeSelected: boolean;
    setThemeSelected: React.Dispatch<React.SetStateAction<boolean>>
    setHolding: React.Dispatch<React.SetStateAction<string>>;
    bgRef: any
    mainThemeRef: any
    circleRef: any
    holding: string
    isSpaceBarLocked: boolean
    setIsSpaceBarLocked: React.Dispatch<React.SetStateAction<boolean>>
    isAnimating: boolean
    setIsAnimating:React.Dispatch<React.SetStateAction<boolean>>
    circleLock: number
    setCircleLock: React.Dispatch<React.SetStateAction<number>>
    themeRefs: React.MutableRefObject<any[]>;
}

export type NavbarWrapperProps = {
    elem: { img: string,name: string, href: string, svg: any}
    index: number;
    handleLinkClick: (index: number) => void;
    activeLink: number;
}

export type LoadersProps = {
    loadingScreen: React.RefObject<HTMLDivElement>;
};

export type CircleProps = {
    scale?: number;
    position?: [number, number, number];
    rotation?: [number, number, number];
    toneMapped?: boolean;
    img: string;
};
