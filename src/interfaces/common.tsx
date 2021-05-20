interface Navigation {
    // addListener: (a: string, e: Function) => Function,
    addListener: Function,
    canGoBack: Function,
    closeDrawer: Function,
    dangerouslyGetParent: Function,
    dangerouslyGetState: Function,
    dispatch: Function,
    goBack: Function,
    isFocused: Function,
    jumpTo: Function,
    navigate: (name: string,  params?: any) => void,
    openDrawer: Function,
    pop: Function,
    popToTop: Function,
    push: Function,
    removeListener: Function,
    replace: Function,
    reset: Function,
    setOptions: Function,
    setParams: Function,
    toggleDrawer: Function
}

export interface Response {
    data : any,
    error : string | null
}

export interface Props {
    navigation: Navigation,
    route: {
        key : string,
        name: string,
        params : any
    }
}