import Synchronizer from "../Synchronizer";
import HtmlTag from '../../Layout/HtmlTag';
import ApiService from "~/src/Api/ApiService";
import SocketApi from "~/src/Api/SocketApi";
import HtmlSocketApi from "~/src/Api/impl/HtmlSocketApi";
import LayoutEl from '../../LayoutEl';
import HtmlNode from '../../Layout/HtmlNode';
import TextNode from '../../Layout/TextNode';
import PseudoSelector from '../../PseudoSelector/PseudoSelector';
import BaseGradientCss from "~/src/Css/Gradient/BaseGradientCss";
import { BackgroundImage } from "~/src/Css";
import BaseSelectorSynchronizer from './BaseSelectorSynchronizer';

export default class KeyFrameSelectorSynchronizer  extends BaseSelectorSynchronizer implements Synchronizer
{

}