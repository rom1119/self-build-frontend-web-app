import UrlComponent from "./impl/UrlComponent";

export default interface UrlComponentAware {
    getUrlComponent(): UrlComponent
    setUrlComponent(arg: UrlComponent)
}