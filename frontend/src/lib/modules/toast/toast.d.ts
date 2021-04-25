export interface tata_config {
    position?: 'tr' | 'tm' | 'tl' | 'mr' | 'mm' | 'ml' | 'bl' | 'bm' | 'br',
    duration?: number,
    progress?: boolean,
    holding?: boolean,
    closeBtn?: boolean,
    animate?: 'fade' | 'slide',
    onClick?: () => void,
    onClose?: () => void
}

export interface toast_module {
    text: (title: string,
        msg: string,
        config?: tata_config) => void,
    log: (title: string,
        msg: string,
        config?: tata_config) => void,
    info: (title: string,
        msg: string,
        config?: tata_config) => void,
    success: (title: string,
        msg: string,
        config?: tata_config) => void,
    warn: (title: string,
        msg: string,
        config?: tata_config) => void,
    error: (title: string,
        msg: string,
        config?: tata_config) => void,
}